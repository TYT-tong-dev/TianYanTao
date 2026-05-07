const withBase = (path) => `${import.meta.env.BASE_URL}${path}`

export const navigation = [
  { id: 'hero', label: '首页' },
  { id: 'education', label: '教育背景' },
  { id: 'skills', label: '专业技能' },
  { id: 'projects', label: '项目经历' },
  { id: 'awards', label: '荣誉证书' },
  { id: 'contact', label: '联系方式' },
]

export const profile = {
  name: '田彦涛',
  title: '后端开发实习',
  intro:
    '宁夏大学软件工程（云计算、大数据）专业本科在读，正在寻找后端开发相关实习机会。关注 Spring Boot、Redis、WebSocket、数据处理与工程化协作，习惯从业务链路、模块边界和实际落地效果去拆解问题。',
  avatar: withBase('assets/profile/avatar.jpg'),
  phone: '18309654582',
  email: 'tyt2185802627@outlook.com',
  city: '宁夏回族自治区中卫市',
  birthday: '2005.09',
  ethnicity: '回族',
  politicalStatus: '群众',
  english: 'CET-4',
  cet4Proof: withBase('assets/certificates/cet4-score.pdf'),
  github: 'https://github.com/TYT-tong-dev',
  resume: withBase('assets/docs/resume.pdf'),
  highlights: [
    '求职方向：后端开发 / 平台开发 / 数据处理',
    '公开项目：智慧巡检平台、海洋水质监测系统、数据挖掘分类器优化、鸿蒙“食光记”',
    '实践关键词：Spring Boot、多模块架构、Redis、RabbitMQ、WebSocket、数据集处理',
  ],
}

export const education = {
  school: '宁夏大学',
  major: '软件工程（云计算、大数据）',
  degree: '本科',
  period: '2023.09 - 2027.06',
  courses: ['数据结构', '操作系统', '计算机网络', '数据库原理'],
  summary:
    '系统学习软件工程、数据处理与计算机基础课程，持续将课程知识投入项目实践，逐步形成后端开发与工程协作方向的能力积累。',
}

export const skillGroups = [
  {
    title: '编程语言',
    summary: '具备日常开发与项目实践所需的基础编码能力。',
    items: ['Java', 'Python', 'JavaScript', 'HTML/CSS'],
  },
  {
    title: '后端基础',
    summary: '围绕 Patrol 项目文档沉淀和后端方向学习持续积累。',
    items: [
      'Spring Boot',
      'Spring Security + JWT',
      'MyBatis / MyBatis Plus',
      'PostgreSQL',
    ],
  },
  {
    title: '数据处理',
    summary: '有数据预处理、特征选择、模型训练和结果评估经验。',
    items: ['数据清洗', '特征工程', '分类器对比', '可视化分析'],
  },
  {
    title: '工具与协作',
    summary: '能够理解完整业务链路并输出结构化文档。',
    items: ['GitHub', 'Redis', 'RabbitMQ', 'Netty WebSocket', 'MinIO'],
  },
]

