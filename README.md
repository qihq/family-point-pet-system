# 家庭积分宠物系统

一个面向家庭场景的积分 + 宠物成长应用。

孩子完成计划任务或积分规则打卡后获得积分，家长负责审核、奖励和计划管理，管理员负责账户运维和系统维护。项目基于 Next.js App Router、Prisma 和 PostgreSQL，支持本地开发，也支持导出适合群晖 NAS 导入的 All-in-One Docker 镜像。

## 当前版本包含

- 登录入口
  - 登录页已收敛为家长 / 孩子 / 管理员三个清晰入口
  - 页面不再展示默认密码提示，避免和真实环境混淆
- 孩子端
  - 首页、任务中心、周计划、成长页、奖励页、记录页
  - `/child/tasks` 同时展示计划任务和积分规则
  - `/child/plans` 展示周历、当天安排、计划任务和积分规则
  - 家长审核完成后，孩子端任务状态会同步更新，不再一直停留在“待审核”
  - `/child/growth` 改为实时获取最新成长数据，积分与兑换记录更新更及时
- 家长端
  - 待审核中心、孩子概览、积分规则、奖励库存、兑换记录、循环任务
  - 审核流与通知联动
- 管理员端
  - 家长账户管理、头像维护、系统健康和后台运维入口
- 工程基线
  - Prisma 共享单例
  - 认证逐步统一到 `requireRequestAuth`
  - `npx tsc --noEmit --pretty false`、`npm run lint`、`npm run build` 可通过

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

初始化完成后，建议马上修改默认密码和 PIN。

## 目录说明

- `app/`：App Router 页面和 API 路由
- `components/`：复用 UI 组件
- `lib/`：鉴权、Prisma、共享逻辑、推送等基础能力
- `server/services/`：任务、积分、宠物成长等服务层
- `prisma/`：Schema、迁移、种子脚本
- `public/`：静态资源与上传目录
- `Dockerfile`：应用镜像
- `Dockerfile.aio.alpine.local`：适合群晖使用的 All-in-One 镜像

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

先构建应用镜像，再构建带 PostgreSQL 的 All-in-One 镜像：

```bash
docker build -t family-point:openssl -f Dockerfile .
docker build -t family-point-allinone:latest -f Dockerfile.aio.alpine.local .
```

如果需要额外保留一个日期标签：

```bash
docker tag family-point-allinone:latest family-point-allinone:20260416
```

## 导出 tar 给群晖 NAS

建议把导出文件放到 `outputs/` 目录：

```bash
mkdir -p outputs
docker save -o outputs/family-point-allinone_20260416.tar family-point-allinone:latest
```

导入步骤：

1. 打开 DSM 的 Container Manager
2. 进入“镜像”
3. 选择“新增”或“导入”
4. 导入 `family-point-allinone_20260416.tar`

## 群晖运行建议

- 端口映射：`3100:3000`
- 卷映射
  - 主机 `.../family-point/public` -> 容器 `/app/public`
  - 主机 `.../family-point/db_data` -> 容器 `/var/lib/postgresql/data`
- 环境变量
  - `NEXTAUTH_SECRET=<强随机字符串>`
  - `STARTUP_SEED=true` 仅首次初始化使用

All-in-One 镜像会在容器内部启动 PostgreSQL，并自动把 `DATABASE_URL` 指向 `127.0.0.1:5432`。

## 推送通知

如需启用 Web Push，请配置：

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
  - 初始化成功后请移除该变量，避免重复写入种子
- Prisma 迁移失败
  - AIO 启动脚本会优先执行 `prisma migrate deploy`
  - 如失败，会回退到 `prisma db push --accept-data-loss`

## 说明

- `deploy.md` 保留了更细的群晖部署说明
- 项目当前按“渐进改造”路线维护，不建议推倒重来
- 如果要重新导出 NAS 镜像，优先使用 `Dockerfile.aio.alpine.local`
