# Patrol 项目说明文档

## 1. 项目定位

本仓库是一个前后端分离的巡检平台，核心场景包括：

- 空巡：围绕 DJI 机场/无人机执行航线任务、点位任务、直播、轨迹、成果回传。
- 地巡：围绕人员、线路、巡检点、计划、轨迹、打卡完成率进行地面巡检管理。
- 成果闭环：围绕图片/视频回传、算法识别、人工复核、风险确认、施工信息、消息通知形成闭环。
- 后台管理：基于若依体系提供用户、角色、菜单、字典、监控、代码生成等通用管理能力。

从代码组织上看，`patrol` 是后端多模块 Maven 工程，`patrol-web` 是 Vue 3 + Vite 前端工程。

---

## 2. 工作区总览

### 2.1 根目录

| 路径 | 用途 |
| --- | --- |
| `PROJECT_DOCUMENTATION.md` | 当前项目说明文档。 |
| `patrol/` | 后端源码，Spring Boot 多模块工程。 |
| `patrol-web/` | 前端源码，Vue 3 + Vite 工程。 |
| `patrol/sql/` | 数据初始化脚本和视图脚本。注意：从当前代码阅读结果看，这里的 SQL 主要是基础脚本，不足以完整还原所有最新业务表。业务字段应以 `domain + mapper.xml` 为准。 |

### 2.2 前端根目录

| 路径 | 用途 |
| --- | --- |
| `patrol-web/src/` | 实际运行的前端主代码。 |
| `patrol-web/DJI/` | DJI Cloud API Web 相关类型、枚举、示例代码。 |
| `patrol-web/WebGIS/` | GIS 独立演示与资源目录，包含 Mars3D 组件、模型、图片。 |
| `patrol-web/MD/` | 项目过程文档、开发说明、阶段性记录。 |
| `patrol-web/public/` | 公共静态资源。 |
| `patrol-web/vite/` | Vite 插件配置。 |
| `patrol-web/.env.*` | 前端环境变量。开发环境通过 `vite.config.js` 代理到后端。 |

### 2.3 后端根目录

| 路径 | 用途 |
| --- | --- |
| `patrol/pom.xml` | 聚合父工程，声明模块、统一依赖版本。 |
| `patrol/patrol-admin/` | 启动模块，聚合全部业务模块并暴露控制器。 |
| `patrol/patrol-common/` | 通用领域对象、注解、工具类、文件服务、MQ、Redis、常量。 |
| `patrol/patrol-framework/` | Spring Security、JWT、AOP、MyBatis、Druid、Redis 等框架层。 |
| `patrol/patrol-patrolair/` | 空巡核心业务。 |
| `patrol/patrol-patrolbase/` | 基础 GIS、成果文件、风险审核、施工信息、消息中心。 |
| `patrol/patrol-patrolland/` | 地巡核心业务。 |
| `patrol/patrol-dji/` | DJI 远程调用封装、直播控制、遥控接口。 |
| `patrol/patrol-dadao/` | 大道无人机平台接入模块。 |
| `patrol/patrol-ws/` | Netty WebSocket 服务。 |
| `patrol/patrol-task/` | XXL-JOB 示例任务。 |
| `patrol/patrol-generator/` | 若依代码生成器模块。 |
| `patrol/sql/` | SQL 脚本。 |

---

## 3. 技术栈与运行依赖

### 3.1 后端技术栈

- Java 17
- Spring Boot 2.5.15
- Spring Security + JWT
- MyBatis / MyBatis Plus / PageHelper
- Druid 连接池
- PostgreSQL
- Redis
- RabbitMQ
- MinIO
- XXL-JOB
- Netty WebSocket
- MQTT / DJI Cloud API / 大道平台 API

### 3.2 前端技术栈

- Vue 3
- Vite 6
- Pinia
- Vue Router
- Element Plus
- Mars3D / Cesium / Vue-Cesium
- ECharts
- MQTT / WebSocket

### 3.3 关键端口与入口

从配置文件可以看出：

- 后端 HTTP 端口默认是 `19090`。
- 后端 WebSocket 服务端口默认是 `19888`，路径是 `/im`。
- 前端本地开发服务端口是 `9201`。
- 前端通过 `vite.config.js` 将 `/dev-api` 代理到后端地址。

---

## 4. 后端总体架构

### 4.1 模块关系

可以把后端理解为五层：

1. 启动层：`patrol-admin`
2. 框架层：`patrol-framework`
3. 通用能力层：`patrol-common`
4. 业务层：`patrol-patrolair`、`patrol-patrolbase`、`patrol-patrolland`
5. 集成层：`patrol-dji`、`patrol-dadao`、`patrol-ws`

概念关系如下：

```text
patrol-admin
  ├─ patrol-framework
  │   └─ patrol-common
  ├─ patrol-patrolbase
  ├─ patrol-patrolair
  ├─ patrol-patrolland
  ├─ patrol-dji
  ├─ patrol-dadao
  ├─ patrol-ws
  ├─ patrol-task
  └─ patrol-generator
```