export const projects = [
  {
    id: 'patrol',
    title: 'Patrol 智慧巡检平台',
    role: '企业项目 · 后端开发',
    period: '2026.01 - 2026.03',
    summary:
      '围绕空巡、地巡和风险闭环业务，对多模块 Spring Boot 项目进行后端梳理与结构化总结，沉淀系统架构、接口分层与关键链路认知。（企业内部项目，代码不公开）',
    bullets: [
      '梳理 Spring Boot 多模块结构，覆盖 patrol-admin、framework、common、空巡、地巡、DJI 接入与 WebSocket 服务等核心模块。',
      '归纳 Spring Security + JWT、MyBatis、PostgreSQL、Redis、RabbitMQ、MinIO、Netty WebSocket 等技术机制与运行关系。',
      '总结空巡任务执行、风险审核闭环、地巡轨迹处理三条核心业务链，并定位地巡计划写库与 SQL 字段映射问题。',
    ],
    techStack: [
      'Java 17',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'MyBatis',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'MinIO',
      'Netty WebSocket',
    ],
    links: [],
    screenshots: [
      {
        src: withBase('assets/projects/patrol/cover-dashboard.png'),
        alt: 'Patrol 总览大屏',
        title: '平台总览大屏',
      },
      {
        src: withBase('assets/projects/patrol/task-board.png'),
        alt: 'Patrol 任务看板',
        title: '任务进度看板',
      },
      {
        src: withBase('assets/projects/patrol/task-filter.png'),
        alt: 'Patrol 筛选任务面板',
        title: '任务筛选与状态查询',
      },
      {
        src: withBase('assets/projects/patrol/task-list.png'),
        alt: 'Patrol 任务列表界面',
        title: '巡检任务列表',
      },
      {
        src: withBase('assets/projects/patrol/risk-panel.png'),
        alt: 'Patrol 风险处理界面',
        title: '风险处理和闭环状态',
      },
      {
        src: withBase('assets/projects/patrol/route-map.png'),
        alt: 'Patrol 路线与点位展示',
        title: '线路、点位与地图联动',
      },
    ],
  },
  {
    id: 'nanjing-dataset',
    title: '南京高质量数据集开发者创新大赛（油气管输赛道）',
    role: '参赛项目',
    period: '2026.03',
    summary:
      '面向油气管道智能巡检场景，负责图像数据整理、清洗与筛选，参与目标类别定义、标注规范制定及 YOLO 预标注复核。',
    bullets: [
      '围绕能源管输赛道的数据集建设任务，参与图像数据筛选、标签规则制定和预标注结果复核。',
      '结合工业巡检场景理解，参与提升目标检测数据质量与训练可用性。',
      '项目最终获得“数智未来”高质量数据集开发者创新大赛油气管输赛道三等奖。',
    ],
    techStack: ['数据集处理', 'YOLO', '目标检测', '数据标注', '工业巡检'],
    links: [
      { label: '证书原件', url: withBase('assets/certificates/nanjing-dataset-award.pdf') },
    ],
    screenshots: [
      {
        src: withBase('assets/certificates/nanjing-dataset-award.png'),
        alt: '南京高质量数据集开发者创新大赛证书',
        title: '赛事获奖证书',
      },
    ],
  },
  {
    id: 'sea-monitor',
    title: '基于火星科技的海洋水质监测系统',
    role: '个人项目',
    period: '2025.09 - 2026.12',
    summary:
      '面向海洋水质监测与站点管理场景，完成数据展示、地图可视化、回放与预警相关页面设计和交互实现。',
    bullets: [
      '负责系统整体界面设计、前端页面实现与 JavaScript 交互逻辑开发，积累从需求分析到模块落地的完整实践经验。',
      '围绕水质等级、站点状态、数据同步与 AI 预测等功能，构建多视图可视化页面和业务流程图。',
      '通过地图与统计卡片联动展示监测数据，强化监测结果的直观性与交互体验。',
    ],
    techStack: ['Vue', 'JavaScript', 'Mars3D', 'ECharts', '可视化设计'],
    links: [{ label: 'GitHub 仓库', url: 'https://github.com/TYT-tong-dev/hai-y' }],
    screenshots: [
      {
        src: withBase('assets/projects/sea-monitor/cover-main.png'),
        alt: '海洋水质监测系统主界面',
        title: '主界面总览',
      },
      {
        src: withBase('assets/projects/sea-monitor/feature-overview.png'),
        alt: '海洋水质监测系统功能界面',
        title: '核心功能入口',
      },
      {
        src: withBase('assets/projects/sea-monitor/login.png'),
        alt: '海洋水质监测系统登录页',
        title: '登录流程界面',
      },
      {
        src: withBase('assets/projects/sea-monitor/design-dashboard.png'),
        alt: '统计仪表盘设计',
        title: '统计仪表盘设计',
      },
      {
        src: withBase('assets/projects/sea-monitor/architecture.jpeg'),
        alt: '海洋水质监测系统架构图',
        title: '系统架构设计',
      },
      {
        src: withBase('assets/projects/sea-monitor/flow-ai-prediction.png'),
        alt: 'AI 预测流程图',
        title: 'AI 预测业务流程',
      },
      {
        src: withBase('assets/projects/sea-monitor/manual-main.png'),
        alt: '操作手册主界面',
        title: '操作手册说明',
      },
      {
        src: withBase('assets/projects/sea-monitor/manual-warning.png'),
        alt: '预警模块说明',
        title: '预警模块说明',
      },
    ],
  },
  {
    id: 'shiguangji',
    title: '鸿蒙操作系统移动应用开发（食光记）',
    role: '个人项目',
    summary:
      '围绕餐饮信息查询与分享场景，完成鸿蒙应用的页面搭建、交互逻辑和部分数据结构设计，覆盖登录、消息、个人中心等模块。',
    bullets: [
      '实现启动页、登录页、菜品详情、消息列表和个人中心等页面，积累移动端页面组织与交互开发经验。',
      '结合餐饮内容展示、分享互动和账户信息模块，完成多页面跳转与基础功能联动。',
      '补充数据库表结构截图，体现从界面到基础数据设计的完整实践过程。',
    ],
    techStack: ['HarmonyOS', 'ArkUI', '移动端交互', '页面设计', '基础数据设计'],
    links: [{ label: 'GitHub 仓库', url: 'https://github.com/TYT-tong-dev/harmony' }],
    screenshots: [
      {
        src: withBase('assets/projects/shiguangji/cover-launch.png'),
        alt: '食光记启动页',
        title: '启动页',
      },
      {
        src: withBase('assets/projects/shiguangji/login-page.png'),
        alt: '食光记登录页',
        title: '登录页',
      },
      {
        src: withBase('assets/projects/shiguangji/dish-detail.png'),
        alt: '食光记菜品详情页',
        title: '菜品详情',
      },
      {
        src: withBase('assets/projects/shiguangji/message-list.png'),
        alt: '食光记消息列表',
        title: '消息列表',
      },
      {
        src: withBase('assets/projects/shiguangji/profile-page.png'),
        alt: '食光记个人中心',
        title: '个人中心',
      },
      {
        src: withBase('assets/projects/shiguangji/database-schema.png'),
        alt: '食光记数据库结构',
        title: '基础数据结构',
      },
    ],
  },
  {
    id: 'data-mining',
    title: '数据挖掘分类器优化项目',
    role: '项目成员',
    summary:
      '围绕多类型数据集构建分类器对比与分析平台，完成数据预处理、特征处理、模型训练、指标对比和结果展示。',
    bullets: [
      '面向 8 类不同类型数据集完成数据预处理、特征选择、模型训练与效果评估，对比多种分类算法表现并完成优化选型。',
      '通过可视化页面展示分类结果、模型指标与雷达图对比，提升实验结果的可读性与复盘效率。',
      '在 MNIST 等数据集上比较逻辑回归、随机森林、XGBoost、CNN 的性能差异，形成结构化结论。',
    ],
    techStack: ['Python', '机器学习', 'XGBoost', 'CNN', '数据可视化'],
    links: [
      {
        label: 'GitHub 仓库',
        url: 'https://github.com/TYT-tong-dev/data-mining-project',
      },
    ],
    screenshots: [
      {
        src: withBase('assets/projects/data-mining/cover-home.png'),
        alt: '数据挖掘展示平台首页',
        title: '数据集展示首页',
      },
      {
        src: withBase('assets/projects/data-mining/dataset-detail.png'),
        alt: '数据集详情页',
        title: '数据集分类与详情',
      },
      {
        src: withBase('assets/projects/data-mining/model-compare.png'),
        alt: '模型性能对比页',
        title: '模型性能对比',
      },
      {
        src: withBase('assets/projects/data-mining/mnist-report.png'),
        alt: 'MNIST 分类结果界面',
        title: 'MNIST 分类分析结果',
      },
    ],
  },
]

