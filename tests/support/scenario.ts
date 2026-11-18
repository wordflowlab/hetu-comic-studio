import {createHash} from "node:crypto";
import {newProject} from "../../src/domain/model.ts";
export const original="林溪在雨港邮局等信。\n她把旧钥匙放进信封。\n\n第二天，她决定出发。\n";
export const sha=(v:string|Uint8Array)=>createHash("sha256").update(v).digest("hex");
export const sourceRef={kind:"document",work_ref:{workspace_id:"workspace_test",kind:"novel",object_id:"novel_test"},document_id:"doc_11111111-1111-4111-8111-111111111111",revision_id:"rev_11111111-1111-4111-8111-111111111111",sha256:sha(original)};
export const range={source_index:0,byte_start:0,byte_end:Buffer.byteLength(original),quote:original};
export const base=(r:any,key:string)=>({object_id:r.object.object_id,expected_revision:r.object.revision,expected_sha256:r.sha256,operation_key:key});
export const selection=(r:any)=>({object_id:r.object.object_id,revision:r.object.revision});
export function wav(value=6000,frames=800,rate=8000){const b=Buffer.alloc(44+frames*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(frames*2,40);for(let n=0;n<frames;n++)b.writeInt16LE(value,44+n*2);return b;}

export function scenario(_work:any=sourceRef.work_ref):any {return {...newProject("雨港来信"),...{
  "pages": [
    {
      "id": "page-one",
      "title": "第一页 雨港来信",
      "width": 800,
      "height": 1000,
      "direction": "ltr",
      "order": 0
    }
  ],
  "panels": [
    {
      "id": "panel-one",
      "page_id": "page-one",
      "title": "旧邮局",
      "action": "暮雨落在旧邮局的门廊，林溪握着信封。",
      "x": 0.04,
      "y": 0.04,
      "width": 0.92,
      "height": 0.45,
      "order": 0,
      "asset_source_index": null,
      "ranges": [range]
    },
    {
      "id": "panel-two",
      "page_id": "page-one",
      "title": "信封与钥匙",
      "action": "旧钥匙从信封边缘露出。",
      "x": 0.04,
      "y": 0.52,
      "width": 0.92,
      "height": 0.44,
      "order": 1,
      "asset_source_index": null,
      "ranges": [range]
    }
  ],
  "balloons": [
    {
      "id": "line-one",
      "panel_id": "panel-one",
      "speaker": "林溪",
      "text": "这封信，为什么没有署名？",
      "kind": "thought",
      "x": 0.08,
      "y": 0.08,
      "width": 0.6,
      "height": 0.24,
      "order": 0
    }
  ],
  "notes": [
    {
      "id": "look",
      "panel_id": "panel-one",
      "asset_sha256": null,
      "comment": "让她的视线落在信封上，保留门外的雨。",
      "status": "open",
      "resolution": ""
    }
  ]
}};}
