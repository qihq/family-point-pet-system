# Synology 部署（All-in-One：应用 + PostgreSQL）

适用：DSM 7.x，x86_64（如 918+）。容器内部已内置 PostgreSQL 15，无需单独创建 DB 容器。

## 1) 导入镜像（.tar 文件）
- 从电脑端导入：Container Manager → 镜像 → 添加 → 从文件导入 → 选择 `dist/family-point-allinone_amd64.tar`。
- 也可先把该文件放到 NAS（如 `/volume1/docker/family-point/`），再导入。

## 2) 新建容器（关键参数）
- 端口：主机 `3100` → 容器 `3000`
- 环境变量（首次建议如下）：
  - `NEXTAUTH_SECRET=<随机字符串>`（必须）
  - `STARTUP_SEED=true`（仅首次，自动写入初始账号；初始化完成后删除或改为 `false`）
  - 可选（有默认值）：
    - `POSTGRES_DB=family_points`
    - `POSTGRES_USER=fp_user`
    - `POSTGRES_PASSWORD=fp_pass_please_change`
    - `PORT=3000`
- 存储映射：
  - `/volume1/docker/family-point/db_data` → `/var/lib/postgresql/data`（RW，持久化数据库）
  - `/volume1/docker/family-point/custom` → `/app/public/custom`（RW，可热替换主题/Logo）
- 重启策略：`unless-stopped`

> 说明：容器会在启动时自动初始化数据库（若数据目录为空），随后根据上述 ENV 创建角色/库，并执行 `prisma migrate deploy`。若设置了 `STARTUP_SEED=true`，会导入初始账号数据。

## 3) 首次启动验证
- 查看容器日志应包含：`Initializing PostgreSQL`（首次）、`migrate deploy`、`Seeding database`（若开启种子）。
- 访问 `http://<NAS_IP>:3100`。
- 登录（仅当 `STARTUP_SEED=true` 首次初始化）：
  - 管理员：admin / `admin123`
  - 家长：parent / `parent123`
  - 孩子：child1（PIN 1234），child2（PIN 5678）
- 成功后，编辑容器 → 删除或改为 `STARTUP_SEED=false` 并重启。

## 4) 常见问题
- “不能登录”：多数为未初始化数据。确保第一次运行加了 `STARTUP_SEED=true` 且日志显示 Seeding 成功。
- “端口是 3100 还是 3000”：容器内是 `3000`，主机侧建议映射为 `3100`。
- “要不要先把项目数据复制到 DB 路径”：新部署不需要。首次启动会自动建库。若你有历史数据库，要用 `pg_dump/pg_restore` 迁移，而不是直接拷贝 Node 项目的 `data/`。
- “改了 CSS 要重建镜像吗”：不需要。把自定义样式放到映射的 `/app/public/custom`（如 `theme.css`），刷新即可。