export const awardGroups = [
  {
    title: '竞赛获奖',
    items: [
      '中国国际大学生创新大赛（2024）宁夏大学校赛优秀奖',
      '华为 ICT 大赛省级三等奖',
      '宁夏大学博雅书院首届“挑战杯”大学生课外学术科技作品竞赛三等奖',
      '“渊博雅正·思辨今朝”第二届“博雅杯”辩论赛亚军',
      '南京高质量数据集开发者创新大赛（油气管输赛道）三等奖',
    ],
  },
  {
    title: '综合经历',
    items: [
      '大学生创新创业训练计划校级立项',
      '“笙涯”职业规划兴趣小组成员，参与组织职业规划讲座与分享会',
      '参加 2024 年寒假大学生“返家乡”社会实践活动',
      '2025 年全国啦啦操联赛优秀展演者',
    ],
  },
  {
    title: '补充证书',
    items: [
      '影刀高级 RPA 技能证书',
      '大创结题材料留档',
      '华为云服务计算微认证',
    ],
  },
]

export const certificates = [
  {
    title: '南京高质量数据集开发者创新大赛三等奖',
    category: '竞赛获奖',
    note: '能源管输赛道获奖证书',
    thumbnail: withBase('assets/certificates/nanjing-dataset-award.png'),
    sourceUrl: withBase('assets/certificates/nanjing-dataset-award.pdf'),
    previewType: 'image',
  },
  {
    title: '华为 ICT 大赛省级三等奖',
    category: '竞赛获奖',
    note: '华为 ICT 大赛获奖证书',
    thumbnail: withBase('assets/certificates/huawei-ict-award.png'),
    sourceUrl: withBase('assets/certificates/huawei-ict-award.png'),
    previewType: 'image',
  },
  {
    title: '宁夏大学第十五届“挑战杯”三等奖',
    category: '竞赛获奖',
    note: '校级课外学术科技作品竞赛',
    thumbnail: withBase('assets/certificates/nxu-challenge-cup.jpg'),
    sourceUrl: withBase('assets/certificates/nxu-challenge-cup.jpg'),
    previewType: 'image',
  },
  {
    title: '博雅书院首届“挑战杯”三等奖',
    category: '竞赛获奖',
    note: '博雅书院学术科技作品竞赛',
    thumbnail: withBase('assets/certificates/boya-challenge-cup.jpg'),
    sourceUrl: withBase('assets/certificates/boya-challenge-cup.jpg'),
    previewType: 'image',
  },
  {
    title: '大创结题材料',
    category: '综合经历',
    note: '大学生创新创业训练计划结题',
    thumbnail: withBase('assets/certificates/dachuang-cover.png'),
    sourceUrl: withBase('assets/certificates/dachuang-final-report.pdf'),
    previewType: 'image',
  },
  {
    title: '影刀高级 RPA 技能证书',
    category: '其他证书',
    note: '技能认证材料',
    thumbnail: withBase('assets/certificates/rpa-cert.png'),
    sourceUrl: withBase('assets/certificates/rpa-cert.pdf'),
    previewType: 'image',
  },
  {
    title: '华为云服务计算微认证',
    category: '其他证书',
    note: 'Huawei Certification',
    thumbnail: withBase('assets/certificates/huawei-cert.png'),
    sourceUrl: withBase('assets/certificates/huawei-cert.pdf'),
    previewType: 'image',
  },
]

export const footerMeta = {
  statement:
    '欢迎通过 GitHub、邮箱或电话联系我。当前重点投递后端开发、平台开发和数据处理相关实习岗位。',
}