### 4.2 请求路径分层

从控制器命名和路由来看，接口大致分成这些域：

| 路由前缀 | 含义 |
| --- | --- |
| `/system/*` | 若依后台管理能力：用户、角色、菜单、字典、配置等。 |
| `/monitor/*` | 登录日志、在线用户、缓存、服务器状态等运维接口。 |
| `/common/*` | 文件上传下载、通用资源。 |
| `/patrolair/*` | 空巡业务。 |
| `/wayline/*` | 空巡航线文件管理。 |
| `/dji/remote/*` | DJI 遥控、直播、相机控制。 |
| `/business/*` | 空巡运行态聚合查询，如设备 OSD、实时任务、轨迹、直播。 |
| `/patrolbase/*` | 基础 GIS、施工信息、基础资料。 |
| `/base/mission-file/*` | 任务成果文件与风险复核。 |
| `/usermsg/*` | 消息中心。 |
| `/patrolland/*` | 地巡业务。 |

---

## 5. 公共基础设施说明

这一部分是后端业务开发必须先理解的“底座”。

### 5.1 登录认证与权限

相关核心文件：

- `patrol-framework/src/main/java/com/unibase/framework/config/SecurityConfig.java`
- `patrol-framework/src/main/java/com/unibase/framework/security/filter/JwtAuthenticationTokenFilter.java`
- `patrol-framework/src/main/java/com/unibase/framework/web/service/SysLoginService.java`
- `patrol-framework/src/main/java/com/unibase/framework/web/service/TokenService.java`
- `patrol-framework/src/main/java/com/unibase/framework/web/service/UserDetailsServiceImpl.java`

认证流程如下：

1. 前端调用 `/login`。
2. `SysLoginService` 先校验验证码、黑名单、用户名密码格式。
3. `AuthenticationManager` 调用 `UserDetailsServiceImpl` 加载用户和权限。
4. 认证成功后，`TokenService.createToken` 生成 JWT。
5. 登录用户信息 `LoginUser` 同时落入 Redis。
6. 后续请求经过 `JwtAuthenticationTokenFilter`，从请求头解析 token，反查 Redis 中的 `LoginUser` 并写入 Spring Security 上下文。

这里的关键点不是“只校验 JWT”，而是：

- JWT 里主要保存登录 token 标识；
- 真正完整的登录态和权限对象保存在 Redis；
- 令牌快过期时会自动刷新 Redis TTL。

### 5.2 文件与对象存储

核心文件：

- `patrol-common/src/main/java/com/unibase/common/service/impl/FileServiceImpl.java`

文件能力统一由 `FileService` 提供，底层用 MinIO：

- 普通文件上传：`uploadFile`
- 图片上传与缩略图：`uploadImage`
- 视频上传与封面图生成：`uploadVideo`
- 下载 OSS/MinIO 文件到本地临时目录：`downloadFile`
- 生成可访问 URL：`getUploadPath` / `getUploadPaths`

业务模块大量依赖这个服务：

- 空巡航线生成后上传 KMZ
- 地巡/管道 KML 下载与解析
- 回传图片下载到算法目录
- 施工/风险图片地址转换

### 5.3 Redis 使用方式

Redis 不是单纯做缓存，而是大量承载“运行时状态机”。

主要用途包括：

- 登录态缓存
- DJI 设备在线状态、OSD、State、直播能力
- 空巡任务分阶段状态缓存
- 空巡直播推流参数缓存
- 空巡轨迹心跳与轨迹段缓存
- 地巡执行任务待检点位缓存
- 地巡实时轨迹列表缓存
- 算法审核进度缓存

空巡任务 Redis key 规范集中在：

- `patrol-patrolair/src/main/java/com/unibase/patrolair/constant/Constants.java`

地巡任务 Redis key 规范集中在：

- `patrol-patrolland/src/main/java/com/unibase/patrolland/constant/Constant.java`

### 5.4 RabbitMQ 与 Topic 分发

核心文件：

- `patrol-patrolair/.../dji/dispatch/RabbitMqQueueBinding.java`
- `patrol-patrolair/.../dji/dispatch/RabbitMqMessageDispatcher.java`
- `patrol-patrolair/.../task/topic/TopicQueueHandle.java`

机制分两步：

1. `TopicQueueHandle.refreshQueueBindingJob` 定时计算当前需要监听的设备 SN，并动态维护 `trans.{deviceSn}.#` 路由绑定。
2. `RabbitMqMessageDispatcher` 从动态队列消费消息，按 `routingKey` 的业务码分发到不同 `TopicMessageHandler`。

这样设计的目的：

- 只绑定当前关心的设备主题；
- 同一业务码（如 `osd`、`events`）使用单线程执行器，保证顺序；
- 不同业务码之间可以并发。

### 5.5 WebSocket 实时推送

核心文件：

