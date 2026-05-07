# GitHub Pages 部署脚本

Write-Host "开始部署到 GitHub Pages..." -ForegroundColor Green

# 1. 构建项目
Write-Host "`n[1/4] 构建项目..." -ForegroundColor Cyan
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！" -ForegroundColor Red
    exit 1
}

# 2. 进入构建输出目录
Write-Host "`n[2/4] 进入 dist 目录..." -ForegroundColor Cyan
Set-Location dist

# 3. 初始化 git 并提交
Write-Host "`n[3/4] 初始化 Git 仓库..." -ForegroundColor Cyan
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# 4. 推送到 gh-pages 分支
Write-Host "`n[4/4] 推送到 gh-pages 分支..." -ForegroundColor Cyan
git push -f git@github.com:TYT-tong-dev/TianYanTao.git master:gh-pages

Set-Location ..

Write-Host "`n部署完成！" -ForegroundColor Green
Write-Host "请在 GitHub 仓库设置中启用 Pages，选择 gh-pages 分支" -ForegroundColor Yellow
