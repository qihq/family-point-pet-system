# 群晖 NAS 部署说明

这份文档按“从 tar 导入并运行”来写，适合已经拿到 `family-point-allinone_*.tar` 的情况。文末也补了从源码重建镜像的方式。

## 部署前准备

1. 在群晖上确认已经安装 `Container Manager`。
2. 在 NAS 里提前创建两个目录。
   - `/volume1/docker/family-point/public`
   - `/volume1/docker/family-point/db_data`
3. 准备一个强随机字符串，后面要填到 `NEXTAUTH_SECRET`。
4. 把最新 tar 文件上传到 NAS。
   - 例如：`family-point-allinone_20260417.tar`

## 方案 A：导入 tar 并创建容器

### 第 1 步：导入镜像

1. 打开群晖 `Container Manager`。
2. 进入“镜像”。
3. 点击“新增”或“导入”。
4. 选择“从文件添加”。
5. 选中 `family-point-allinone_20260417.tar`。
6. 等待导入完成。

导入成功后，你会看到一个 `family-point-allinone` 镜像。

### 第 2 步：创建容器

1. 在镜像列表中选中 `family-point-allinone`。
2. 点击“运行”。
3. 容器名称建议填：`family-point-aio`。
4. 勾选“启用自动重启”。

### 第 3 步：配置端口

在端口设置里添加一条映射：

- 本地端口：`3100`
- 容器端口：`3000`

如果你想换端口也可以，但容器端口必须保持 `3000`。

### 第 4 步：配置存储卷

在“卷”或“文件夹/挂载路径”里添加两条映射：

- NAS 路径 `/volume1/docker/family-point/public` -> 容器路径 `/app/public`
- NAS 路径 `/volume1/docker/family-point/db_data` -> 容器路径 `/var/lib/postgresql/data`

这两条很关键：

- `/app/public` 用来保存头像、奖励图片和上传资源
- `/var/lib/postgresql/data` 用来保存数据库

只要这两个目录不丢，升级镜像时数据就会保留。

### 第 5 步：配置环境变量

至少配置下面这些：

- `NEXTAUTH_SECRET=这里填你的强随机字符串`
- `TZ=Asia/Shanghai`
- `POSTGRES_DB=family_points`
- `POSTGRES_USER=fp_user`
- `POSTGRES_PASSWORD=fp_pass_please_change`
- `STARTUP_SEED=true`

说明：

- `STARTUP_SEED=true` 只在第一次初始化时使用
- 第一次部署成功后，下一次重建容器时请改成 `false`，或者直接删除这个变量

### 第 6 步：启动容器

1. 确认设置无误后启动容器。
2. 第一次启动会自动完成这些动作：
   - 初始化 PostgreSQL
   - 创建数据库和账号
   - 执行 Prisma 迁移
   - 如果 `STARTUP_SEED=true`，自动写入默认测试账号
   - 启动 Next.js

### 第 7 步：检查健康状态

启动后先看容器日志，确认没有明显报错。

再在浏览器里访问：

- `http://NAS_IP:3100`
- `http://NAS_IP:3100/api/health`

如果健康接口返回 `status: ok`，说明服务已经起来了。

### 第 8 步：首次登录

如果你启用了 `STARTUP_SEED=true`，默认账号会被写入：

- 管理员：`admin / admin123`
- 家长：`parent / parent123`
- 孩子 1：`child1 / 随机 6 位 PIN`
- 孩子 2：`child2 / 随机 6 位 PIN`

注意：

- 孩子账号的 PIN 每次初始化都是随机生成的，不是固定 `1234 / 5678`
- 首次启动成功后，请到容器日志中查找 `=== FIRST RUN CREDENTIALS ===`
- 初始化完成后建议立即修改默认密码和 PIN

### 第 9 步：完成首次部署后的收尾

首次部署成功后，建议这样做：

1. 停掉当前容器。
2. 编辑容器配置，删除 `STARTUP_SEED=true`，或改成 `STARTUP_SEED=false`。
3. 重新启动容器。

这样可以避免下次重启时重复写入种子数据。

## 升级到新版本

以后升级时，按下面的步骤做即可：

1. 备份这两个目录。
   - `/volume1/docker/family-point/public`
   - `/volume1/docker/family-point/db_data`
2. 在 `Container Manager` 导入新的 tar。
3. 停止旧容器。
4. 删除旧容器。
   - 只删容器，不删卷目录
5. 用新镜像重新创建容器。
6. 保持原来的端口、卷映射和环境变量。
7. 升级时不要再带 `STARTUP_SEED=true`。

只要卷映射没变，原有数据会继续保留。

## 常见问题排查

### 1. 页面能打开，但图片不显示

优先检查：

1. `/volume1/docker/family-point/public` 是否已经正确挂载到 `/app/public`
2. `public/uploads/avatars` 和 `public/uploads/rewards` 是否存在
3. 目录是否有写权限

### 2. 登录总是提示“用户名或密码错误”

优先检查：

1. `NEXTAUTH_SECRET` 是否填写
2. 第一次部署时是否启用了 `STARTUP_SEED=true`
3. 容器日志里是否出现 `=== FIRST RUN CREDENTIALS ===`
4. 如果日志里出现 `Seed failed`、`Cannot find module`、Prisma 初始化失败等错误，说明默认账号根本没有创建成功

如果你不保留旧数据，最稳妥的处理方式是：

1. 停掉容器
2. 删除或清空 `db_data`
3. 用最新 tar 重新导入镜像
4. 重新创建容器，并在首次启动时设置 `STARTUP_SEED=true`
5. 等日志打印出 `=== FIRST RUN CREDENTIALS ===` 后再登录

### 3. 升级后数据没了

通常是因为容器重建时没有重新挂载：

- `/app/public`
- `/var/lib/postgresql/data`

### 4. 启动日志里有 Prisma migrate 失败

当前镜像的入口脚本会先尝试：

- `prisma migrate deploy`

如果失败，会自动回退到：

- `prisma db push --accept-data-loss`

所以看到一次 migrate 失败不一定代表容器起不来，要继续看后面的日志。

### 5. 想重新初始化一套全新测试数据

最稳妥的方式是：

1. 停掉容器
2. 备份旧的 `db_data`（如果你还需要）
3. 清空或更换新的 `db_data` 目录
4. 再次以 `STARTUP_SEED=true` 启动

## 可选：启用推送通知

如需 Web Push，请额外配置：

- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_EMAIL`

本地生成方式：

```bash
npx web-push generate-vapid-keys
```

## 方案 B：从源码重建镜像

如果你不是导入 tar，而是想自己在本地重新构建：

1. 先构建应用镜像

```bash
docker build -t family-point:openssl -f Dockerfile .
```

2. 再构建 All-in-One 镜像

```bash
docker build -t family-point-allinone:latest -f Dockerfile.aio.alpine.local .
```

3. 导出 tar

```bash
docker save -o outputs/family-point-allinone_20260417.tar family-point-allinone:latest
```

4. 然后按上面的“方案 A”去群晖导入和运行。