- `patrol-ws/src/main/java/com/unibase/ws/netty/ws/WebSocketServer.java`
- `patrol-ws/src/main/java/com/unibase/ws/netty/ChannelHandler.java`
- `patrol-ws/src/main/java/com/unibase/ws/netty/pusher/WsPusher.java`

WebSocket 作用：

- 浏览器连接到 `/im`
- 连接建立后，登录/心跳等命令通过 `WsCmdProcessor` 处理
- 业务服务在任何地方都可以通过 `WsPusher.pushToAll` 广播数据

被推送的数据包括：

- 空巡任务执行状态
- DJI OSD/State 数据
- 直播开始/停止
- 文件算法审核进度

### 5.6 定时任务

定时任务主要依赖 XXL-JOB：

- 空巡任务调度：`DjiFlightTask`
- DJI Topic 队列刷新：`TopicQueueHandle`
- 地巡执行与轨迹处理：`TrackTask`

当前仓库没有发现 `src/test` 目录，说明项目主要依赖运行环境验证和实际联调，而不是自动化测试。

---

## 6. 启动模块与后台管理

### 6.1 `patrol-admin`

核心文件：

- `patrol-admin/src/main/java/com/unibase/PatrolApplication.java`
- `patrol-admin/src/main/resources/application.yml`
- `patrol-admin/src/main/resources/application-druid.yml`

职责：

- 启动 Spring Boot
- 汇总所有模块 Bean
- 提供系统管理、监控、登录、公共文件接口

后台控制器基本沿用若依体系：

- `SysUserController`
- `SysRoleController`
- `SysMenuController`
- `SysDeptController`
- `SysDictTypeController`
- `SysDictDataController`
- `SysConfigController`
- `SysProfileController`
- `SysLoginController`
- `CacheController`
- `ServerController`
- `SysLogininforController`
- `SysOperlogController`

这部分更多是通用管理能力，不是本项目特有业务。

---

## 7. 空巡业务详解

空巡是后端最复杂的业务模块，状态流转最多，也最依赖外部系统。

### 7.1 主要目录

| 目录 | 作用 |
| --- | --- |
| `controller/` | 空巡计划、执行、设备、告警、业务聚合查询接口。 |
| `service/impl/` | 空巡业务核心实现。 |
| `dji/handler/` | RabbitMQ Topic 消息处理入口。 |
| `dji/service/` | 具体进度消息、直播能力、返航等二级处理器。 |
| `dji/wayline/` | 航线文件生成、解析、上传、远程同步。 |
| `task/` | XXL-JOB 调度任务。 |
| `report/` | 报表和统计接口。 |

### 7.2 核心实体

从代码关系看，空巡主表模型是：

| 实体 | 作用 |
| --- | --- |
| `AirPatrolDevice` | 设备主数据，包含机场、机巢子设备、无人机、遥控器等。 |
| `AirDroneGroup` | 无人机分组，计划执行时按组找设备。 |
| `AirWaylineFile` | 航线文件元数据，包含远端 `waylineId`、KMZ 文件、机型、返航高度等。 |
| `DroneMissionPlan` | 任务计划模板，定义任务类型、时间、负责人、航线、设备组、算法配置。 |
| `DroneMissionExecution` | 单次执行实例，是运行态主表。 |
| `DroneMissionPoints` | 点位任务的执行点序列。 |
| `DroneMissionLive` | 直播记录与录像回调信息。 |
| `AirDroneTrack` | 落盘后的飞行轨迹。 |

### 7.3 任务类型

定义在 `patrol-patrolair/.../constant/Constants.java`：

- `SCHEDULED_WAYLINE`：定时航线任务
- `IMMEDIATE_WAYLINE`：立即航线任务
- `IMMEDIATE_POINT`：立即点位任务

相应编码前缀：

- `SCH-WL-`
- `SCH-PT-`
- `IM-WL-`
- `IM-PT-`

### 7.4 设备管理逻辑

核心实现：

- `AirPatrolDeviceServiceImpl`
- `OnlineMessageHandler`
- `OfflineMessageHandler`
- `OsdMessageHandler`
- `StateMessageHandler`

业务逻辑：

1. 设备上线消息进入 `OnlineMessageHandler`。
2. 将 `DeviceDTO` 转成 `AirPatrolDevice`。
3. 如果消息中有父设备/子设备，一并维护设备树关系。
4. 设备主数据保存到数据库，同时写入 Redis 在线缓存。
5. OSD/State 消息继续更新 Redis 中的设备实时状态。
6. `TopicQueueHandle` 定时把机库实时经纬度回写数据库中的 `AirPatrolDevice`。

`AirPatrolDeviceServiceImpl.convertToVo` 会把机场和机巢子设备之间的父子关系补出来，同时补负责人信息和存储剩余容量。

### 7.5 航线管理逻辑

核心实现：

- `WaylineController`
- `WaylineFileServiceImpl`
- `WaylineRemoteServiceImpl`

航线生成流程：

