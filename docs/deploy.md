# 家庭积分宠物系统 - 部署文档

> 面向 Docker Compose + NAS 的完整指南

## 目录
1. 环境要求
2. 环境变量
3. 启动步骤
4. 更新步骤
5. 数据持久化
6. 备份建议
7. 故障排查
8. 安全建议

---

## 环境要求
- Docker 20.10+
- Docker Compose 2.0+
- NAS：Synology DSM / QNAP QTS / 自托管 Linux / Windows/Mac

---

## 环境变量
在项目根目录创建并编辑 `.env`：

```ini
# 数据库配置（容器内访问 postgres 服务）
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/family_pet?schema=public"
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=family_pet

# 应用配置
NEXTAUTH_SECRET="your_random_secret_key_min_32_chars"
NEXT_PUBLIC_APP_URL="http://localhost:3100"
PORT=3100
```

变量说明：
- `DATABASE_URL`：应用在容器内访问数据库的连接串，主机名固定为 `postgres`
- `DB_USER/DB_PASSWORD/DB_NAME`：供 `postgres` 容器初始化使用
- `NEXT_PUBLIC_APP_URL`：前端访问地址（本机 3100 端口）
- `PORT`：应用内部端口（映射到宿主 3100）

---

## 启动步骤

```bash
# 构建并启动
docker-compose up -d --build

# 查看日志
docker-compose logs -f app

# 执行数据库迁移
docker-compose exec app npx prisma migrate deploy

# 生成 Prisma 客户端（如需）
docker-compose exec app npx prisma generate

# 可选：初始化测试数据
docker-compose exec app npx prisma db seed
```

访问：
- http://localhost:3100
- 局域网：http://<your-nas-ip>:3100

---

## 更新步骤

```bash
git pull # 如果使用了 git
docker-compose build
docker-compose up -d

docker-compose exec app npx prisma migrate deploy
```

---

## 数据持久化
compose 已将数据库数据挂载到卷：
- `postgres_data:/var/lib/postgresql/data`

在 NAS 上可改为指定路径挂载：
```yaml
services:
  postgres:
    volumes:
      - /volume1/docker/family-pet/db:/var/lib/postgresql/data
# 或 QNAP：
#     - /share/Container/family-pet/db:/var/lib/postgresql/data
```

---

## 备份建议

示例（Linux/Mac）：
```bash
BACKUP_DIR="$HOME/Desktop/family-pet-backup"
DATE=$(date +%Y%m%d)
mkdir -p $BACKUP_DIR
docker exec family-point-pet-db pg_dump -U postgres family_pet > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql
```
恢复：
```bash
gunzip < db_backup_20240115_030000.sql.gz | docker exec -i family-point-pet-db psql -U postgres family_pet
```

---

## 故障排查

- 查看容器状态：`docker-compose ps`
- 查看应用日志：`docker-compose logs -f app`
- 查看数据库日志：`docker-compose logs -f postgres`
- 健康检查：
```bash
curl http://localhost:3100/api/health
# 或（如果未提供该路由，请以页面 200 响应为准）
```
- 端口占用检查（Linux）：`netstat -tlnp | grep 3100`

---

## 安全建议
1. 首次部署后立即修改默认密码
2. 生产环境放到内网或配置 HTTPS 反代
3. 定期更新镜像和备份验证
4. 防火墙仅开放必要端口（3100, 5432）

---

文档更新：2026-03-30  版本：v1.1（端口改为 3100，数据库主机为 postgres）
---

## 最近更新（2026-03-30 v1.2）

- 新登录与账户切换
  - 登录页：`/login`（家长/孩子双标签），示例账号：家长 `parent/parent123`，孩子 `child1/1234`。
  - 顶部栏支持“切换账户”“退出登录”（`/api/auth/logout`）。
- 家长家庭管理
  - 页面：`/parent/children` 查看并编辑孩子：改名字、改 PIN、换头像（JPG/PNG，保存在 `public/uploads`）。
  - 接口：
    - GET `/api/family/children` 列表（含 `avatarUrl`）。
    - GET/PUT `/api/family/children/[id]` 修改 `name`/`pin`/`avatarUrl` 或 `avatarBase64`。
- 孩子端宠物互动
  - 页面：`/child/pet`（家长可通过 `?childId=xxx` 预览指定孩子）。
  - 接口：
    - GET `/api/pets/me`（家长可带 `childId` 查询参数）。
    - POST `/api/pets/[childId]/feed|water|clean|play|revive`。
    - 积分不足时将自动执行“轻度照顾”，并返回友好提示。
- 规则与积分
  - 规则详情与维护：
    - GET `/api/point-rules/[id]`，PUT 更新，DELETE 删除，PATCH `/api/point-rules/[id]/toggle` 启停，POST `/api/point-rules/[id]/duplicate` 复制。
  - 积分账户：
    - POST `/api/points/manual-add`、`/api/points/manual-deduct`，GET `/api/points/transactions` 查询流水。
