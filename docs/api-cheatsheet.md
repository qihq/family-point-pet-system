# API 速查表（v1.4，2026-03-31）

> 所有接口默认走 Cookie 中的 `token` 鉴权（登录接口会 `Set-Cookie`）。也可在请求头携带 `Authorization: Bearer <token>`。

- 成功响应：`{ success: true, ... }`
- 失败响应：`{ success: false, error: string }`，HTTP 状态常见为 400/401/403/404/500。

---

## 鉴权 Auth
- POST `/api/auth/parent-login`
  - Body: `{ "name": "parent", "password": "parent123" }`
  - 200: `{ success, user, token }` 并设置 `Set-Cookie: token=...`
- POST `/api/auth/child-login`
  - Body: `{ "name": "child1", "pin": "1234" }`
- GET `/api/auth/me`
  - 200: `{ success: true, user: { id, name, role, familyId } }`
- POST `/api/auth/logout`
  - 清除 `token` Cookie；总是 200

示例：
```bash
curl -X POST http://localhost:3100/api/auth/parent-login \
  -H 'Content-Type: application/json' \
  -c cookie.txt \
  -d '{"name":"parent","password":"parent123"}'
```

---

## 家庭与成员 Family
- GET `/api/family/children`
  - 仅家长：返回 `[{ id, name, avatarUrl }]`
- GET `/api/family/children/{id}`
  - 返回 `{ id, name, avatarUrl }`
- PUT `/api/family/children/{id}`（仅家长）
  - Body 支持：`name`、`pin`、`avatarUrl` 或 `avatarBase64(data:image/png;base64,...)`

---

## 宠物 Pets
- GET `/api/pets/me?childId=...`
  - 孩子：忽略参数，返回自己的 `{ pet, account }`
  - 家长：可带 `childId` 查看指定孩子
- PATCH `/api/pets/{childId}`（仅家长）
  - 可更新：`name, level, exp, stage, status, hunger, thirst, cleanliness, mood, health`
- 动作（孩子/家长均可在权限内操作）
  - POST `/api/pets/{childId}/feed|water|clean|play|revive`
  - 返回：`{ success, data: { pet, account }, message }`
- 上传/恢复 3D 模型（仅家长）
  - POST `/api/pets/{childId}/model`（`multipart/form-data`，字段：`file=.glb`）
  - DELETE `/api/pets/{childId}/model`（恢复默认）

示例（上传 glb）：
```bash
curl -X POST http://localhost:3100/api/pets/<childId>/model \
  -b cookie.txt -F file=@./pet.glb
```

---

## 规则 Point Rules
- GET `/api/point-rules?enabled=true|false&category=...&childId=...&page=1&pageSize=20`
- POST `/api/point-rules`（仅家长，创建）
- GET `/api/point-rules/{id}`（详情）
- PUT `/api/point-rules/{id}`（仅家长，更新）
- DELETE `/api/point-rules/{id}`（仅家长，删除）
- PATCH `/api/point-rules/{id}/toggle`（仅家长，启停）
- POST `/api/point-rules/{id}/duplicate`（仅家长，复制）

---

## 任务记录 Point Records（提交与审核）
- POST `/api/point-records`（孩子提交）
  - Body: `{ pointRuleId, description?, imageUrl?, submitNote? }`
  - 创建待审核记录
- GET `/api/point-records?status=pending|approved|rejected&childId=...&page=1&pageSize=20`
  - 家长默认查看本家庭所有孩子；孩子仅查看自己的
- 审核（仅家长）
  - POST `/api/point-records/{id}/review`
  - 通过：`{ action: "approve", points: 10 }` → 自动记为收入（SourceType.task）
  - 拒绝：`{ action: "reject", reason?: "..." }`

---

## 积分账户 Points（手动调整与流水）
- POST `/api/points/manual-add`（仅家长）
  - Body: `{ childId, amount, reason? }`
- POST `/api/points/manual-deduct`（仅家长）
  - Body: `{ childId, amount, reason? }`
- GET `/api/points/transactions?childId=<id>&type=earn|spend&sourceType=task|manual|pet&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&page=1&pageSize=20`
  - 返回 `{ transactions:[...], balance, pagination:{...} }`

---

## 报告 Reports
- GET `/api/reports/points?childId=all|<id>&type=earn|spend&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
  - JSON：`{ transactions:[{ id, createdAt, type, sourceType, amount, balanceAfter, description, childId, childName }] }`
- 导出 CSV：同参数追加 `&format=csv`

---

## 设置 Pet Config（宠物互动积分消耗）
- GET `/api/pet-config` → `{ feed, water, clean, play }`
- PUT `/api/pet-config`（仅家长）Body：同上字段任意子集

---

## 常见请求头与会话
- 主要依靠 Cookie：`token`（HttpOnly, SameSite=Strict）。
- 也可自带：`Authorization: Bearer <token>`。
- `Content-Type: application/json`（除上传 glb 使用 `multipart/form-data`）。

## 基础账号（开发环境）
- 家长：`parent / parent123`
- 孩子：`child1 / 1234`，`child2 / 5678`

---

## 回收站（Recycle Bin）

- 列表（仅家长）
  - `GET /api/family/children?deleted=true` → 已软删孩子
  - `GET /api/family/children?deleted=all` → 全部（含已删）
- 软删除
  - `DELETE /api/family/children/{id}` → 标记 `isDeleted=true, deletedAt=now`
- 恢复
  - `POST /api/family/children/{id}/restore` → 复位 `isDeleted=false`，并自动补齐缺失的积分账户/宠物
- 彻底删除
  - `DELETE /api/family/children/{id}/purge` → 事务清理宠物、积分流水/账户、任务记录、规则目标、最后删除用户

注意：孩子登录接口会忽略已软删用户；宠物互动/流水查询会拒绝对已软删孩子的访问。
