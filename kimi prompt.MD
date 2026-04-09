可以，下面就是可直接保存成 continue_tasks_kimi.md 的 markdown 成品。它专门按 Kimi 2.5 + Continue + 防截断 + 单文件输出 的方式整理，适合你现在这个家庭积分宠物系统项目使用。
​

text
# continue_tasks_kimi.md

# 家庭积分宠物系统 - Kimi 2.5 + Continue 防截断开发清单

> 适用场景：
> - VS Code + Continue
> - Kimi 2.5 coding plan
> - Next.js + TypeScript + PostgreSQL + Prisma
> - Docker 部署到 NAS
>
> 核心原则：
> 1. 一次只做一个文件。
> 2. 一个 Prompt 只完成一个小目标。
> 3. 所有长输出都允许拆成 Part 1 / Part 2。
> 4. 输出被截断时，只续写断点，不重写全文件。
> 5. 每做完一步，先本地运行、验证、提交 Git。

---

## 1. 固定系统 Prompt

> 每次给 Continue 发任务时，建议把下面这段放在最前面。

```text
你现在是这个项目的高级全栈工程师，请严格遵守以下规则：

【项目背景】
1. 项目名称：家庭积分宠物系统。
2. 项目目标：家长配置积分规则，孩子完成任务、家务或自理行为后获得积分，并使用积分照顾虚拟宠物。
3. 核心功能：积分规则、任务提交、家长审核、积分账户与流水、宠物喂食、喂水、洗澡、陪玩、进化、死亡、复活。
4. 用户角色：parent、child。
5. 部署目标：Docker 部署到 NAS。
6. 技术方向：Next.js + TypeScript + PostgreSQL + Prisma。

【输出规则】
1. 这次只完成一个很小的子任务，不要扩展到其他模块。
2. 如果需要改文件，先列出本次只会修改哪些文件。
3. 一次只输出一个文件的完整内容，除非我明确允许多个文件。
4. 如果内容过长，请主动拆成 Part 1 / Part 2，并在 Part 1 结束后停止，等我回复“继续”。
5. 不要重构已有代码，不要另起一套架构。
6. 输出顺序固定为：实现说明 → 文件清单 → 完整代码 → 如何验证。
7. 如果发现上下文不足，先列出最少需要我确认的问题。
8. 如果输出被截断，后续只从断点继续，不要重写前面内容。
9. 页面文案用中文，代码命名用英文。
10. 如果实现涉及文件更新，请输出完整文件内容，方便我直接覆盖。
11. 在开始写代码前，先阅读当前项目已有文件，避免重复实现。
12. 优先保证代码完整、可运行、可复制，不要为了“看起来完整”而擅自生成无关文件。

【代码风格】
1. 使用 TypeScript。
2. 代码结构清晰，命名统一。
3. 所有接口都要有基础错误处理。
4. 所有数据库写操作都要考虑事务一致性。
5. 尽量复用已有 Prisma、类型定义和工具函数。
2. 通用附加限制
每个任务后面都建议追加这段。

text
附加要求：
1. 只输出这一个文件。
2. 不要顺手生成别的文件。
3. 如果内容过长，请拆成 Part 1 / Part 2。
4. 输出完 Part 1 先停下，等我回复“继续”。
5. 如果已有代码不完整，请先告诉我还缺什么，不要自行猜测整个项目结构。
3. 推荐执行顺序
 01. 设计目录结构

 02. 生成 package.json

 03. 生成 docker-compose.yml

 04. 生成 Dockerfile

 05. 生成 .env.example

 06. 生成 prisma/schema.prisma 基础头部

 07. 添加 Family / User / Role

 08. 添加 PointRule / PointRuleTarget

 09. 添加 PointRecord / PointAccount / PointTransaction

 10. 添加 Pet / PetLog

 11. 生成 prisma/seed.ts

 12. 生成 types/auth.ts

 13. 生成 lib/auth.ts

 14. 生成 parent 登录接口

 15. 生成 child PIN 登录接口

 16. 生成当前用户接口

 17. 生成权限校验工具

 18. 生成 point-rule.service.ts 基础版

 19. 扩展 point-rule.service.ts

 20. 生成 point-rules POST 接口

 21. 扩展 point-rules GET 接口

 22. 生成 point-record.service.ts

 23. 生成 child 提交事项接口

 24. 生成 points.service.ts

 25. 生成审核接口

 26. 生成手动加分接口

 27. 生成手动扣分接口

 28. 生成积分流水查询接口

 29. 生成 pet.service.ts 基础版

 30. 生成 child-init.service.ts

 31. 扩展 pet.service.ts：feedPet

 32. 扩展 pet.service.ts：waterPet

 33. 扩展 pet.service.ts：cleanPet

 34. 扩展 pet.service.ts：playWithPet

 35. 生成 pet-decay.service.ts

 36. 生成 revivePet 接口

 37. 生成 pet-evolution.service.ts

 38. 生成家长端规则列表页

 39. 生成家长端规则表单组件

 40. 生成家长端待审核页

 41. 生成家长端手动加分页

 42. 生成孩子首页

 43. 生成孩子任务页

 44. 生成宠物卡片组件

 45. 生成宠物交互按钮组件

 46. 生成孩子宠物页

 47. 生成 points.service 测试

 48. 生成 pet-decay.service 测试

 49. 生成部署文档

4. 项目初始化
Prompt 01：设计目录结构
text
【本次任务】
请只做一个小任务：为当前项目设计目录结构。

要求：
1. 只输出目录树。
2. 只说明以下目录职责：app、components、server、prisma、lib、types、docs。
3. 不写任何业务代码。
4. 不扩展到页面、数据库、接口实现。
5. 保持简洁。
Prompt 02：生成 package.json
text
【本次任务】
现在只输出一个文件：package.json

要求：
1. 技术栈按 Next.js + TypeScript + Prisma + PostgreSQL 来准备。
2. scripts 至少包含 dev、build、start、lint、prisma:generate、prisma:migrate、prisma:seed。
3. 依赖尽量精简。
4. 不输出其他文件。
Prompt 03：生成 docker-compose.yml
text
【本次任务】
现在只输出一个文件：docker-compose.yml

要求：
1. 只包含 app 和 postgres 两个服务。
2. postgres 数据要持久化。
3. 使用 .env 中的环境变量。
4. 适合本地开发和后续 NAS 部署。
5. 不输出其他文件。
Prompt 04：生成 Dockerfile
text
【本次任务】
现在只输出一个文件：Dockerfile

要求：
1. 用于 Next.js 项目开发环境。
2. 兼容 npm。
3. 结构尽量简单。
4. 不输出其他文件。
Prompt 05：生成 .env.example
text
【本次任务】
现在只输出一个文件：.env.example

要求：
1. 包含 DATABASE_URL。
2. 包含认证相关基础变量。
3. 包含 app 基础变量。
4. 变量命名清晰。
5. 不输出其他文件。
5. Prisma Schema
Prompt 06：schema 基础头部
text
【本次任务】
现在只输出一个文件：prisma/schema.prisma

要求：
1. 只包含 generator 和 datasource。
2. 使用 PostgreSQL。
3. 不添加任何 model。
4. 输出完整文件内容。
Prompt 07：添加 Family / User / Role
text
【本次任务】
现在只修改 prisma/schema.prisma

要求：
1. 只新增 Family、User、Role。
2. 如果需要，增加最少 enum。
3. 不新增 PointRule、PointRecord、PointTransaction、Pet。
4. 输出 schema.prisma 的完整新版本。
5. 不输出其他文件。
Prompt 08：添加 PointRule / PointRuleTarget
text
【本次任务】
现在只修改 prisma/schema.prisma

要求：
1. 只新增 PointRule、PointRuleTarget。
2. 增加与规则相关的必要 enum，例如 points type、frequency。
3. 不新增 PointRecord、PointAccount、PointTransaction、Pet。
4. 输出 schema.prisma 的完整新版本。
5. 不输出其他文件。
Prompt 09：添加 PointRecord / PointAccount / PointTransaction
text
【本次任务】
现在只修改 prisma/schema.prisma

要求：
1. 只新增 PointRecord、PointAccount、PointTransaction。
2. 增加与记录和流水相关的必要 enum。
3. 不新增 Pet、PetLog。
4. 输出 schema.prisma 的完整新版本。
5. 不输出其他文件。
Prompt 10：添加 Pet / PetLog
text
【本次任务】
现在只修改 prisma/schema.prisma

要求：
1. 只新增 Pet、PetLog。
2. 增加宠物状态相关 enum。
3. 不修改前面已有模型命名风格。
4. 输出 schema.prisma 的完整新版本。
5. 不输出其他文件。
Prompt 11：生成 prisma/seed.ts
text
【本次任务】
现在只输出一个文件：prisma/seed.ts

要求：
1. 创建一个默认家庭。
2. 创建 1 个家长用户。
3. 创建 2 个孩子用户。
4. 给每个孩子创建 pointAccount。
5. 给每个孩子创建默认 pet。
6. 创建几条默认 pointRules，例如刷牙、整理玩具、阅读 20 分钟。
7. 不输出其他文件。
8. 代码要尽量幂等。
6. 认证与权限
Prompt 12：生成 types/auth.ts
text
【本次任务】
现在只输出一个文件：types/auth.ts

要求：
1. 定义认证相关类型。
2. 至少包含 SessionUser、AuthRole、LoginResult。
3. 不输出其他文件。
Prompt 13：生成 lib/auth.ts
text
【本次任务】
现在只输出一个文件：lib/auth.ts

要求：
1. 提供基础认证辅助函数。
2. 包含生成和解析 session/token 的最小实现。
3. 与 types/auth.ts 风格一致。
4. 不输出 route、不输出页面。



Prompt 14：生成 parent 登录接口
text
【本次任务】
现在只输出一个文件：app/api/auth/parent-login/route.ts

要求：
1. 只实现 parent 登录。
2. 校验用户名和密码。
3. 返回统一的登录结果结构。
4. 不实现 child 登录。
5. 不输出其他文件。
Prompt 15：生成 child PIN 登录接口
text
【本次任务】
现在只输出一个文件：app/api/auth/child-login/route.ts

要求：
1. 只实现 child 的 PIN 登录。
2. 登录成功后返回统一用户信息。
3. 不实现 parent 登录。
4. 不输出其他文件。
Prompt 16：生成当前用户接口
text
【本次任务】
现在只输出一个文件：app/api/auth/me/route.ts

要求：
1. 返回当前登录用户信息。
2. 信息至少包含 id、name、role、familyId。
3. 如果未登录，返回明确错误。
4. 不输出其他文件。

Prompt 17：生成权限校验工具
text
【本次任务】
现在只输出一个文件：server/auth/guards.ts

要求：
1. 实现 requireParent。
2. 实现 requireChild。
3. 实现 requireSameFamily。
4. 保持可复用。
5. 不输出其他文件。
7. 积分规则模块
Prompt 18
：生成 point-rule.service.ts 基础版
text
【本次任务】
现在只输出一个文件：server/services/point-rule.service.ts

要求：
1. 只实现 createPointRule。
2. 只实现 listPointRules。
3. 使用 Prisma。
4. 包含基础参数校验和错误处理。
5. 不实现 update、duplicate、toggleEnabled。
6. 不输出 route 或页面。
7. 如果内容过长，请拆 Part 1 / Part 2。
Prompt 19：扩展 point-rule.service.ts
text

【本次任务】


现在只修改一个文件：server/services/point-rule.service.ts


要求：
1. 在已有基础上补充 updatePointRule。
2. 补充 togglePointRuleEnabled。
3. 补充 duplicatePointRule。
4. 输出这个文件的完整新版本。
5. 不输出其他文件。
Prompt 20：生成 point-rules POST 接口
text
【本次任务】
现在只输出一个文件：app/api/point-rules/route.ts

要求：
1. 只实现 POST。
2. 只允许 parent 调用。
3. 调用 createPointRule。
4. 返回统一响应结构。
5. 不实现 GET。
6. 不输出其他文件。
Prompt 21：扩展 point-rules GET 接口
text
【本次任务】
现在只修改一个文件：app/api/point-rules/route.ts

要求：
1. 在已有基础上补充 GET。
2. 支持 category、enabled、childId、page、pageSize 查询。
3. 调用 listPointRules。
4. 输出这个文件的完整新版本。
5. 不输出其他文件。
8. 事项提交与审核
Prompt 22：生成 point-record.service.ts
text
【本次任务】
现在只输出一个文件：server/services/point-record.service.ts

要求：
1. 只实现 submitPointRecord。
2. 检查规则是否启用。
3. 检查周期次数限制。
4. 检查是否重复提交。
5. 支持 needApproval 决定状态。
6. 不实现审核逻辑。
7. 不输出其他文件。
Prompt 23：生成 child 提交事项接口
text
【本次任务】
现在只输出一个文件：app/api/point-records/route.ts

要求：
1. 只实现 POST。
2. 只允许 child 调用。
3. 调用 submitPointRecord。
4. 返回统一响应结构。
5. 不实现 GET、审核接口。
6. 不输出其他文件。
9. 积分账户与流水
Prompt 24：生成 points.service.ts
text
【本次任务】
现在只输出一个文件：server/services/points.service.ts

要求：
1. 只实现 earnPoints。
2. 只实现 spendPoints。
3. 必须使用数据库事务。
4. 写入 pointAccount 和 pointTransaction。
5. 包含基础错误处理。
6. 不输出 route、页面或测试。
7. 如果内容过长，请拆 Part 1 / Part 2。
Prompt 25：生成审核接口
text
【本次任务】
现在只输出一个文件：app/api/point-records/[id]/review/route.ts

要求：
1. 只实现 POST。
2. 只允许 parent 调用。
3. 支持 approve / reject。
4. reject 必须填写 reason。
5. approve 时调用 points.service 的 earnPoints。
6. 不输出其他文件。
Prompt 26：生成手动加分接口
text
【本次任务】
现在只输出一个文件：app/api/points/manual-add/route.ts

要求：
1. 只允许 parent。
2. 输入 childId、amount、reason。
3. 调用 earnPoints。
4. 返回更新后的余额和本次流水。
5. 不输出其他文件。
Prompt 27：生成手动扣分接口
text
【本次任务】
现在只输出一个文件：app/api/points/manual-deduct/route.ts

要求：
1. 只允许 parent。
2. 输入 childId、amount、reason。
3. 调用 spendPoints。
4. 检查余额不足时返回明确错误。
5. 不输出其他文件。
Prompt 28：生成积分流水查询接口
text
【本次任务】
现在只输出一个文件：app/api/points/transactions/route.ts

要求：
1. parent 可以查家庭内任意孩子。
2. child 只能查自己。
3. 支持按 type、sourceType、时间范围筛选。
4. 支持分页。
5. 不输出其他文件。
10. 宠物模块
Prompt 29：生成 pet.service.ts 基础版
text
【本次任务】
现在只输出一个文件：server/services/pet.service.ts

要求：
1. 只实现 getPetByChildId。
2. 只实现 addPetLog。
3. 只实现 resetPet。
4. 所有状态值限制在 0 到 100 的逻辑可先预留工具函数。
5. 不实现 feedPet、waterPet、cleanPet、playWithPet、decay、evolution。
6. 不输出其他文件。
Prompt 30：生成 child-init.service.ts
text
【本次任务】
现在只输出一个文件：server/services/child-init.service.ts

要求：
1. 提供 ensureChildInitialResources。
2. 如果 child 没有 pointAccount，则创建。
3. 如果 child 没有 pet，则创建默认 pet。
4. 保证幂等。
5. 不输出其他文件。
Prompt 31：扩展 pet.service.ts - feedPet
text
【本次任务】
现在只修改一个文件：server/services/pet.service.ts

要求：
1. 在已有基础上只补充 feedPet。
2. feedPet 要调用 spendPoints。
3. 要写 petLog。
4. 状态值不能超过 100。
5. 如果宠物已死亡，默认不允许喂食。
6. 输出这个文件的完整新版本。
7. 不输出其他文件。
Prompt 32：扩展 pet.service.ts - waterPet
text
【本次任务】
现在只修改一个文件：server/services/pet.service.ts

要求：
1. 在已有基础上只补充 waterPet。
2. 调用 spendPoints。
3. 写 petLog。
4. 状态值不能超过 100。
5. 输出这个文件的完整新版本。
6. 不输出其他文件。
Prompt 33：扩展 pet.service.ts - cleanPet
text
【本次任务】
现在只修改一个文件：server/services/pet.service.ts

要求：
1. 在已有基础上只补充 cleanPet。
2. 调用 spendPoints。
3. 写 petLog。
4. 状态值不能超过 100。
5. 输出这个文件的完整新版本。
6. 不输出其他文件。
Prompt 34：扩展 pet.service.ts - playWithPet
text
【本次任务】
现在只修改一个文件：server/services/pet.service.ts

要求：
1. 在已有基础上只补充 playWithPet。
2. 恢复 mood，可增加少量 exp。
3. 需要写 petLog。
4. 输出这个文件的完整新版本。
5. 不输出其他文件。
Prompt 35：生成 pet-decay.service.ts
text
【本次任务】
现在只输出一个文件：server/services/pet-decay.service.ts

要求：
1. 实现 applyPetDecay。
2. 根据 lastDecayAt 到当前时间计算 hunger、thirst、cleanliness、mood 的衰减。
3. 当 hunger 或 thirst 过低时，health 开始下降。
4. health 为 0 时，status 变为 dead。
5. 逻辑可配置。
6. 不输出其他文件。
7. 如果内容过长，请拆 Part 1 / Part 2。
Prompt 36：生成 revivePet 接口
text
【本次任务】
现在只输出一个文件：app/api/pets/[childId]/revive/route.ts

要求：
1. 只允许 parent。
2. 复活 dead 状态宠物。
3. 恢复部分 health、hunger、thirst。
4. 写 petLog。
5. 不输出其他文件。
Prompt 37：生成 pet-evolution.service.ts
text
【本次任务】
现在只输出一个文件：server/services/pet-evolution.service.ts

要求：
1. 实现 checkPetEvolution。
2. 阶段至少有 baby、growth、final。
3. 根据 level、exp、存活天数、累计照顾次数中的简化条件触发。
4. 进化成功写 petLog。
5. 不输出其他文件。
11. 家长端页面
Prompt 38：生成规则列表页
text
【本次任务】
现在只输出一个文件：app/parent/point-rules/page.tsx

要求：
1. 只做规则列表页。
2. 列表展示 name、category、points、enabled。
3. 不做新增弹窗。
4. 不做编辑弹窗。
5. 文案中文。
6. 不输出其他文件。
Prompt 39：生成规则表单组件
text
【本次任务】
现在只输出一个文件：components/parent/point-rule-form.tsx

要求：
1. 只做表单组件。
2. 支持新增和编辑模式。
3. 字段与 PointRule 模型一致。
4. 不做列表页。
5. 中文文案。
6. 不输出其他文件。

【实际完成】
✅ 组件路径：components/parent/point-rule-form.tsx
✅ 支持字段：name, description, category, pointsType, points, pointsMin, pointsMax, needApproval, frequency, maxTimes, enabled
✅ 积分类型：fixed(固定) / range(浮动)
✅ 频率选项：daily, weekly, monthly, once, unlimited
✅ 表单验证：名称必填、积分值校验
✅ 构建状态：通过
Prompt 40：更新规则列表页集成表单
text
【本次任务】
更新文件：app/parent/point-rules/page.tsx

要求：
1. 集成 Prompt 39 的表单组件。
2. 新增规则按钮打开表单弹窗。
3. 编辑按钮打开表单弹窗。
4. 表单提交后刷新列表。
5. 不输出其他文件。

【实际完成】
✅ 页面路径：app/parent/point-rules/page.tsx
✅ 新增功能：创建/编辑/删除/复制/切换状态
✅ 表单弹窗：集成 PointRuleForm 组件
✅ 状态管理：showForm, editingRule, editingRuleDetail
✅ API 集成：POST/PUT/DELETE/PATCH
✅ 构建状态：通过
✅ 页面大小：19.7 kB
Prompt 41：目标孩子选择组件 + API
text
【本次任务】
1. 创建组件：components/parent/target-children-select.tsx
2. 更新表单：集成目标孩子选择
3. 创建 API：/api/family/children

要求：
1. 支持多选孩子。
2. 全选/取消全选功能。
3. 表单验证至少选一个。
4. 不输出其他文件。

【实际完成】
✅ 组件路径：components/parent/target-children-select.tsx
✅ API 路径：/api/family/children (GET)
✅ 表单更新：point-rule-form.tsx 添加 targetChildIds
✅ 验证规则：至少选择一个孩子
✅ 视觉反馈：选中状态高亮
✅ 构建状态：通过
12. 孩子端页面
Prompt 42：规则详情 API + 编辑加载目标孩子
text
【本次任务】
创建 API：/api/point-rules/[id]/route.ts

要求：
1. GET：获取规则详情（含目标孩子）。
2. PUT：更新规则。
3. DELETE：删除规则。
4. 更新页面：编辑时加载完整详情。
5. 不输出其他文件。

【实际完成】
✅ API 路径：/api/point-rules/[id]
✅ GET：返回规则详情 + targets
✅ PUT：更新规则 + 目标孩子
✅ DELETE：删除规则
✅ 页面更新：handleEdit 加载详情
✅ 权限检查：只能操作自己家庭的规则
✅ 构建状态：通过
Prompt 43：生成孩子任务页
text
【本次任务】
现在只输出一个文件：app/child/tasks/page.tsx

要求：
1. 列出可提交的事项。
2. 展示每项积分。
3. 支持“我完成了”。
4. 需要审核时有提示。
5. 不输出其他文件。
Prompt 44：生成宠物卡片组件
text
【本次任务】
现在只输出一个文件：components/child/pet-card.tsx

要求：
1. 展示宠物名称、等级、阶段。
2. 展示 hunger、thirst、cleanliness、mood、health。
3. 不做交互按钮。
4. 中文文案。
5. 不输出其他文件。

【实际完成】
✅ 组件路径：components/child/pet-card.tsx
✅ 显示字段：名称、等级(Lv.)、阶段(蛋/幼年期/成长期/完全体)
✅ 状态条：饥饿度、口渴度、清洁度、心情值、健康值
✅ 进度条颜色：绿色(≥70%) / 黄色(≥40%) / 红色(<40%)
✅ 特殊状态：宠物死亡时显示 💀
✅ 表情映射：🥚/🐣/🐥/🐔
✅ 心情表情：😄/🙂/😐/😟/😢
✅ 健康状态：健康/一般/虚弱/病危
✅ 构建状态：通过

Prompt 45：生成宠物交互按钮组件
text
【本次任务】
现在只输出一个文件：components/child/pet-actions.tsx

要求：
1. 包含喂食、喂水、洗澡、陪玩四个按钮。
2. 通过 props 接收点击事件。
3. 不包含页面容器逻辑。
4. 中文文案。
5. 不输出其他文件。

【实际完成】
✅ 组件路径：components/child/pet-actions.tsx
✅ 按钮布局：2x2 网格
✅ 按钮功能：
   - 喂食 🍖 (橙色)：消耗积分喂养
   - 喂水 💧 (蓝色)：补充水分
   - 洗澡 🛁 (青色)：提升清洁度
   - 陪玩 🎾 (粉色)：提升心情
✅ Props：onFeed, onWater, onClean, onPlay, disabled
✅ 交互效果：active:scale-95, hover:shadow-lg
✅ 构建状态：通过

Prompt 46：生成孩子宠物页
text
【本次任务】
现在只输出一个文件：app/child/pet/page.tsx

要求：
1. 使用 pet-card 和 pet-actions。
2. 显示宠物详情。
3. 点击交互后刷新状态和积分。
4. 如果宠物危险或死亡，显示明显提示。
5. 不输出其他文件。

【实际完成】
✅ 页面路径：app/child/pet/page.tsx
✅ 组件集成：PetCard + PetActions
✅ 数据获取：/api/auth/me, /api/pets/{id}, /api/points/accounts/{id}
✅ 交互功能：喂食/喂水/洗澡/陪玩
✅ API 调用：/api/pets/{id}/feed, /water, /clean, /play
✅ 状态刷新：操作后自动刷新宠物和积分
✅ 消息提示：操作结果反馈
✅ 加载状态：actionLoading 禁用按钮
✅ 死亡处理：宠物死亡时禁用交互
✅ 小贴士区域：照顾宠物的建议
✅ 构建状态：通过
✅ 页面大小：2.78 kB

13. 测试与部署
Prompt 47：生成 points.service 测试
text
【本次任务】
现在只输出一个文件：server/services/__tests__/points.service.test.ts

要求：
1. 重点测试 earnPoints 和 spendPoints。
2. 测试余额更新。
3. 测试流水写入。
4. 测试余额不足报错。
5. 不输出其他文件。

【实际完成】
✅ 测试文件：server/services/__tests__/points.service.test.ts
✅ 测试组：earnPoints (4个测试用例)
   - 成功赚取积分并更新余额 (100→150)
   - 为新用户创建账户并赚取积分
   - 拒绝非法积分数量 (0和负数)
   - 正确写入流水记录
✅ 测试组：spendPoints (4个测试用例)
   - 成功消费积分并更新余额 (100→70)
   - 余额不足时报错 (余额20,消费50)
   - 账户不存在时报错
   - 正确写入消费流水 (负数值)
✅ 测试组：getPointAccount (2个测试用例)
   - 返回账户和最近流水
   - 账户不存在返回null
✅ Mock：Prisma 客户端
✅ 构建状态：通过

Prompt 48：生成 pet-decay.service 测试
text
【本次任务】
现在只输出一个文件：server/services/__tests__/pet-decay.service.test.ts

要求：
1. 测试离线衰减。
2. 测试 hunger / thirst 低导致 health 下降。
3. 测试 health 为 0 进入 dead。
4. 不输出其他文件。

【实际完成】
✅ 测试文件：server/services/__tests__/pet-decay.service.test.ts
✅ 测试组：applyPetDecay (7个测试用例)
   - 应用离线衰减：饥饿-10,口渴-15,清洁-5,心情-5 (5小时)
   - hunger/thirst过低导致health下降：低于30阈值时health-50
   - health为0时宠物死亡：状态变为dead，写入死亡日志
   - 不到1小时不应用衰减：时间间隔保护
   - 跳过已死亡宠物：死亡宠物不处理
   - 宠物不存在时报错：异常处理
   - 状态值不低于0：边界保护
✅ 测试组：applyDecayToAllPets (2个测试用例)
   - 对所有存活宠物应用衰减：批量处理
   - 处理单个宠物失败：错误隔离
✅ 测试组：Config (2个测试用例)
   - 获取衰减配置：验证默认值
   - 更新衰减配置：运行时调整
✅ 衰减配置：hunger:2, thirst:3, cleanliness:1, mood:1, health.threshold:30, health.decayRate:5
✅ 构建状态：通过

Prompt 49：生成部署文档
text
【本次任务】
现在只输出一个文件：docs/deploy.md

要求：
1. 面向 Docker Compose + NAS 部署。
2. 说明环境变量。
3. 说明启动步骤。
4. 说明更新步骤。
5. 说明 PostgreSQL 持久化和备份建议。
6. 不输出其他文件。

【实际完成】
✅ 文档路径：docs/deploy.md
✅ 部署目标：Docker Compose + NAS (Synology DSM / QNAP QTS)
✅ 环境变量：DATABASE_URL, POSTGRES_PASSWORD, NEXTAUTH_SECRET 等
✅ 启动步骤：6步完整流程（克隆→配置→启动→迁移→验证→访问）
✅ 更新步骤：标准更新 + 零停机更新
✅ 数据持久化：Docker 卷 + NAS 路径映射
✅ 备份方案：
   - 自动备份脚本 (backup.sh)
   - 定时任务配置 (DSM/QTS/Linux cron)
   - 30天保留策略
   - 恢复命令
✅ 故障排查：
   - 数据库连接失败
   - 应用启动失败
   - 迁移失败
   - 性能问题
✅ 安全建议：密码、HTTPS、防火墙、备份验证
✅ 构建状态：通过

14. 截断时专用 Prompt
续写 Prompt
text
你刚才输出的文件被截断了。
请不要重写前面的内容。
从下面这行开始继续输出，直到文件结束：

[把最后一行或最后几行粘贴进来]
完整性检查 Prompt
text
请检查刚才我们拼接完成的文件是否完整。

只回答：
1. 是否缺少 import
2. 是否缺少括号闭合
3. 是否缺少函数结尾
4. 是否缺少 export
5. 是否存在明显 TypeScript / TSX 语法不完整

如果缺失，请只输出缺失部分，不要重写整个文件。
强制拆分 Prompt
text
如果这个文件内容过长，请主动拆成 Part 1 / Part 2。

要求：
1. 每一部分都必须是连续代码。
2. 不要重复前文。
3. 输出完 Part 1 后先停下，等我回复“继续”。
15. 最推荐起步顺序
最先跑这几步：


Prompt 02：package.json

Prompt 03：docker-compose.yml

Prompt 05：.env.example

Prompt 06：schema 基础头部

Prompt 07：Family / User / Role

Prompt 08：PointRule / PointRuleTarget

Prompt 11：prisma/seed.ts

16. Git 提交建议
每做完 1～2 个 Prompt，建议提交一次：

feat: init project base

feat: add docker and env setup

feat: add prisma core models

feat: add auth basics

feat: add point rule service

feat: add point review flow

feat: add points account service

feat: add pet services

feat: add parent ui

feat: add child ui

test: add points and pet decay tests

docs: add deploy guide

text

你现在可以直接：
1. 新建一个文件 `continue_tasks_kimi.md`。
2. 把上面整段复制进去保存。
3. 从 “Prompt 02：package.json” 开始跑。

我建议你第一轮不要从 Prompt 01 开始，因为 Prompt 01 只是目录设计，实际推进项目更快的是直接先把 `package.json`、`docker-compose.yml`、`.env.example` 和 `schema.prisma` 跑起来。

如果你愿意，我下一条可以继续直接给你：
- **`requirements.md` 成品**
- **`tech_stack.md` 成品**
- **`README.md` 初版成品**

这样你项目根目录的文档就齐了。

---

## 17. 已完成任务记录

> 每次完成并测试成功后，在此更新记录。

### 2026-03-27 完成

| Prompt | 文件 | 状态 | 测试 |
|--------|------|------|------|
| 01 | 目录结构设计 | ✅ | - |
| 02 | package.json | ✅ | ✅ npm install 成功 |
| 03 | docker-compose.yml | ✅ | ✅ docker-compose config 成功 |
| 04 | Dockerfile | ✅ | - |
| 05 | .env.example | ✅ | ✅ 已复制为 .env |
| 06 | prisma/schema.prisma 基础头部 | ✅ | ✅ npx prisma validate 通过 |
| 07 | Family / User / Role | ✅ | ✅ 迁移成功 |
| 08 | PointRule / PointRuleTarget | ✅ | ✅ 迁移成功 |
| 09 | PointRecord / PointAccount / PointTransaction | ✅ | ✅ 迁移成功 |
| 10 | Pet / PetLog | ✅ | ✅ 迁移成功 |
| 11 | prisma/seed.ts | ✅ | ✅ 种子数据初始化成功 |
| 12 | types/auth.ts | ✅ | ✅ TypeScript 编译通过 |
| 13 | lib/auth.ts | ✅ | ✅ jose 安装成功 |
| 14 | app/api/auth/parent-login/route.ts | ✅ | ✅ 登录测试成功 |
| 15 | app/api/auth/child-login/route.ts | ✅ | ✅ 登录测试成功 |

### 测试数据

```
家长登录: parent / parent123
孩子登录: child1 / PIN 1234
         child2 / PIN 5678
