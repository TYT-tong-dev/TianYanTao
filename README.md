# 田彦涛个人简历网站

## 本地运行

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
pnpm preview
```

## 说明

- 站点基于 `Vue 3 + Vite` 实现。
- `pnpm dev` 与 `pnpm build` 前会自动执行素材同步脚本。
- 原始素材保存在仓库根目录的 `证件.jpg`、`材料/`、`output/doc/` 中。
- 同步后的静态资源会写入 `TianYanTao/public/assets/`，便于 GitHub Pages 直接部署。