1. 前端提交 `WaylineRequest`。
2. `WaylineFileServiceImpl.generateWaylineFile` 校验航线参数合法性。
3. 生成 `template.kml` 和 `waylines.wpml`。
4. 将二者打包为 KMZ。
5. KMZ 上传 MinIO。
6. 生成 `AirWaylineFile` 记录。
7. 通过 `WaylineRemoteServiceImpl.waylineCreate` 同步到 DJI 远端服务。

航线查看流程：

1. 从数据库查到 `AirWaylineFile`。
2. 从 MinIO 下载 KMZ 到临时目录。
3. 解压并解析 `template.kml`、`waylines.wpml`。
4. 还原成 `WaylineRequest` 返回前端。

### 7.6 计划与执行关系

核心实现：

- `DroneMissionPlanServiceImpl`
- `DroneMissionExecutionServiceImpl`

这里的设计是“计划”和“执行”分离：

- `DroneMissionPlan` 是模板
- `DroneMissionExecution` 是某一天或某一次真正执行的实例

`DroneMissionPlanServiceImpl.createDroneMissionExecution` 会基于计划生成执行单：

- 继承计划编码、类型、航线、时间、负责人
- 生成新的 `executeCode`
- 设置初始状态 `PENDING`

这样设计的好处：

- 可以保留计划不变
- 每次执行都有独立的轨迹、直播、风险结果、执行状态

### 7.7 定时航线任务链路

涉及文件：

- `DjiFlightTask`
- `DroneMissionPlanServiceImpl`
- `DjiFlightServiceImpl`
- `FlighttaskProgressHandler`
- `ServicesReplyMessageHandler`

完整链路：

1. `DjiFlightTask.djiScheduledTask` 周期执行。
2. `generateTimedJobExecute` 为当天有效计划生成执行实例。
3. `queryTimedJobList` 选出当前时间窗口内应该下发的执行实例。
4. `checkWaylineExist`
   - 检查本地航线记录是否存在
   - 检查 DJI 远端是否已有该航线
   - 检查 MinIO 中 KMZ 是否存在
5. `onlineDevices`
   - 查询当前设备在线情况
   - 过滤机型不匹配设备
   - 查询 OSD，校验电量和存储空间
   - 选出可用机场
6. `createJobParam`
   - 组装 DJI 定时任务参数
   - 填充返航高度、失控动作、电量阈值、存储阈值、日时间窗
7. `createJob`
   - 遍历可用机场，逐个尝试创建远端任务
   - 成功后记录绑定的机场和无人机
   - 推送 WebSocket
8. 执行后，DJI 的 `flighttask_progress` 消息进入 `FlighttaskProgressHandler`
   - 更新执行状态
   - 记录轨迹 `trackId`
   - 控制直播开始/停止
   - 成功/失败/取消时写入结束时间和失败原因

这条链路是典型的“前置校验 + 远程下发 + 异步回调驱动状态机”。

### 7.8 立即点位任务链路

涉及文件：

- `DroneMissionPlanServiceImpl.addMission`
- `DroneMissionPointsServiceImpl`
- `DjiFlightServiceImpl.startPointsJob`
- `TakeoffToPointProgressHandler`
- `FlyToPointProgressHandler`

完整链路：

1. 创建 `IMMEDIATE_POINT` 计划时，要求必须传入点位列表。
2. 创建执行记录 `DroneMissionExecution`。
3. `DroneMissionPointsServiceImpl.savePoints` 保存执行点列表，并校验：
   - 点位不能为空
   - 经度纬度范围合法
   - 高度范围合法
   - 高度必须是 `0.1` 的整数倍
   - `pointIndex` 连续
4. `startPointsJob`
   - 校验设备
   - 生成一键起飞参数 `RemoteTakeoffToPointParam`
   - 调 DJI 遥控接口起飞
5. DJI 回推 `takeoff_to_point_progress`
   - `TakeoffToPointProgressHandler` 更新执行状态
   - 第一个点完成后，将点位状态标记为完成
   - 如果还有剩余点位，继续触发 `startFlyto`
6. `FlyToPointProgressHandler`
   - 每到一个点就更新 `DroneMissionPoints.pointStatus`
   - 最后一个点完成后，更新执行结束状态

这条链路和航线任务不同，它不是远端定时作业，而是“起飞到首点 + 多次 flyto 串行执行”。

### 7.9 直播与轨迹

直播相关：

- `DjiRemoteController`
- `LiveStreamServiceImpl`
- `DjiFlightServiceImpl.missionLiveStart/missionLiveStop`
- `handleLiveCallBack`
- `DroneMissionLiveServiceImpl`

逻辑要点：

- 直播参数由 `LiveStreamServiceImpl.buildLiveStreamParam` 根据设备直播能力动态生成。
- 直播开始/停止通过 DJI 远程接口触发。
- 直播回调 `handleLiveCallBack` 会写入 `DroneMissionLive`，补齐发布时间、结束时间、录像地址等。
- `FlighttaskProgressHandler` 和点位进度 Handler 会在任务开始/结束时自动拉起或关闭直播。

轨迹相关：