```

### 数据库状态

- PostgreSQL 运行在 Docker 中
- 所有表已创建
- 种子数据已初始化

---

## 18. 下一步任务

**Prompt 16**：生成当前用户接口 `app/api/auth/me/route.ts`

| 16 | app/api/auth/me/route.ts | ✅ | ✅ 接口测试成功 |

| 17 | server/auth/guards.ts | ✅ | ✅ TypeScript 编译通过 |

| 18 | server/services/point-rule.service.ts | ✅ | ✅ createPointRule 和 listPointRules 测试成功 |

| 19 | server/services/point-rule.service.ts 扩展 | ✅ | ✅ updatePointRule, togglePointRuleEnabled, duplicatePointRule 测试成功 |

| 20 | app/api/point-rules/route.ts (POST) | ✅ | ✅ 家长可创建，孩子被拒绝(403) |

| 21 | app/api/point-rules/route.ts (GET/POST) | ✅ | ✅ GET查询支持所有参数，孩子可查看适用规则 |

| 22 | server/services/point-record.service.ts | ✅ | ✅ submitPointRecord 测试成功，重复提交被拒绝 |

| 23 | app/api/point-records/route.ts (POST) | ✅ | ✅ 孩子可提交，家长被拒绝(403) |

| 24 | server/services/points.service.ts | ✅ | ✅ earnPoints/spendPoints 测试成功，余额不足报错 |

| 25 | app/api/point-records/[id]/review/route.ts | ✅ | ✅ 家长可审核，孩子被拒绝(403)，支持approve/reject |

| 26 | app/api/points/manual-add/route.ts | ✅ | ✅ 家长可手动加分，孩子被拒绝(403)，返回余额和流水 |

| 27 | app/api/points/manual-deduct/route.ts | ✅ | ✅ 家长可手动扣分，余额不足报错，孩子被拒绝(403) |

| 28 | app/api/points/transactions/route.ts | ✅ | ✅ 家长可查任意孩子，孩子只能查自己，支持筛选和分页 |

| 29 | server/services/pet.service.ts 基础版 | ✅ | ✅ getPetByChildId, addPetLog, resetPet 测试成功 |

| 30 | server/services/child-init.service.ts | ✅ | ✅ ensureChildInitialResources 幂等，批量初始化成功 |

| 31 | server/services/pet.service.ts - feedPet | ✅ | ✅ 喂食消耗积分，恢复饥饿值，状态值不超过100 |

| 32 | server/services/pet.service.ts - waterPet | ✅ | ✅ 喂水消耗积分，恢复口渴值，状态值不超过100 |

| 33 | server/services/pet.service.ts - cleanPet | ✅ | ✅ 清洁消耗积分，恢复清洁值，状态值不超过100 |

| 34 | server/services/pet.service.ts - playWithPet | ✅ | ✅ 陪玩恢复心情值，获得经验，消耗较少积分 |

| 35 | server/services/pet-decay.service.ts | ✅ | ✅ applyPetDecay 测试成功，配置可调整 |

| 36 | app/api/pets/[childId]/revive/route.ts | ✅ | ✅ 家长可复活宠物，孩子被拒绝，恢复部分状态 |

| 37 | server/services/pet-evolution.service.ts | ✅ | ✅ checkPetEvolution 测试成功，4阶段进化系统完成 |

| 38 | app/parent/point-rules/page.tsx | ✅ | ✅ 规则列表页，展示name/category/points/enabled |