- 数据库变更
  - `User` 表新增 `avatarUrl` 字段。
  - 升级步骤：
    ```bash
    docker-compose up -d --build
    docker-compose exec app npx prisma migrate deploy
    # 可选（开发场景）
    docker-compose exec app npx prisma generate
    ```

### 示例（cURL）

- 修改孩子信息（家长已登录，Cookie 中有 token）：
  ```bash
  curl -X PUT http://localhost:3100/api/family/children/child-1-id \
       -H 'Content-Type: application/json' \
       -d '{"name":"小明","pin":"4321","avatarUrl":"/uploads/child-1-id.png"}'
  ```
- 孩子互动（家长预览或孩子本人）：
  ```bash
  curl -X POST http://localhost:3100/api/pets/child-1-id/feed
  ```

> 说明：NAS/生产环境请在反向代理上配置 HTTPS，放行端口 3100；`public/uploads` 位于应用代码目录（已通过 Compose 绑定到宿主机目录），备份时一并包含。


---

## 最近更新（2026-03-30 v1.3）

- 家长首页 `/parent`
  - 三大 Tab：规则 / 孩子 / 宠物。可在一个页面完成启停规则、编辑孩子（姓名/PIN/头像）、修改宠物属性。
- 3D 宠物（原型）
  - 新增组件：`components/three/Pet3D.tsx`、`components/child/pet-3d-viewer.tsx`。
  - 孩子宠物页（`/child/pet`）默认展示 3D 预览（Orbit 旋转/缩放）。
  - 安装依赖（容器内）：
    ```bash
    docker-compose exec app npm install three @react-three/fiber@8.15.14 @react-three/drei@9.106.0 --legacy-peer-deps
    ```
  - 常见问题：若构建失败，多为 npm peer 依赖冲突或网络中断，重试上面命令即可；或重启 dev 容器。
- 宠物管理 API（家长）
  - PATCH `/api/pets/[childId]`：保存宠物属性（level/exp/hunger/thirst/cleanliness/mood/health/stage/status/name）。

### 3D 模型接入计划（可选）

- 放置模型：将 `.glb/.gltf` 放到 `public/models/pet.glb`。
- 在 `Pet3D` 中加载（示例代码）：
  ```ts
  // import { useGLTF } from '@react-three/drei';
  // const { scene } = useGLTF('/models/pet.glb');
  // return <primitive object={scene} />
  ```
- 交互：将喂食/喂水/清洁/陪玩的 API 回调映射到动画或材质变化。


### 3D 宠物 - 动作动画与模型接入（2026-03-30 增量）

- 动作动画：喂食/喂水/清洁/陪玩 成功后，3D 预览做弹跳/摆动/旋转/脉冲反馈。
- 模型接入：在 `public/models/` 放置 `pet.glb` 即自动加载；若无则使用内置几何体降级。
- 相关代码：
  - 3D 核心：`components/three/Pet3D.tsx`（检测并加载 glTF，`action` 控制动画）
  - 3D 视图：`components/child/pet-3d-viewer.tsx`（动态引入 + 传入 `action`）
  - 页面接入：`app/child/pet/page.tsx`（把最近一次动作传给 3D 视图）
- 自定义模型建议：glTF 二进制（glb），模型以原点为中心、+Y 朝上、+Z 前向，缩放在 1~2 范围内。

---

## 最近更新（2026-03-31 v1.4）

- 全流程打通：孩子提交任务 → 家长审核 → 自动记分；家长首页“孩子”卡片支持快捷加/扣分。
- 顶栏显示待审核数量（家长账号可见，自动刷新）。
- 孩子宠物页显示当前积分；3D 宠物不再自动旋转，动作反馈更柔和；自适应模型尺寸。
- 支持为每个孩子上传独立 3D 模型（glb），并可一键恢复默认模型。
- 新“设置”页可配置喂养/喂水/清洁/陪玩的积分消耗，落盘至 data/pet-config.json。
- “报告”页支持筛选与导出 CSV，并在家长首页的页签栏提供入口。

## 功能与操作指南（v1.4）

### 账号与登录
- 家长：`parent / parent123`
- 孩子：`child1 / 1234`，`child2 / 5678`
- 登录页：`/login`；登录后家长跳转 `/parent`，孩子跳转 `/child/pet`。

### 任务提交与审核
- 孩子端：`/child/tasks` 选择已启用规则提交。
- 家长端审核：`/parent/review` 通过/拒绝；通过时可指定积分，系统自动入账。

### 手动加/扣分（家长快捷入口）
- 位置：`/parent` → 页签“孩子” → 目标孩子卡片 → “加分/扣分”。
- API：
  - `POST /api/points/manual-add`
  - `POST /api/points/manual-deduct`
  - `GET  /api/points/transactions?childId=...`（查询流水）
- 示例（加分）：
```bash
curl -X POST http://localhost:3100/api/points/manual-add \
  -H 'Content-Type: application/json' \
  -d '{"childId":"<child-id>","amount":20,"reason":"奖励阅读"}'
```

### 报告与导出 CSV
- 页面：`/parent/report`，提供“孩子/类型/起止日期”筛选与“导出 CSV”。
- 原始接口：`GET /api/reports/points?childId=all|<id>&type=earn|spend&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&format=csv`