- 运行中轨迹暂存在 Redis。
- `pointsTaskTrackRecord` 判断轨迹心跳是否超时，超时则把轨迹 JSON 落盘到 `AirDroneTrack`。
- `BusinessServiceImpl.getHistoryTrackByMission` 会优先查 Redis，Redis 没有再回落数据库。

### 7.10 运行态聚合接口

核心实现：

- `BusinessController`
- `BusinessServiceImpl`

主要用于大屏和运行态界面：

- 查询设备 OSD
- 查询设备当前关联任务
- 查询正在执行的任务
- 查询历史轨迹
- 查询任务航线或点位
- 查询直播记录与当前推流状态
- 估算点位任务总距离和时长

它的价值不在 CRUD，而在把多个表和 Redis 状态拼成前端可直接使用的聚合结果。

### 7.11 报表接口

`report/ReportController` 负责：

- 任务状态统计
- 执行趋势统计
- 风险统计
- 飞行时长/次数统计
- 文件、直播、执行报表导出

空巡报表的原始数据来源主要是：

- `DroneMissionExecution`
- `MissionFile` / `MissionFileRev`
- `DroneMissionLive`
- 设备统计表或 OSD 汇总

---

## 8. 成果文件、风险复核与施工闭环

这一块主要在 `patrol-patrolbase`，是空巡任务执行后的“业务闭环”。

### 8.1 模块职责

`patrol-patrolbase` 可以分成三类功能：

1. 基础 GIS 数据：管道线、桩点、阀室、站场、注记图层等
2. 成果文件链路：媒体文件、审核阶段、复核汇总
3. 风险处置链路：施工信息、监护记录、跟踪记录、用户消息

### 8.2 基础 GIS 数据

代表性实现：

- `BasePipelineLineServiceImpl`
- `BasePipelinePileServiceImpl`
- `BasePipelineValveboxServiceImpl`
- `BaseGisLayerCategoryServiceImpl`

其中 `BasePipelineLineServiceImpl` 是最值得后端重点阅读的基础 GIS 服务：

- 支持管道线增删改查
- 支持通过 KML 导入管道线
- 导入后对线路做等距采样点
- 提供 `gisPointDistanceCalc`，用于根据风险点反查最近管线及距离

这个能力被空巡风险分析直接复用：

- `DroneMissionExecutionServiceImpl` 在查询执行详情时，会根据风险照片经纬度调用 `gisPointDistanceCalc`，给出风险点距管线的空间距离结果。

### 8.3 媒体文件到任务成果文件

核心实现：

- `MediaFileServiceImpl`
- `MissionFileServiceImpl`

这里有两套概念：

| 实体 | 含义 |
| --- | --- |
| `MediaFile` | 原始媒体文件，偏设备回传视角。 |
| `MissionFile` | 面向审核流程的业务文件。 |

`MediaFileServiceImpl` 负责：

- 把任务对应图片下载到算法目录
- 调用 Flask 检测服务
- 统计算法识别进度并通过 WebSocket 推送前端

`MissionFileServiceImpl` 负责：

- 将 `MediaFile` 转成审核链路中的 `MissionFile`
- 查询某阶段已处理/未处理文件
- 查询某风险点的历史复核链路
- 风险确认后向消息中心推送通知

### 8.4 多阶段审核模型

核心实现：

- `FileRiskRevImpl`
- `MissionFileRevServiceImpl`

审核模型核心表：

| 实体 | 作用 |
| --- | --- |
| `FileRevStage` | 审核阶段配置，定义阶段顺序、角色。 |
| `MissionFileRev` | 某个执行单在某个阶段的审核状态。 |
| `MissionFileRevTotal` | 某个执行单的总审核汇总状态。 |
| `MissionFile` | 某个阶段待审文件明细。 |

业务逻辑分两段：

#### 8.4.1 算法审核汇总

`FileRiskRevImpl.algoReviewSummary`：

1. 找出已完成算法识别但尚未汇总的 `MediaFile`
2. 转成 `MissionFile`
3. 生成第一阶段 `MissionFileRev`
4. 生成执行级汇总 `MissionFileRevTotal`
5. 如果存在风险图像并且后续还有人工阶段：
   - 复制风险文件到下一阶段
   - 新建下一阶段 `MissionFileRev`
   - 给相关人员推送待审核消息
6. 回写 `MediaFile.scanStatus = true`

#### 8.4.2 人工审核推进

`FileRiskRevImpl.fileReview` / `fileReviewList`：

1. 保存当前阶段单个或批量文件的审核结果
2. 如果该阶段全部审核完：
   - 更新当前阶段 `MissionFileRev`
   - 更新执行级 `MissionFileRevTotal`
3. 如果还有风险图且还有下一阶段：
   - 将风险图复制到下一阶段
   - 创建新的 `MissionFileRev`
   - 推送下一阶段待办消息
4. 如果已经是最终阶段且仍有风险：
   - 创建 `SiteworkInfo`
   - 推送施工待办消息

也就是说，风险审核流程不是修改同一条记录，而是“逐阶段复制风险文件并推进工作流”。

