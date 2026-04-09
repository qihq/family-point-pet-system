# 部署到群晖（Synology）Docker/Container Manager - Step by Step

本文提供两种方式：
- 方式 A：直接导入离线镜像（适合不想在群晖上构建镜像）
- 方式 B：使用 Compose 一键部署（DSM 7.2+ 的 Container Manager 支持）

准备工作
1) 在开发机（Windows）已安装 Docker Desktop。
2) 在仓库根目录（本项目根）已经新增：`Dockerfile`、`docker-entrypoint.sh`、`deploy/compose.synology.yaml`。
3) 准备好数据库账号/密码与一个随机的 `NEXTAUTH_SECRET`。

----------------------------------
方式 A：导入离线镜像 + 手工创建容器
----------------------------------
在“开发机”上打包镜像（导出为 .tar）：
1. 打开终端，切到项目根目录：
   PowerShell: `Set-Location 'C:\Users\qihq\Documents\family point-pet-system'`
2. 构建镜像（amd64 适配多数群晖机型；若你的 NAS 是 ARM，改为 linux/arm64）：
   `docker buildx build --platform linux/amd64 -t family-point:latest .`
3. 导出镜像为文件：
   `docker save -o dist/family-point_latest_amd64.tar family-point:latest`
   （如无 dist 目录先创建：`New-Item -ItemType Directory -Path .\dist`）
4. 把 `family-point_latest_amd64.tar` 复制到群晖 NAS（例如通过 SMB/AFP/文件总管）。

在“群晖”上导入镜像并创建容器：
1. 打开 套件中心 →（Docker/Container Manager）。
2. 镜像 → 添加 → 从文件导入 → 选择 `family-point_latest_amd64.tar`。
3. 创建 Postgres 容器（或复用现有数据库）：
   - 镜像选 `postgres:16`
   - 环境变量：`POSTGRES_DB=family_points`、`POSTGRES_USER=fp_user`、`POSTGRES_PASSWORD=fp_pass_please_change`
   - 存储：挂载 `/var/lib/postgresql/data` 到一个持久卷/共享文件夹
   - 端口：如需外网访问 DB，可映射 5432；否则可不映射（同网桥容器用名字互联即可）
4. 创建应用容器（使用导入的 `family-point:latest`）：
   - 端口映射：主机 3100 → 容器 3000
   - 环境变量（按需修改）：
     - `DATABASE_URL=postgresql://fp_user:fp_pass_please_change@postgres容器名:5432/family_points`
     - `NEXTAUTH_SECRET=一串随机字符串`
     - `STARTUP_SEED=true`（仅首次，初始化演示数据；随后改为 false 或删除该变量）
     - 可选：`ADMIN_NAME=admin`、`ADMIN_PASSWORD=admin123`
   - 重启策略：unless-stopped
   - 网络：与 Postgres 放到同一网络（同网桥即可），这样可用容器名互通
5. 首次启动完成后，进入容器日志确认：出现 “Prisma migrate deploy… Seeding…” 且成功。
   再把 `STARTUP_SEED` 改为 `false`，重启应用容器。
6. 访问 `http://NAS_IP:3100` 验证应用。

备注：若你的 NAS CPU 为 ARM，请在构建时把 `--platform` 改为 `linux/arm64` 并导出对应 tar。

----------------------------------
方式 B：Compose 一键部署（推荐）
----------------------------------
1. 在开发机构建并上传镜像（同上 A-1~A-3）。或你也可以把 `compose.synology.yaml` 中 app.image 改为远端仓库镜像并 push。
2. 打开群晖 Container Manager：项目 → 新增 → 导入 Compose → 选择 `deploy/compose.synology.yaml`。
3. 在导入向导里编辑以下变量：
   - `NEXTAUTH_SECRET` 改为随机字符串
   - 首次部署把 `STARTUP_SEED` 设为 `"true"`，完成后改回 `"false"`
   - 如需外网访问 DB，可把 `db` 服务的 5432 端口映射到主机
4. 完成后启动项目，访问 `http://NAS_IP:3100`。

----------------------------------
环境变量一览
----------------------------------
- `DATABASE_URL`（必填）Postgres 连接串，例如：`postgresql://fp_user:fp_pass@db:5432/family_points`
- `NEXTAUTH_SECRET`（必填）任意长随机字符串，用于 JWT 签名
- `STARTUP_SEED`（可选）`true/false`，首次部署置为 true 初始化演示数据
- `ADMIN_NAME` / `ADMIN_PASSWORD`（可选）影响种子里的管理员账号
- `PORT`（可选，默认 3000）容器内服务端口

----------------------------------
常见问题
----------------------------------
- 报错 `Unexpected end of JSON input`：通常是反向代理或容器返回了空响应。查看容器日志 + 浏览器 Network 的 Response 文本定位接口。
- 应用容器起不来：检查 `DATABASE_URL` 是否可达；先启动 Postgres，再启动应用；或在 compose 里用 `depends_on`。
- Excel 打开 CSV 乱码：本项目已改为 UTF-8 with BOM 输出；如仍有问题，确认你下载的 CSV 来自新版本容器。
