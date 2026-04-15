# 家庭积分宠物系统 · Docker 部署（含群晖 NAS 918+ 指南）

本文档覆盖开发/生产两种部署方式，并考虑未来 UI 快速迭代、3D 模型自动压缩与持久化数据。

---

## 1. 环境准备
- 群晖 DSM 7.x（DS918+）+ 容器管理器（Docker）
- 已开启 SSH（便于排错，可选）
- 建议目录（NAS 共享文件夹）
  - `/volume1/docker/family-pet/pgdata` — PostgreSQL 数据
  - `/volume1/docker/family-pet/uploads` — 上传目录（奖品图片、宠物模型等）
  - 可选：`/volume1/docker/family-pet/public-models` — 全局模型（可替代镜像内的 public/models）

## 2. 准备 .env（在项目根目录）
示例：
```
APP_PORT=3100
DB_USER=postgres
DB_PASSWORD=your_strong_pwd
DB_NAME=family_pet
DB_PORT=5432
TZ=Asia/Shanghai
# 认证/签名（保持稳定，不要频繁改动）
JWT_SECRET=replace_with_long_random_string
NEXTAUTH_SECRET=replace_with_long_random_string
NEXTAUTH_URL=http://localhost:3100
```

## 3. 数据卷与路径约定
- 应用容器会读取并写入：`/app/public/uploads`
  - 奖品图片：`/app/public/uploads/rewards/<id>.png|jpg`
  - 孩子宠物模型：`/app/public/uploads/pets/{childId}.glb`（高清）/ `{childId}-lite.glb`（低模）
  - 若使用“自动压缩方案 B（目录监听）”，请把原始模型命名为 `{childId}.src.glb`，系统会自动产出 `-lite.glb` 和 `.glb`
- 数据库：`/var/lib/postgresql/data`

## 4. 开发环境（热更新，适合调试 UI）
- 已提供 `docker-compose.yml`（开发版）
  - 端口映射：宿主 3100 → 容器 3000
  - 挂载代码目录：`.` → `/app`（支持热更新）
  - 启动命令：`npm run dev`
  - 附带模型自动压缩 sidecar：`model-worker`（监听 `public/uploads/pets/*.src.glb`）
- 启动：
```
docker compose up -d app model-worker postgres
```
- 健康检查与重启：
```
docker compose logs -f app
curl -I http://<NAS-IP>:3100/
```
- 强制重建（清 Next 缓存、重拉依赖、迁移 DB）：
```
npm run dev:rebuild
```

## 5. 生产环境（稳定运行）
建议新建 `docker-compose.prod.yml`（与开发 compose 并存）：
```
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: family-point-pet-app
    ports:
      - "${APP_PORT:-3100}:3000"
    environment:
      - TZ=${TZ}
      - DATABASE_URL=postgresql://${DB_USER:-postgres}:${DB_PASSWORD}@postgres:${DB_PORT:-5432}/${DB_NAME:-family_pet}
      - JWT_SECRET=${JWT_SECRET}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - postgres
    volumes:
      - /volume1/docker/family-pet/uploads:/app/public/uploads
      # 可选：统一管理全局模型（无需重建镜像即可换模型）
      # - /volume1/docker/family-pet/public-models:/app/public/models:ro
    command: sh -lc "npx prisma migrate deploy && npm run build && npm run start"
    restart: unless-stopped

  model-worker:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: family-point-pet-model-worker
    environment:
      - TZ=${TZ}
    volumes:
      - /volume1/docker/family-pet/uploads:/app/public/uploads
    command: npm run worker:models
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    container_name: family-point-pet-db
    environment:
      - TZ=${TZ}
      - POSTGRES_USER=${DB_USER:-postgres}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME:-family_pet}
    volumes:
      - /volume1/docker/family-pet/pgdata:/var/lib/postgresql/data
    restart: unless-stopped
```
- 启动生产：
```
docker compose -f docker-compose.prod.yml up -d --build
```
- 首次启动会自动执行 Prisma 迁移与 Next 构建；之后重启无需重新构建，除非你更新了代码/依赖。

## 6. 反向代理与 HTTPS（群晖 DSM）
- 控制面板 → 登录门户 → 高级 → 反向代理
  - 源：`https://your-domain`（或 `https://nas.example.com/app`）
  - 目标：`http://127.0.0.1:3100`
- 证书：DSM“安全性”中导入/申请证书并绑定到该域名
- 优化：在反代“自定义标头”里开启 gzip/Brotli（DSM 版本允许的情况下）

## 7. UI 迭代与升级策略
- 开发期：使用开发 compose（热更新），确认无误后打包生产镜像
- 生产期：两种方式
  - 构建新镜像 + 原地滚动：
    - `docker compose -f docker-compose.prod.yml build app`
    - `docker compose -f docker-compose.prod.yml up -d app`（零数据丢失；短暂重启窗口）
  - 蓝绿/灰度（可选）：准备 `app_blue` 与 `app_green` 两组服务，Nginx/DSM 反代在两组间切换
