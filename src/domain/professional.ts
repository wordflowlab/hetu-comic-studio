import {requireValue as need} from "../../vendor/project-store.ts";
import {artifact} from "./artifact.ts";
import {escapeHTML as esc,htmlPage} from "./presentation.ts";
import {readBlob} from "./media.ts";
function box(v:any){need(v.x+v.width<=1.00000001&&v.y+v.height<=1.00000001,"分格或气泡越过所属画面边界。");}
export function validateDomain(p:any){
 const pages=new Set(p.pages.map((v:any)=>v.id)),panels=new Set(p.panels.map((v:any)=>v.id));
 need(new Set(p.pages.map((v:any)=>v.order)).size===p.pages.length,"页面阅读序号重复。");
 for(const page of p.pages){const order=p.panels.filter((v:any)=>v.page_id===page.id).map((v:any)=>v.order);need(new Set(order).size===order.length,"同页分格阅读序号重复。");}
 for(const v of p.panels){need(pages.has(v.page_id),"分格所属页面不存在。");box(v);}
 for(const b of p.balloons){need(panels.has(b.panel_id),"气泡所属分格不存在。");box(b);}
 for(const panel of p.panels){const orders=p.balloons.filter((b:any)=>b.panel_id===panel.id).map((b:any)=>b.order);need(new Set(orders).size===orders.length,"同格气泡阅读序号重复。");}
 for(const n of p.notes){need(panels.has(n.panel_id),"意见分格不存在。");need(n.status!=="resolved"||n.resolution.trim(),"解决意见须说明处理结果。");}
}
export function checkLayout(p:any){const stale=p.notes.filter((n:any)=>n.asset_sha256!==null);return {pages:p.pages.length,panels:p.panels.length,missing_art_panel_ids:p.panels.filter((v:any)=>v.asset_source_index===null).map((v:any)=>v.id),empty_page_ids:p.pages.filter((v:any)=>!p.panels.some((x:any)=>x.page_id===v.id)).map((v:any)=>v.id),reading_order:[...p.pages].sort((a,b)=>a.order-b.order).map((page:any)=>({page_id:page.id,direction:page.direction,panel_ids:p.panels.filter((v:any)=>v.page_id===page.id).sort((a:any,b:any)=>a.order-b.order).map((v:any)=>v.id)})),fixed_image_notes:stale.map((n:any)=>({id:n.id,asset_sha256:n.asset_sha256})),note:"阅读顺序以明确序号为准；图像缺失使用示意占位，不代表成品。"};}
export async function checkSources(p:any,sources:any[],_request?:any){for(const panel of p.panels)if(panel.asset_source_index!==null)need(sources[panel.asset_source_index]?.source_ref?.kind==="asset","分格图像必须关联固定素材来源。");}
export async function renderComic(p:any,sources:any[],request:any,pageId?:string){
 const pages=[...p.pages].filter(v=>!pageId||v.id===pageId).sort((a,b)=>a.order-b.order);need(!pageId||pages.length===1,"漫画页面不存在。");
 const cache=new Map<number,string>();
 for(const v of p.panels.filter((v:any)=>pages.some(x=>x.id===v.page_id)))if(v.asset_source_index!==null&&!cache.has(v.asset_source_index)){
  const source=sources[v.asset_source_index]?.source_ref;const b=await readBlob(source,request,2*1024*1024);
  const png=b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),jpeg=b[0]===255&&b[1]===216&&b[b.length-2]===255&&b[b.length-1]===217;
  need(png||jpeg,"漫画图像仅支持核验后的PNG/JPEG。");cache.set(v.asset_source_index,'data:image/'+(png?'png':'jpeg')+';base64,'+b.toString('base64'));
 }
 const body=pages.map(page=>`<section><h2>${esc(page.title)}</h2><p>阅读方向：${page.direction==='rtl'?'从右至左':'从左至右'}；分格按明确序号阅读。</p><div class="comic-page" style="aspect-ratio:${page.width}/${page.height}">${p.panels.filter((v:any)=>v.page_id===page.id).sort((a:any,b:any)=>a.order-b.order).map((v:any)=>`<figure data-panel="${esc(v.id)}" style="left:${v.x*100}%;top:${v.y*100}%;width:${v.width*100}%;height:${v.height*100}%">${v.asset_source_index===null?`<div class="placeholder">示意格 ${v.order+1}<p>${esc(v.action)}</p></div>`:`<img alt="${esc(v.title)}" src="${cache.get(v.asset_source_index)}">`}${p.balloons.filter((b:any)=>b.panel_id===v.id).sort((a:any,b:any)=>a.order-b.order).map((b:any)=>`<div class="balloon ${esc(b.kind)}" style="left:${b.x*100}%;top:${b.y*100}%;width:${b.width*100}%;height:${b.height*100}%"><span>${esc(b.speaker)}</span><p>${esc(b.text)}</p></div>`).join('')}<figcaption>${v.order+1}. ${esc(v.title)}</figcaption></figure>`).join('')}</div></section>`).join('');
 return htmlPage(p.title,`<style>.comic-page{position:relative;width:100%;background:#e9e9e5}.comic-page figure{position:absolute;margin:0;border:1px solid #444;box-sizing:border-box;overflow:hidden;background:white}.comic-page img{width:100%;height:100%;object-fit:cover}.placeholder{padding:16px}.balloon{position:absolute;border:1px solid #444;border-radius:35%;background:white;color:#202522;padding:4px;box-sizing:border-box;font-size:clamp(10px,1.8vw,18px);line-height:1.4;overflow:auto}.balloon p{margin:0}.balloon span{font-size:.75em}.balloon.caption{border-radius:0}.comic-page figcaption{position:absolute;bottom:0;left:0;background:#fffe;padding:2px;font-size:11px}@media print{section{break-before:page}}</style><h1>${esc(p.title)}</h1>${body}<p>固定工程导出；图像和对白选择仍由作者决定。</p>`);
}
export function pureAction(_a:string,_i:any){return undefined;}
export async function writeProfessional(_a:string,_p:any,_s:any[],_i:any,_r?:any){throw Error("未知专业写入。");}
export async function readProfessional(a:string,p:any,s:any[],i:any,r:any){if(a==="check_layout")return checkLayout(p);if(a==="render_page")return artifact(await renderComic(p,s,r,i.page_id),"漫画页.html","text/html",i);if(a==="export_comic")return artifact(await renderComic(p,s,r),"漫画.html","text/html",i);if(a==="locate_panel"){const panel=p.panels.find((v:any)=>v.id===i.panel_id);need(panel,"分格不存在。");return {panel,ranges:panel.ranges,balloons:p.balloons.filter((v:any)=>v.panel_id===panel.id),notes:p.notes.filter((v:any)=>v.panel_id===panel.id)};}}
export function summaries(p:any){return [{title:"页面",lines:p.pages.map((v:any)=>v.title+"　"+v.width+"×"+v.height)},{title:"分格",lines:p.panels.map((v:any)=>v.title+"："+v.action)},{title:"对白",lines:p.balloons.map((v:any)=>v.speaker+"："+v.text)},{title:"局部意见",lines:p.notes.map((v:any)=>v.comment)}];}
