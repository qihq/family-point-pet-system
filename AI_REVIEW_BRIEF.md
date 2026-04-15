# AI 评审简介（Family Points Pet System）

本简介面向“代码评审型 AI”。请在理解系统目标与边界的基础上，从正确性、安全、可维护性与可扩展性四个维度给出结构化建议。

- 仓库根：C:\Users\qihq\Documents\family point-pet-system
- 主要技术：Next.js 14 + TypeScript、Prisma + PostgreSQL、Tailwind、three.js/React Three Fiber
- 关键配置：C:\Users\qihq\Documents\family point-pet-system\package.json:1、C:\Users\qihq\Documents\family point-pet-system\prisma\schema.prisma:1、C:\Users\qihq\Documents\family point-pet-system\next.config.js:1、C:\Users\qihq\Documents\family point-pet-system\Dockerfile:1

## 一、项目概述
- 目标：为家庭提供“任务积分 + 虚拟宠物成长”的互动系统；孩子完成计划获得积分，家长审核与发放奖励。
- 角色：管理员、家长、孩子（参考 `prisma` 架构与 `app/api/auth/*` 登录接口）。
- 应用形态：Next.js App Router，服务端 API 路由位于 `app/api/**/route.ts`，前端页面位于 `app/**/page.tsx`。

## 二、系统架构与模块
- 前端 UI：`app/`、`components/`，Tailwind 样式在 `app/globals.css`，常用 UI 组件见 `components/ui/*`。
- 服务端 API：`app/api/**` 分模块实现鉴权、任务、积分、宠物、奖励等。
- 领域服务：`server/services/*`（宠物成长/衰减、积分结算、规则与记录等）。
- 鉴权与会话：`lib/auth.ts` 使用 `jose` 生成/校验 JWT，经 `Authorization: Bearer` 或 Cookie 传递；权限守卫在 `server/auth/guards.ts`。
- 数据访问：`prisma/schema.prisma` 定义实体（Family/User/PointRule/PointRecord/PointAccount/Transaction/Pet/Task* /Reward*）。
- 部署：提供 Dockerfile 与 AIO（内置 Postgres）方案，脚本位于根目录与 `docker-entrypoint*.sh`。

## 三、接口与页面地图（示例）
- 认证
  - 家长登录：`/api/auth/parent-login`（POST，body: `{ name, password }`）
  - 孩子登录：`/api/auth/child-login`（POST，body: `{ name, pin }`）
  - 当前用户：`/api/auth/me`，退出：`/api/auth/logout`
- 家庭/成员
  - 家长/孩子 CRUD、软删除/恢复：`/api/family/children/*`
- 任务/计划
  - 规则：`/api/point-rules/*`；记录：`/api/point-records/*`；手工加/扣分：`/api/points/*`
  - 计划与日志：`/api/tasks/*`
- 宠物
  - 状态查询与行为：`/api/pets/[childId]/*`（喂食、饮水、清洁、玩耍、复活、模型）
- 奖励
  - 奖品管理与兑换：`/api/rewards/*`
- 报表
  - 积分报表：`/api/reports/points`

注：页面路由对应 `app/{child|parent|admin}/*` 下的页面文件。

## 四、数据模型要点（Prisma）
- 家庭与成员：`Family` 1—N `User`（`Role={parent,child,admin}`），`User.isDeleted` 软删除。
- 积分：`PointRule`（固定/区间、频率限制）→ 提交 `PointRecord`（`pending/approved/rejected`）→ 记账 `PointTransaction`，余额在 `PointAccount`。
- 宠物：`Pet`（阶段/状态/属性）与 `PetLog`（行为轨迹）；有周期性衰减、互动加成与进化逻辑。
- 计划与奖励：`TaskPlan`、`TaskLog`、`RewardItem`、`RedeemLog`。

