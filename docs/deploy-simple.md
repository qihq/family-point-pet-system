# 家庭积分宠物系统 - 简单部署指南

> 面向零基础用户，跟着步骤一步步即可完成部署。

---

## 准备工作
- 已安装 Docker Desktop（Windows/Mac）或在 NAS 上启用 Docker/Container Station
- 可用磁盘空间 ≥ 10GB，内存 ≥ 2GB

---

## 第一步：获取项目

- 下载 ZIP 并解压到任意目录，或使用 Git 克隆：
```bash
# 可选
# git clone <your-repo-url> family-point-pet
# cd family-point-pet
```

---

## 第二步：配置环境变量

复制 `.env.example` 为 `.env`，并根据需要修改：

```ini
APP_PORT=3100
NEXTAUTH_URL=http://localhost:3100
NEXTAUTH_SECRET=请改为随机字符串（生产必须修改）

# 容器内数据库连接（保持不变即可）
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/family_pet"

# 独立数据库参数（compose 会读取）
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=family_pet
DB_PORT=5432
```

---

## 第三步：启动服务

在项目根目录执行：
```bash
docker-compose up -d --build
```
完成后查看状态：
```bash
docker-compose ps
```
应看到端口映射 `0.0.0.0:3100->3000/tcp`。

---

## 第四步：初始化数据库

```bash
docker-compose exec app npx prisma migrate deploy
# 如需种子数据（可选）
docker-compose exec app npx prisma db seed
```

---

## 第五步：访问应用

- 本机访问：http://localhost:3100
- 局域网访问（示例）：`http://192.168.1.100:3100`
- 如果打不开，请检查：
  1) Docker 是否运行：`docker-compose ps`
  2) 端口是否正确：`http://IP地址:3100`
  3) 防火墙是否放行 3100 端口

---

## 常见操作

- 查看应用日志：`docker-compose logs -f app`
- 重启应用：`docker-compose restart app`
- 停止并移除：`docker-compose down`

---

## 备份与恢复（简版）

- 备份：
```bash
docker exec family-point-pet-db pg_dump -U postgres family_pet > backup_$(date +%Y%m%d).sql
```
- 恢复：
```bash
docker exec -i family-point-pet-db psql -U postgres family_pet < backup_20240115.sql
```

祝你部署顺利！
---

## 最近更新（2026-03-30 简版）

- 登录页：`/login`（家长/孩子）。顶部支持“切换账户/退出”。
- 家长管理孩子：`/parent/children`（改名、改 PIN、换头像）。头像会保存到 `public/uploads`。
- 孩子宠物互动：`/child/pet`；家长可用 `?childId=xxx` 预览并操作。
- 新 API（常用）：
  - GET `/api/family/children`、GET/PUT `/api/family/children/[id]`
  - GET `/api/pets/me`、POST `/api/pets/[childId]/feed|water|clean|play|revive`
- 升级数据库（一次性）：
  ```bash
  docker-compose up -d --build
  docker-compose exec app npx prisma migrate deploy
  ```

提示：如果修改了头像，记得备份 `public/uploads` 目录。

---

## 新增（2026-03-30 简版 v1.3）

- 家长首页：`/parent`（规则 / 孩子 / 宠物 一站式管理）。
- 3D 宠物预览（原型）：`/child/pet` 页面内展示。
- 需要安装依赖（容器内执行一次）：
  ```bash
  docker-compose exec app npm install three @react-three/fiber@8.15.14 @react-three/drei@9.106.0 --legacy-peer-deps
  ```
- 若后续接入 3D 模型，请将 glTF 放到 `public/models/` 目录。

### 3D 宠物（原型）
- `/child/pet` 页面展示 3D 预览，并在喂食/喂水/清洁/陪玩后给出动画反馈。
- 可把 `pet.glb` 放到 `public/models/` 自动替换为自定义模型。

---

## 新增（2026-03-31 简版 v1.4）
- 家长首页“孩子”卡片支持快捷加分/扣分；顶栏显示待审核数量。
- 报告页支持筛选与导出 CSV（家长导航可达）。
- 3D 宠物不自动旋转；支持为每个孩子单独上传 glb 模型，恢复默认模型一键可用。
- 设置页可调整宠物互动积分消耗。

---

## 新增（2026-03-31 简版 v1.5）
- 支持“回收站”：删除孩子 → 可在“回收站”恢复或彻底删除。
- 入口：顶部导航 → 回收站；页面路径 `/parent/recycle`。
