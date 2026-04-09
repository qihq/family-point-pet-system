# 部署指南（群晖 DSM / Docker）

本文档覆盖两种方式：导入我提供的 AIO 镜像 tar，或从源码自行构建。

## 方案 A：导入 AIO 镜像 tar（最快）
1) 群晖「容器管理器」→ 镜像 → 添加 → 从文件导入，选择 `family-point-allinone_*.tar`。
2) 新建容器：
   - 端口：`3100:3000`（容器内固定 3000）
   - 卷映射：
     - 主机 `/volume1/docker/family-point/public` → 容器 `/app/public`（RW）
     - 主机 `/volume1/docker/family-point/db_data` → 容器 `/var/lib/postgresql/data`（RW）
   - 环境变量：
     - `NEXTAUTH_SECRET=<随机字符串>`
     - 首次初始化加 `STARTUP_SEED=true`（写入默认账号，成功后删除或改为 false）
3) 访问 `http://<NAS_IP>:3100`。

说明：AIO 镜像内置 Postgres，容器内部 `DATABASE_URL` 自动指向 `127.0.0.1:5432`，无需额外数据库容器。

## 方案 B：从源码构建镜像
1) 构建应用镜像（含 openssl1.1-compat）
```
docker build -t family-point:openssl -f Dockerfile .
```
2) 基于应用镜像构建 All‑in‑One（内置 Postgres）
```
docker build -t family-point-allinone:latest -f Dockerfile.aio.alpine.local .
```
3) 运行（同上方案 A 的端口、卷、环境变量）。

## 首次种子与默认账号
- 设置 `STARTUP_SEED=true`，启动成功后看到日志包含：
  - Parent: `parent / parent123`
  - Child1: `child1 / PIN 1234`
  - Child2: `child2 / PIN 5678`
- 之后请去家长/管理员端修改密码。

## 升级与替换容器
- 保留卷映射（`/app/public`, `/var/lib/postgresql/data`）不变。
- 停并删除旧容器 → 导入/构建新镜像 → 按相同映射与环境变量新建容器。
- 首次运行新版本不要带 `STARTUP_SEED`（避免覆盖数据）。

## 备份与恢复
- 数据：备份 `/volume1/docker/family-point/db_data`。
- 静态/上传：备份 `/volume1/docker/family-point/public`。

## 排错速查
- 图片 404：
  - 检查主机是否存在目录：`public/uploads/avatars` 与 `public/uploads/rewards`；
  - 若之前上传在旧容器内，可复制出来：
    - `docker cp <容器名>:/app/public/uploads /volume1/docker/family-point/public/`
- 登录失败：确认未携带 `STARTUP_SEED` 再次覆盖；如需重置用新容器+空数据卷测试。
- Prisma 报错：日志中若 `migrate deploy failed` 随后会自动 `prisma db push`，属预期兜底。

