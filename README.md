# 河图漫画创作

> 把故事组织为页、格、阅读顺序与对白，关联实际图像并导出可阅读漫画。

## 使用

从[GitHub v0.1.0发行](https://github.com/wordflowlab/hetu-comic-studio/releases/tag/v0.1.0)获取固定运行包。安装到河图后，在当前Codex等Agent会话发现插件并读取同包Skill，说明目标即可。所有正常业务经河图CLI/MCP完成，桌面用于阅读、比较、反馈和可选编辑。

## 开发

Node25，使用npm ci、npm run build、npm run check和npm run test:unit。专业数据和动作以[功能清单](CAPABILITIES.md)及manifest为准；完整设计、用户用例与发布验收见[docs](docs/README.md)。

## 边界

漫画工程作为当前作品的专业成果，不新增宿主作品类型。分格和气泡使用规范化坐标，页面保存明确尺寸及左右阅读方向。示意格不冒充完成画面；图像只消费当前作品固定PNG/JPEG来源。HTML内嵌图像离线可读，未配图和越界单独检查，导出不表示作者认可。

正文采纳和定稿由宿主及作者决定。
