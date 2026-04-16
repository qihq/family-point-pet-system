# 家庭积分宠物系统

一个面向家庭场景的积分 + 宠物成长应用。

孩子完成任务或规则打卡后获得积分，家长负责审核、管理奖励与计划，管理员负责家庭账户维护。项目已经整理为可直接部署的 Next.js + Prisma + PostgreSQL 方案，并提供适合群晖 NAS 的 All-in-One Docker 构建方式。

## 当前版本包含

- 孩子端
  - 今日任务、任务中心、积分记录、兑换奖励、宠物成长反馈
  - 完成任务后可直接看到积分、宠物经验、升级/阶段变化
  - 支持推送审核结果通知
- 家长端
  - 待审核中心、孩子概览、积分规则、奖励库存、兑换记录、循环任务
  - 支持审核联动通知、报表筛选与周期对比
- 管理员端
  - 家长账号管理、头像维护、基础运维入口
- 数据与工程
  - Prisma 单例收口
  - Cookie 优先鉴权
  - `tsc` / `lint` / `build` 可通过
  - 登录页公开入口收敛为家长 / 孩子，管理员入口默认不在公开导航展示

## 技术栈

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker / All-in-One 镜像

## 默认账号

仅在首次启动并设置 `STARTUP_SEED=true` 时写入：

- 管理员：`admin / admin123`
- 家长：`parent / parent123`
- 孩子 1：`child1 / 1234`
- 孩子 2：`child2 / 5678`

首次初始化完成后，建议马上修改默认密码和 PIN。

## 目录说明

- `app/`：App Router 页面和 API 路由
- `components/`：复用 UI 组件
- `lib/`：鉴权、Prisma、动作、推送等基础能力
- `server/services/`：任务、积分、宠物成长等服务层
- `prisma/`：Schema、迁移、种子脚本
- `public/`：静态资源与上传目录
- `Dockerfile`：应用镜像
- `Dockerfile.aio.alpine.local`：群晖更适合使用的 All-in-One 镜像

## 本地开发

1. 启动 PostgreSQL

```bash
docker run -d --name fp-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=family_points \
  -p 5432:5432 \
  postgres:16-alpine
```

2. 配置 `.env.local`

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/family_points
NEXTAUTH_SECRET=replace-with-a-long-random-string
```

3. 安装依赖并启动

```bash
npm ci
npx prisma generate
npm run dev
```

## 构建与校验

```bash
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

## 构建 All-in-One 镜像

先构建应用基础镜像，再构建带 PostgreSQL 的 All-in-One 镜像：

```bash
docker build -t family-point:openssl -f Dockerfile .
docker build -t family-point-allinone:latest -f Dockerfile.aio.alpine.local .
```

如果你希望额外打一个日期标签：

```bash
docker tag family-point-allinone:latest family-point-allinone:20260416
```

## 导出 tar 给群晖 NAS

建议把 tar 包放到 `outputs/` 目录：

```bash
mkdir -p outputs
docker save -o outputs/family-point-allinone_20260416.tar family-point-allinone:latest
```

导入群晖方式：

1. 打开 DSM 的容器管理器 / Container Manager
2. 进入“镜像”
3. 选择“新增”或“导入”
4. 从文件导入 `family-point-allinone_20260416.tar`

## 群晖运行建议

- 端口映射：`3100:3000`
- 卷映射
  - 主机 `.../family-point/public` -> 容器 `/app/public`
  - 主机 `.../family-point/db_data` -> 容器 `/var/lib/postgresql/data`
- 环境变量
  - `NEXTAUTH_SECRET=<强随机字符串>`
  - `STARTUP_SEED=true` 仅首次初始化使用

All-in-One 镜像会在容器内部启动 PostgreSQL，并自动将 `DATABASE_URL` 指向 `127.0.0.1:5432`。

## 推送通知

如果需要 Web Push，请配置：

- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_EMAIL`

生成方式：

```bash
npx web-push generate-vapid-keys
```

## 上传与数据目录

- 孩子头像：`/app/public/uploads/avatars`
- 奖励图片：`/app/public/uploads/rewards`
- PostgreSQL 数据：`/var/lib/postgresql/data`

## 常见问题

- 图片不显示
  - 检查 `/app/public` 是否正确映射到 NAS 持久化目录
  - 确保 `uploads/avatars` 和 `uploads/rewards` 已存在且可写
- 初始化后无法登录
  - 确认首次启动时是否设置了 `STARTUP_SEED=true`
  - 初始化成功后请移除该变量，避免重复写种子
- Prisma 迁移失败
  - AIO 启动脚本会优先执行 `prisma migrate deploy`
  - 如果失败，会回退到 `prisma db push --accept-data-loss`

## 补充说明

- `deploy.md` 中保留了更细的群晖部署说明
- 当前仓库按“渐进改造”维护，不建议推倒重来
- 如果要重新导出 NAS 镜像，优先使用 `Dockerfile.aio.alpine.local`