- 静态资产与上传
  - 上传目录挂卷 `/app/public/uploads`，升级镜像时不会丢失
  - 前端已做 3D 模型低模→高清切换与延迟控件加载，更新 UI 不影响存量模型

## 8. 3D 模型上线流程（自动压缩 · 方案 B）
- 把原始 GLB 上传到：`/volume1/docker/family-pet/uploads/pets/{childId}.src.glb`
- `model-worker` 会自动生成：
  - `{childId}-lite.glb`（先渲染）
  - `{childId}.glb`（空闲后切换）
- 全局模型（面向所有孩子）：
  - 把 `pet.src.glb` 放入 `/volume1/docker/family-pet/public-models/`（若挂了只读映射）
  - 在宿主机执行：
    - `docker compose -f docker-compose.prod.yml exec app sh -lc "npx gltfpack -i public/models/pet.src.glb -o public/models/pet.glb -c -si 0.95 && npx gltfpack -i public/models/pet.src.glb -o public/models/pet-lite.glb -c -si 0.6"`

## 9. 奖品图片与静态资源
- 上传图片 API 会把文件写到 `/app/public/uploads/rewards/`，外部访问路径 `/uploads/rewards/<file>`
- 若图片在 NAS 中不可见，请确认卷映射是否包含该子目录

## 10. 备份与恢复
- PostgreSQL：
  - 定时 `pg_dump` 导出，或直接备份 `pgdata` 卷
- 上传目录：
  - 备份 `/volume1/docker/family-pet/uploads`（包含奖品图与模型）
- 恢复：
  - 先恢复 `pgdata` 与 `uploads`，再恢复应用镜像/启动服务

## 11. 性能与排错
- 性能
  - DS918+ 作为家庭网盘/轻服务足够；若首帧慢，优先确保模型已压缩（Draco + 低模）
  - 反代开启压缩；前端 Canvas 已设 `dpr=[1,1.25]` 与 `antialias=false`
- 常用排错命令
  - 查看日志：`docker compose logs -f app` / `model-worker` / `postgres`
  - 健康探测：`curl -I http://127.0.0.1:3100`
  - 清构建缓存（开发）：`npm run dev:rebuild`
  - 检查数据库连通：`docker compose exec postgres psql -U $DB_USER -d $DB_NAME -c "\dt"`

## 12. 可选：彻底离线解码器
- 将 Draco/KTX2 转码器复制到 `public/vendor/draco/`、`public/vendor/basis/`
- 修改 `components/three/Pet3D.tsx`：
  - `DRACOLoader.setDecoderPath('/vendor/draco/1.5.6/')`
  - `KTX2Loader.setTranscoderPath('/vendor/basis/')`
- 这样 NAS 无需访问外部 CDN

---

## FAQ
- Q：更换模型需要重建镜像吗？
  - A：不需要。把 `{childId}.src.glb` 放进 `uploads/pets` 即会自动生成新版低模/高清并生效；全局模型可通过挂载 `public-models` 后在容器内执行压缩命令。
- Q：UI 修改如何快速上线？
  - A：开发环境热更新，确认后构建生产镜像并 `up -d` 滚动更新；上传目录与 DB 均持久化，不受影响。
- Q：打开 3D 页面很慢？
  - A：优先检查是否已有 `-lite.glb` 与 Draco 压缩；NAS 局域网下建议本地化解码器以避免外网波动。

## 常见问题：端口映射异常（localhost 拒绝连接 / 打到随机端口）
- 症状：浏览器访问 `http://localhost:3100` 提示 “refused to connect”，或 `docker compose ps` 显示 app 暴露为 `0.0.0.0:5xxxx->3000/tcp` 的随机端口。
- 根因：`docker-compose.yml` 使用了 `ports: ":3000"` 的短写，只暴露容器 3000 端口，宿主机会分配随机端口；或存在并发起的重复容器导致映射混乱。
- 解决：
  1) 将 `docker-compose.yml` 改为固定映射：
     ```yaml
     services:
       app:
         ports:
           - "${APP_PORT:-3100}:3000"
     ```
     并在 `.env` 设置 `APP_PORT=3100`。
  2) 彻底重建网络和容器：
     ```bash
     docker compose down --remove-orphans
     docker compose up -d
     ```
  3) 验证：
     ```bash
     docker compose ps
     # 应看到 0.0.0.0:3100->3000/tcp
     curl -I http://127.0.0.1:3100/
     ```
- 额外建议：
  - 同一时间只运行一份 Next 开发进程（避免 .next 被并发写入）。
  - 如仍异常，清理 Next 缓存并重启：
    ```bash
    docker compose exec app sh -lc 'rm -rf .next'
    docker compose restart app
    ```