### 8.5 施工信息闭环

核心实现：

- `SiteworkInfoServiceImpl`
- `BaseSiteworkTutelageInfoServiceImpl`
- `BaseSiteworkTraceInfoServiceImpl`

核心对象：

| 实体 | 作用 |
| --- | --- |
| `SiteworkInfo` | 施工/风险处置主单。 |
| `BaseSiteworkTutelageInfo` | 监护日志。 |
| `BaseSiteworkTraceInfo` | 跟踪日志。 |

`SiteworkInfoServiceImpl` 提供：

- 主单 CRUD
- 根据风险点查询监护/跟踪日志
- 聚合查询施工 + 跟踪 + 监护全量信息
- 施工编号生成
- 最近一周施工数量统计
- GIS 图层态分类查询

实际业务闭环是：

`空巡风险 -> 审核确认 -> SiteworkInfo -> 跟踪/监护日志 -> 前端大屏/业务台账`

### 8.6 消息中心

核心实现：

- `UserMsgServiceImpl`
- `UserMsgDispatcher`
- `UserMsgHandler` 及渠道实现

消息中心承担两类消息：

- 通知类：只读消息
- 待办类：需要处理并能全局标记处理状态

消息发送模型：

1. 业务代码构造 `UserMsg`
2. `UserMsgServiceImpl.sendMsg`
3. `UserMsgDispatcher` 根据消息类型找到可用渠道
4. 逐渠道下发

消息的来源很多：

- 空巡任务执行结果通知
- 风险审核待办
- 施工项目创建提醒
- 风险确认提醒

---

## 9. 地巡业务详解

`patrol-patrolland` 是独立的地面巡检子系统，设计风格与空巡不同，更偏“计划排班 + 轨迹命中 + 完成率”。

### 9.1 主要目录

| 目录 | 作用 |
| --- | --- |
| `controller/` | 地巡区域、线路、点位、计划、执行、轨迹、打卡等接口。 |
| `service/impl/` | 地巡核心逻辑。 |
| `task/` | XXL-JOB 任务。 |
| `utils/` | KML 解析生成。 |
| `vo/` | 线路聚合、轨迹、坐标对象。 |

### 9.2 核心实体关系

| 实体 | 作用 |
| --- | --- |
| `PatrolArea` | 巡检区域。 |
| `PatrolLine` | 巡检线路，支持主线/子线。 |
| `PatrolLinePoint` | 线路采样点，用于判断“是否经过”。 |
| `PatrolPoint` | 独立巡检点，适用于点巡。 |
| `PatrolPlan` | 巡检计划模板。 |
| `PatrolPlanExecution` | 某次执行实例。 |
| `PatroTrack` | 落盘后的地巡轨迹段。 |
| `PatrolClockActual` / `PatrolPointActual` / `PatrolLineActual` | 实际打卡/实际巡检数据。 |

### 9.3 线路建模逻辑

核心实现：

- `PatrolLineServiceImpl`

功能点：

1. 新建线路时支持两种来源：
   - 前端直接传 `geom`
   - 通过 KML/KMZ 文件导入
2. 对线路做等距采样：
   - `getPoints(interval, lineId)` 使用 PostGIS `ST_LineInterpolatePoint`
   - 默认间隔 `100` 米
3. 将采样结果写入 `PatrolLinePoint`
4. 计算线路长度
5. 若导入的是多段线：
   - 最后一段视为主线
   - 其他段作为 `prevLineId` 关联的子线

因此，地巡线路真正用于“是否经过”的不是原始线，而是离散采样点。

### 9.4 巡检计划逻辑

核心实现：

- `PatrolPlanServiceImpl`
- `PatrolPlanExecutionServiceImpl`

`PatrolPlan` 的关键字段：

- `cycle`：`DAILY` / `MONTHLY` / `VALIDITY_ONCE`
- `inspectionType`：点巡或线巡
- `dailyTimeStart` / `dailyTimeEnd`
- `lineId` / `pointId`：JSON 字符串，保存关联线路或点位

计划编码规则：

- 日巡：`D-0001`
- 月巡：`M-yyMM-001`
- 时效巡：`R-0001`

执行编码规则：

- 日巡/时效巡：`计划编码-yyMMdd`
- 月巡：`计划编码-MMdd`

### 9.5 地巡执行与轨迹处理

核心实现：

- `LandTrackServiceImpl`
- `TrackTask`

这是地巡模块最重要的类。

它做的事情不是简单“拉轨迹”，而是：

1. 扫描今天有效、且当前时间窗内应该执行的计划
2. 为每个计划生成 `PatrolPlanExecution`
3. 把待巡线路点或巡检点加载进 Redis
4. 定时从外部轨迹接口 `LAND_TIMED_TRACK_URL` 拉取人员设备位置
5. 把实时轨迹存入 Redis 列表
6. 按批量或超时阈值将轨迹片段取出处理
7. 使用 PostGIS 批量判断轨迹点是否命中巡检点/线路采样点
8. 更新 Redis 中“点位是否已覆盖”的状态
9. 计算并回写完成率
10. 将处理过的轨迹片段落盘到 `PatroTrack`