### 3D 宠物与自定义模型
- 默认模型路径：`public/models/pet.glb`。
- 每个孩子可单独上传模型（glb）：
  - 页面：`/parent` → 页签“宠物” → 对应孩子卡片选择 `.glb` 上传。
  - 存储位置：`public/models/pets/<childId>.glb`。
  - 恢复默认模型：同卡片“恢复默认模型”。
- Viewer 行为：关闭自动旋转，动作（喂食/喂水/清洁/陪玩）触发轻微跳动/摆动反馈；模型按包围盒高度自动缩放，视觉高度约 `0.8`。

### 设置（积分消耗）
- 页面：`/parent/settings`。
- API：`GET/PUT /api/pet-config`，持久化于 `data/pet-config.json`。

### 强制刷新与缓存
- 若页面未更新或样式异常：
```bash
docker-compose down --remove-orphans
rm -rf .next
# Windows PowerShell: Remove-Item -Recurse -Force .next
# 重新构建与启动
docker-compose build --no-cache && docker-compose up -d
```

### 常见问题
- 登录失败（旧账号）：执行 `npx prisma db seed` 重新初始化默认账号。
- 3D “加载中”不消失：确认 `public/models/pet.glb` 或 `public/models/pets/<childId>.glb` 存在且可 HEAD 访问；若更换模型后未生效，请清缓存并重启容器。
- 容器端口：默认 `3100:3000`，访问 `http://localhost:3100`。

- 接口速查：docs/api-cheatsheet.md


---

## 最近更新（2026-03-31 v1.5）

- 回收站（软删除）已上线：删除孩子将移入回收站，可“恢复”或“彻底删除”。
- 默认列表/登录/宠物与积分接口均忽略已删除的孩子，避免误操作。
- 新页面：`/parent/recycle`（家长导航可达）。

### 回收站使用
- 软删除（移入回收站）：家长页“孩子”卡片 → 删除；或调用 `DELETE /api/family/children/{id}`。
- 查看回收站：访问 `/parent/recycle`；或 `GET /api/family/children?deleted=true`。
- 恢复：在页面点击“恢复”；或 `POST /api/family/children/{id}/restore`。
- 彻底删除：在页面点击“彻底删除”；或 `DELETE /api/family/children/{id}/purge`（不可撤销）。

### 相关接口变更
- `GET /api/family/children` 新增查询参数 `deleted`：`true|false|all`（默认 `false`）。
- `/api/auth/child-login` 会拒绝 `isDeleted=true` 的孩子账号。
- 宠物互动与积分流水在家长视角会校验 child 未被删除。

> 提示：若页面未显示“回收站”，请刷新浏览器或重启 app 容器。

---

## 最近更新（2026-03-31 v1.5）

- 回收站（软删除）已上线：删除孩子将移入回收站，可“恢复”或“彻底删除”。
- 默认列表/登录/宠物与积分接口均忽略已删除的孩子，避免误操作。
- 新页面：`/parent/recycle`（家长导航可达）。

### 回收站使用
- 软删除（移入回收站）：家长页“孩子”卡片 → 删除；或调用 `DELETE /api/family/children/{id}`。
- 查看回收站：访问 `/parent/recycle`；或 `GET /api/family/children?deleted=true`。
- 恢复：在页面点击“恢复”；或 `POST /api/family/children/{id}/restore`。
- 彻底删除：在页面点击“彻底删除”；或 `DELETE /api/family/children/{id}/purge`（不可撤销）。

### 相关接口变更
- `GET /api/family/children` 新增查询参数 `deleted`：`true|false|all`（默认 `false`）。
- `/api/auth/child-login` 会拒绝 `isDeleted=true` 的孩子账号。
- 宠物互动与积分流水在家长视角会校验 child 未被删除。

> 提示：若页面未显示“回收站”，请刷新浏览器或重启 app 容器。

---

## 最近更新（2026-03-31 v1.5）

- 回收站（软删除）已上线：删除孩子将移入回收站，可“恢复”或“彻底删除”。
- 默认列表/登录/宠物与积分接口均忽略已删除的孩子，避免误操作。
- 新页面：`/parent/recycle`（家长导航可达）。

### 回收站使用
- 软删除（移入回收站）：家长页“孩子”卡片 → 删除；或调用 `DELETE /api/family/children/{id}`。
- 查看回收站：访问 `/parent/recycle`；或 `GET /api/family/children?deleted=true`。
- 恢复：在页面点击“恢复”；或 `POST /api/family/children/{id}/restore`。
- 彻底删除：在页面点击“彻底删除”；或 `DELETE /api/family/children/{id}/purge`（不可撤销）。

### 相关接口变更
- `GET /api/family/children` 新增查询参数 `deleted`：`true|false|all`（默认 `false`）。
- `/api/auth/child-login` 会拒绝 `isDeleted=true` 的孩子账号。
- 宠物互动与积分流水在家长视角会校验 child 未被删除。

> 提示：若页面未显示“回收站”，请刷新浏览器或重启 app 容器。
