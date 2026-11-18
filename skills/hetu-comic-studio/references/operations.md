# 操作地图

由正式清单生成，执行前发现当前安装版Schema。

| 动作 | 用途 | 必填参数 | 效果 |
| --- | --- | --- | --- |
| list_projects | 查找专业工程 |  | read |
| get_project | 读取固定专业工程 | object_id | read |
| save_project | 保存完整专业工程 | expected_revision, expected_sha256, operation_key, content | managed_write |
| put_page | 维护页面 | object_id, expected_revision, expected_sha256, operation_key, page | managed_write |
| remove_page | 移除页面 | object_id, expected_revision, expected_sha256, operation_key, page_id | managed_write |
| put_panel | 维护分格 | object_id, expected_revision, expected_sha256, operation_key, panel | managed_write |
| remove_panel | 移除分格 | object_id, expected_revision, expected_sha256, operation_key, panel_id | managed_write |
| put_balloon | 维护气泡 | object_id, expected_revision, expected_sha256, operation_key, balloon | managed_write |
| remove_balloon | 移除气泡 | object_id, expected_revision, expected_sha256, operation_key, balloon_id | managed_write |
| put_note | 维护局部意见 | object_id, expected_revision, expected_sha256, operation_key, note | managed_write |
| remove_note | 移除局部意见 | object_id, expected_revision, expected_sha256, operation_key, note_id | managed_write |
| check_layout | 检查排版与阅读 | object_id | read |
| render_page | 读取漫画页面 | object_id, page_id | read |
| export_comic | 导出离线漫画 | object_id | read |
| locate_panel | 定位分格与原文 | object_id, panel_id | read |
| get_source | 读取固定来源 | object_id, source_index | read |
| get_basis | 读取固定专业依据 | object_id, basis_index | read |
| compare_versions | 比较固定修订 | object_id, from_revision, to_revision | read |
| export_project | 导出固定专业报告 | object_id, format | read |
| build_context | 准备有界创作上下文 | object_id, goal, max_chars | read |
| create_handoff | 准备精确AI交接 | object_id, goal | read |
| get_operation | 回读原操作 | operation_key | read |
