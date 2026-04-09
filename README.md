# 家庭积分宠物系统 (Family Points Pet System)

一个面向家庭的积分+虚拟宠物成长系统：孩子完成任务得分，家长审核、兑换奖品；内置“家长端/孩子端/管理员端”。已提供 All‑in‑One Docker 镜像（应用 + PostgreSQL），适合群晖 DSM 一键部署。

## 功能特性
- 孩子端：登录、提交任务、查看积分、宠物养成与互动
- 家长端：积分规则管理、审核记录、奖品管理、学习计划、回收站
- 管理员端：家长管理、管理员资料
- 文件上传：孩子头像、奖品图片（保存到 `/app/public/uploads`）
- 首次种子：支持一次性写入默认账号
- 数据层：Prisma + PostgreSQL；启动时优先 `migrate deploy`，失败自动回退 `prisma db push`

## 角色与默认账号（仅首次种子 STARTUP_SEED=true 时写入）
- 管理员：admin / admin123
- 家长：parent / parent123
- 孩子：child1 PIN 1234，child2 PIN 5678

## 技术栈
- Next.js 14 + TypeScript
- Prisma ORM + PostgreSQL
- Docker / AIO 镜像（Alpine，内置 openssl1.1‑compat）

## 目录结构简述
- `app/` 前后端路由与页面（app router）
- `components/` 复用组件
- `lib/` 工具与鉴权
- `prisma/` 数据模型与迁移、种子
- `public/` 静态资源与上传（`public/uploads/avatars`, `public/uploads/rewards`）
- `Dockerfile` 应用镜像（无数据库）
- `Dockerfile.aio.alpine.local` All‑in‑One 镜像（内置 Postgres）
- `docker-entrypoint*.sh` 入口脚本

## 本地开发（可选）
1) 准备 Postgres（Docker 示例）
```
docker run -d --name fp-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=family_points -p 5432:5432 postgres:16-alpine
```
2) 配置环境变量 `.env.local`
```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/family_points
NEXTAUTH_SECRET=dev-secret
```
3) 安装依赖并运行
```
npm ci
npx prisma generate
npm run dev
```

## 生产部署（群晖 DSM 推荐）
请阅读根目录 `deploy.md`，包含：
- 直接导入 AIO 镜像 tar 或从源码构建
- 卷映射与权限
- 环境变量（`NEXTAUTH_SECRET`、`STARTUP_SEED`）
- 升级与数据保留

## 常见问题
- 图片不显示：确保把主机 `/volume1/docker/family-point/public` 映射到容器 `/app/public` 且可写；存在 `public/uploads/avatars` 与 `public/uploads/rewards` 两个目录。
- 乱码：源码已统一为 UTF‑8（无 BOM）；若历史数据包含乱码，编辑保存一次或重新种子即可。
- 数据库迁移报错：AIO 启动脚本会自动回退到 `prisma db push`，保证字段齐全。