### 9.6 地巡完成率计算

`LandTrackServiceImpl.getCompleteRate` 的核心逻辑：

- Redis 里维护 `pointId -> 0/1`
- `1` 表示已经命中
- 线巡完成率 = 已命中采样点数 / 总采样点数
- 月巡是特殊逻辑：
  - 当月已经巡过的线路点会从本次待巡集合里剔除
  - 同时会单独缓存原始总点数

这意味着月巡不是每天都从头开始，而是“按月累计完成”。

### 9.7 地巡定时任务

`TrackTask` 暴露两个 XXL-JOB：

- `landTaskLine`
  - 调 `taskLinePointCache`
  - 创建执行单并准备 Redis 任务点位缓存
- `landTrackHandle`
  - 调 `pullTrack`
  - 拉取轨迹并按阈值触发处理

### 9.8 地巡模块总结

地巡模块的核心不是控制设备，而是“把轨迹转成执行结果”。

它的业务模型可以概括为：

`计划 -> 执行实例 -> 待巡点位缓存 -> 实时轨迹 -> 空间命中判断 -> 完成率 -> 轨迹落盘`

---

## 10. 大道平台与 DJI 集成层

### 10.1 `patrol-dji`

这个模块是 DJI 远程调用适配层，核心价值不是复杂业务，而是把远程 HTTP 调用封装成服务接口。

代表文件：

- `DjiRemoteController`
- `ControlServiceImpl`
- `LiveStreamServiceImpl`
- `RemoteCallAspect`

其中：

- `ControlServiceImpl` 封装远程调试、起飞到点、fly-to-point、DRC 等调用
- `LiveStreamServiceImpl` 封装直播开始/停止、镜头切换、清晰度、变焦、拍照
- 方法上的 `@DjiRemoteCall` 通过切面把参数和返回结果代理到 DJI 服务端

空巡业务模块通过它完成对 DJI 的控制，但真正的业务状态仍保存在 `patrol-patrolair`。

### 10.2 `patrol-dadao`

这是另一个无人机平台接入层。

代表文件：

- `DadaoAuthService`
- `DadaoUavClient`
- `OsdRouter`

职责：

- 管理大道平台 token 缓存与刷新
- 查询大道无人机列表和实时状态
- 订阅大道 OSD MQTT 消息
- 将大道 OSD 路由给平台内的设备处理逻辑

当前项目中，空巡设备实时数据里已经出现 `DadaoUavOsd` 的使用，说明系统并不是只支持 DJI，一部分设备流可能已经接到大道平台。

---

## 11. 前端结构说明

用户主要负责后端，但为了理解业务闭环，前端目录用途也需要知道。

### 11.1 前端入口

核心文件：

- `patrol-web/src/main.js`
- `patrol-web/src/App.vue`
- `patrol-web/vite.config.js`

`main.js` 完成：

- 全局样式加载
- Vue 应用创建
- Router / Pinia 注册
- Element Plus 注册
- 全局组件、指令注册

### 11.2 `src/` 目录

| 目录 | 作用 |
| --- | --- |
| `apis/` | 前端 API 封装，按后台、基础业务、空巡业务划分。 |
| `assets/` | 图片、字体、SVG、模型等静态资源。 |
| `Business/` | 大屏/业务级组件工程，当前重点是 `Mars3DProject`。 |
| `components/` | 全局组件库、自定义组件、第三方封装。 |
| `composables/` | 组合式工具，如 MQTT、事件总线。 |
| `directives/` | 自定义指令。 |
| `Layout/` | 页面布局。 |
| `NetWork/` | Axios/请求封装、Token 管理。 |
| `router/` | 路由配置。 |
| `store/` | Pinia 状态管理。 |
| `style/` | SCSS 样式体系。 |
| `utils/` | 通用工具函数。 |
| `views/` | 页面视图。 |

### 11.3 前端接口组织

`src/apis` 下主要分成三类：

| 目录 | 对应后端 |
| --- | --- |
| `BackStage/` | `/system/*`、`/monitor/*`、`/tool/*` |
| `base/` | `/patrolbase/*`、`/base/mission-file/*` |
| `business/` | `/patrolair/*`、`/wayline/*`、`/usermsg/*` 等业务接口 |

这说明前端已经按“后台管理 / 基础业务 / 核心业务”分层，而不是杂糅在一起。

### 11.4 前端页面组织

| 目录 | 作用 |
| --- | --- |
| `views/Common/` | 登录、错误页、用户中心等公共页。 |
| `views/BackStage/` | 若依后台管理页。 |
| `views/LargeScreen/` | 大屏总入口。 |
| `views/Test/` | DJI、Vue-Cesium、Galacean、TianDiTu 等试验页。 |

### 11.5 `DJI/` 与 `WebGIS/` 目录

这两个目录不在 `src` 下，但对理解项目也很重要：