## 五、运行与环境
- 关键脚本（`package.json` scripts）：`dev`、`build`、`start`、`prisma:generate`、`prisma:migrate`、`prisma:seed`。
- 核心环境变量：`DATABASE_URL`、`NEXTAUTH_SECRET`、（AIO 部署）`STARTUP_SEED` 等；示例见 `/.env.example`。
- 本地开发：PostgreSQL 16+，`npm ci && npx prisma generate && npm run dev`。

## 六、面向 AI 的评审清单
- 安全
  - 密码/PIN 明文校验：`lib/auth.ts` 中 `verifyPassword/verifyPin` 为直接相等比较，缺少哈希（建议 bcrypt/argon2）。
  - JWT：`NEXTAUTH_SECRET` 管理与过期策略；令牌撤销与旋转；Cookie SameSite/HttpOnly/Secure 设置与 XSS/CSRF 防护。
  - 访问控制：`server/auth/guards.ts` 的家族边界/越权检查在各 API 是否一致应用；管理员接口的保护情况。
  - 文件上传：`/api/rewards/[id]/image` 等 MIME/大小/路径校验与存储目录权限；公开目录下直链访问风险。
- 可靠性与一致性
  - 事务：多表写入（审批->记账->余额更新）是否使用 Prisma 事务包裹；并发扣减/兑换的竞态处理。
  - 频率与配额：PointRule 的 `frequency/maxTimes` 在 API 层是否强约束；防重复提交与幂等性。
- 可维护性
  - 领域逻辑分层：`server/services/*` 的边界与复用；API 路由内是否存在重复业务判断。
  - 错误处理与国际化：部分中文字符串存在乱码（UTF‑8 编码清理）；统一的错误响应结构。
- 性能与前端体验
  - 列表/报表分页与筛选；N+1 查询；图片与 3D 模型资源体积与缓存策略；`middleware.ts` 的缓存头是否合理。
- 测试与质量
  - 现有 `server/services/__tests__/*` 覆盖面；建议补充鉴权/交易/兑换的集成测试与属性测试。

## 七、提案与改进优先级（建议）
1) 鉴权安全：为密码/PIN 引入强哈希（argon2/bcrypt），并加盐与最小长度策略。
2) 交易一致性：审批/兑换路径采用 Prisma 事务（序列化等级或悲观锁），写入统一在服务层。
3) 上传与静态资源：统一使用专用上传目录与白名单 MIME 校验，生成随机文件名；切片/尺寸限制与 CDN 缓存头。
4) 编码与文案：全局 UTF‑8 修复；错误码与 i18n 抽离。
5) 可观察性：关键动作（审批、兑换、宠物进化）结构化日志，Prometheus 指标（次要）。

## 八、快速定位参考文件
- 配置：C:\Users\qihq\Documents\family point-pet-system\package.json:1、C:\Users\qihq\Documents\family point-pet-system\next.config.js:1、C:\Users\qihq\Documents\family point-pet-system\tailwind.config.ts:1
- 数据模型：C:\Users\qihq\Documents\family point-pet-system\prisma\schema.prisma:1
- 鉴权：C:\Users\qihq\Documents\family point-pet-system\lib\auth.ts:1、C:\Users\qihq\Documents\family point-pet-system\server\auth\guards.ts:1
- 核心服务：C:\Users\qihq\Documents\family point-pet-system\server\services\points.service.ts:1、C:\Users\qihq\Documents\family point-pet-system\server\services\pet.service.ts:1
- 代表性 API：C:\Users\qihq\Documents\family point-pet-system\app\api\point-records\route.ts:1、C:\Users\qihq\Documents\family point-pet-system\app\api\rewards\route.ts:1

## 九、评审输出期望（给 AI）
- 交付一份结构化报告，含：
  - 高优先级问题（安全/一致性/数据丢失风险）与修复建议
  - 中优先级问题（维护性/编码规范/测试缺口）
  - 低优先级优化（性能/可观测性/部署工程化）
  - 附：关键路径时序图或伪代码、影响评估与回归测试点
