import { access, copyFile, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const workspaceRoot = resolve(projectRoot, '..')
const publicRoot = resolve(projectRoot, 'public')

const copies = [
  {
    from: '证件.jpg',
    to: 'assets/profile/avatar.jpg',
  },
  {
    from: 'output/doc/tian_yantao_backend_resume_reference_style.pdf',
    to: 'assets/docs/resume.pdf',
  },
  {
    from: 'PROJECT_DOCUMENTATION.md',
    to: 'assets/docs/patrol-project.md',
  },
  {
    from: '材料/无人机智慧巡检/微信图片_20260506230418_934_9.png',
    to: 'assets/projects/patrol/cover-dashboard.png',
  },
  {
    from: '材料/无人机智慧巡检/微信图片_20260506230644_935_9.png',
    to: 'assets/projects/patrol/task-board.png',
  },
  {
    from: '材料/无人机智慧巡检/微信图片_20260506230706_936_9.png',
    to: 'assets/projects/patrol/task-filter.png',
  },
  {
    from: '材料/无人机智慧巡检/微信图片_20260506230726_937_9.png',
    to: 'assets/projects/patrol/task-list.png',
  },
  {
    from: '材料/无人机智慧巡检/微信图片_20260506230743_938_9.png',
    to: 'assets/projects/patrol/risk-panel.png',
  },
  {
    from: '材料/无人机智慧巡检/微信图片_20260506230814_939_9.png',
    to: 'assets/projects/patrol/route-map.png',
  },
  {
    from: '材料/海洋水质监测系统/主界面.png',
    to: 'assets/projects/sea-monitor/cover-main.png',
  },
  {
    from: '材料/海洋水质监测系统/功能.png',
    to: 'assets/projects/sea-monitor/feature-overview.png',
  },
  {
    from: '材料/海洋水质监测系统/登录.png',
    to: 'assets/projects/sea-monitor/login.png',
  },
  {
    from: '材料/海洋水质监测系统/design_dashboard.png',
    to: 'assets/projects/sea-monitor/design-dashboard.png',
  },
  {
    from: '材料/海洋水质监测系统/design_architecture.jpeg',
    to: 'assets/projects/sea-monitor/architecture.jpeg',
  },
  {
    from: '材料/海洋水质监测系统/flow_login.png',
    to: 'assets/projects/sea-monitor/flow-login.png',
  },
  {
    from: '材料/海洋水质监测系统/flow_ai_prediction.png',
    to: 'assets/projects/sea-monitor/flow-ai-prediction.png',
  },
  {
    from: '材料/海洋水质监测系统/manual_main.png',
    to: 'assets/projects/sea-monitor/manual-main.png',
  },
  {
    from: '材料/海洋水质监测系统/manual_warning.png',
    to: 'assets/projects/sea-monitor/manual-warning.png',
  },
  {
    from: '材料/海洋水质监测系统/manual_playback.png',
    to: 'assets/projects/sea-monitor/manual-playback.png',
  },
  {
    from: '材料/海洋水质监测系统/logic_overall.png',
    to: 'assets/projects/sea-monitor/logic-overall.png',
  },
  {
    from: '材料/数据挖掘/微信图片_20260506232447_941_9.png',
    to: 'assets/projects/data-mining/cover-home.png',
  },
  {
    from: '材料/数据挖掘/微信图片_20260506232610_944_9.png',
    to: 'assets/projects/data-mining/dataset-detail.png',
  },
  {
    from: '材料/数据挖掘/微信图片_20260506232741_947_9.png',
    to: 'assets/projects/data-mining/model-compare.png',
  },
  {
    from: '材料/数据挖掘/微信图片_20260506232845_950_9.png',
    to: 'assets/projects/data-mining/mnist-report.png',
  },
  {
    from: '材料/食光记/Weixin Image_20260107201338_150_10.png',
    to: 'assets/projects/shiguangji/cover-launch.png',
  },
  {
    from: '材料/食光记/Weixin Image_20260107201440_154_10.png',
    to: 'assets/projects/shiguangji/dish-detail.png',
  },
  {
    from: '材料/食光记/Weixin Image_20260107201618_160_10.png',
    to: 'assets/projects/shiguangji/message-list.png',
  },
  {
    from: '材料/食光记/Weixin Image_20260107201717_163_10.png',
    to: 'assets/projects/shiguangji/profile-page.png',
  },
  {
    from: '材料/食光记/Weixin Image_20260107201859_164_10.png',
    to: 'assets/projects/shiguangji/database-schema.png',
  },
  {
    from: '材料/食光记/Weixin Image_20260107202102_167_10.png',
    to: 'assets/projects/shiguangji/login-page.png',
  },
  {
    from: '材料/南京数据集证书/南京数据集证书.png',
    to: 'assets/certificates/nanjing-dataset-award.png',
  },
  {
    from: '材料/南京数据集证书/南京数据集.pdf',
    to: 'assets/certificates/nanjing-dataset-award.pdf',
  },
  {
    from: '材料/其他证书/photo (1).png',
    to: 'assets/certificates/huawei-cert.png',
  },
  {
    from: '材料/其他证书/华为.pdf',
    to: 'assets/certificates/huawei-cert.pdf',
  },
  {
    from: '材料/其他证书/华为ict.png',
    to: 'assets/certificates/huawei-ict-award.png',
  },
  {
    from: '材料/其他证书/1a6d7cc2dd18d591c5b442ea98a4cb56.jpg',
    to: 'assets/certificates/boya-challenge-cup.jpg',
  },
  {
    from: '材料/其他证书/8875eea0be72529cd8bef0ddc7fdacdc.jpg',
    to: 'assets/certificates/nxu-challenge-cup.jpg',
  },
  {
    from: '材料/其他证书/大创.png',
    to: 'assets/certificates/dachuang-cover.png',
  },
  {
    from: '材料/其他证书/大创结题.pdf',
    to: 'assets/certificates/dachuang-final-report.pdf',
  },
  {
    from: '材料/其他证书/影刀.png',
    to: 'assets/certificates/rpa-cert.png',
  },
  {
    from: '材料/其他证书/田彦涛-影刀高级RPA技能证书.pdf',
    to: 'assets/certificates/rpa-cert.pdf',
  },
  {
    from: '材料/其他证书/CET4_202512_640150252101610_1.pdf',
    to: 'assets/certificates/cet4-score.pdf',
  },
]

const resolveSource = async (item) => {
  const candidates = [
    resolve(workspaceRoot, item.from),
    resolve(projectRoot, 'public', item.to),
    resolve(projectRoot, 'dist', item.to),
  ]

  for (const candidate of candidates) {
    try {
      await access(candidate)
      return candidate
    } catch {
      // keep trying fallbacks
    }
  }

  throw new Error(`Missing source for ${item.to}`)
}

for (const item of copies) {
  const source = await resolveSource(item)
  const target = resolve(publicRoot, item.to)
  await mkdir(dirname(target), { recursive: true })
  await copyFile(source, target)
}
await rm(resolve(publicRoot, 'assets/certificates/cet4-score-preview.png'), { force: true })

console.log(`Synced ${copies.length} assets into ${publicRoot}`)