- `patrol-web/DJI/`：保存 DJI 相关枚举、类型、云 API 示例代码。
- `patrol-web/WebGIS/`：保存独立的 Mars3D/GIS 组件与资源。

它们更像“项目内业务 SDK / 资源库”，不是普通页面目录。

---

## 12. 推荐的后端阅读顺序

如果你主要负责后端，建议按下面顺序读：

1. `patrol-admin/PatrolApplication.java`
2. `application.yml`、`application-druid.yml`
3. `SecurityConfig`、`SysLoginService`、`TokenService`
4. `FileServiceImpl`
5. `WsPusher`、`WebSocketServer`
6. `DroneMissionPlanServiceImpl`
7. `DjiFlightServiceImpl`
8. `FlighttaskProgressHandler`、`TakeoffToPointProgressHandler`、`FlyToPointProgressHandler`
9. `MediaFileServiceImpl`
10. `FileRiskRevImpl`
11. `SiteworkInfoServiceImpl`
12. `PatrolLineServiceImpl`
13. `PatrolPlanServiceImpl`
14. `LandTrackServiceImpl`

这样读的好处是先理解底座，再理解空巡主链，再理解成果闭环，最后再读地巡。

---

## 13. 阅读代码后的重点结论

### 13.1 这个系统的后端不是“纯 CRUD”

真正复杂的地方在于状态机和异步流：

- DJI/大道外部平台回调
- Redis 运行态状态
- RabbitMQ Topic 分发
- WebSocket 实时推送
- 多阶段审核流转
- 地巡空间匹配计算

如果只盯 Controller 和 Mapper，会低估后端复杂度。

### 13.2 三条最重要的业务链

#### 链路一：空巡任务执行

`计划 -> 执行实例 -> 航线校验 -> 设备校验 -> 远程下发 -> DJI 进度回推 -> 直播/轨迹 -> 成果文件`

#### 链路二：风险审核闭环

`媒体文件 -> 算法识别 -> MissionFile -> 阶段审核 -> 总审核汇总 -> SiteworkInfo -> 消息通知`

#### 链路三：地巡执行闭环

`计划 -> 执行实例 -> Redis 待检点位 -> 拉取轨迹 -> 空间命中 -> 完成率 -> 轨迹落盘`

---

## 14. 当前代码中需要特别注意的问题

这一节不是功能说明，而是阅读源码时发现的实现风险，后端维护时应重点关注。

### 14.1 地巡计划写库存在明显问题

在 `PatrolPlanServiceImpl.insertPatrolPlan` 中：

- `lineId` 被赋值了两次
- 第二次本应写入 `pointId`

也就是说，新增计划时点巡关联点位有丢失风险。

### 14.2 地巡计划更新 SQL 存在字段赋值错误

在 `PatrolPlanMapper.xml` 的 `updatePatrolPlan` 中：

- `planCode` 的更新语句写成了 `person_id = #{planCode}`

这是明显的字段映射错误。

### 14.3 一些方法尚未完成

当前代码里至少有这些未完成实现：

- `DroneMissionLiveServiceImpl.convertToVo` 直接返回 `null`
- `MissionFileServiceImpl.getSiteWork` 直接返回 `null`
- `MissionFileRevServiceImpl.convertToTotal` 直接返回 `null`

这说明部分业务仍在开发中，文档应以“当前已实现逻辑”为准，不要默认所有接口都闭环完成。

### 14.4 空巡设备展示信息带有硬编码成分

`AirPatrolDeviceServiceImpl.convertToVo` 中设备厂家、续航、半径、速度、相机类型等字段使用了硬编码展示值。  
这更像前端展示兜底，而不是严格的设备主数据。

### 14.5 SQL 脚本与当前业务代码不同步

仓库中的 `patrol/sql/*.sql` 没有体现出当前业务模块的大量新表。  
因此恢复业务库时，不能只依赖 SQL 目录，应该同时参考：

- `domain`
- `mapper`
- `mapper.xml`
- 实际环境数据库

### 14.6 缺少自动化测试

当前仓库没有看到 `src/test` 目录。  
对这类高度依赖外部设备、MQ、Redis 的项目来说，至少应考虑补：

- 关键服务单元测试
- 状态机回归测试
- Mapper 层集成测试
- 核心流程的联调脚本

---

## 15. 总结

如果从后端维护视角看，这个项目最重要的不是页面，而是下面四个中心：

1. `DroneMissionExecution`：空巡运行中心
2. `MissionFileRevTotal`：风险审核中心
3. `PatrolPlanExecution`：地巡执行中心
4. `Redis + RabbitMQ + WebSocket`：实时状态中心

后续你如果继续深入后端，建议优先把下面几件事做扎实：

- 理清执行单状态流转字段
- 统一 Redis key 规范和过期策略
- 为空巡与地巡补充状态图
- 给审核流补充阶段配置说明
- 对当前已发现的字段映射错误和未实现方法做修正

这样再接手需求或排障，会比直接从 Controller 开始看高效很多。
