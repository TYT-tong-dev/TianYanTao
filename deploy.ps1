[CmdletBinding()]
param(
    [string]$Branch = "gh-pages",
    [string]$Remote = "origin",
    [string]$CommitMessage = "Deploy to GitHub Pages"
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host $Message -ForegroundColor Cyan
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$distPath = Join-Path $projectRoot "dist"
$distGitPath = Join-Path $distPath ".git"

Write-Host "Starting GitHub Pages deployment..." -ForegroundColor Green

Push-Location $projectRoot
try {
    $remoteUrl = git config --get "remote.$Remote.url"
    if (-not $remoteUrl) {
        throw "Remote '$Remote' was not found. Run 'git remote -v' and confirm the repository remote first."
    }

    Write-Step "[1/5] Installing/build prerequisites check"
    pnpm --version | Out-Null
    git --version | Out-Null

    Write-Step "[2/5] Building site"
    pnpm build

    if (-not (Test-Path $distPath)) {
        throw "Build succeeded but '$distPath' was not created."
    }

    Write-Step "[3/5] Preparing dist for Pages"
    if (Test-Path $distGitPath) {
        $resolvedGitPath = (Resolve-Path $distGitPath).Path
        if (-not $resolvedGitPath.StartsWith((Resolve-Path $distPath).Path)) {
            throw "Refusing to remove unexpected git directory: $resolvedGitPath"
        }
        Remove-Item -LiteralPath $resolvedGitPath -Recurse -Force
    }

    $noJekyllPath = Join-Path $distPath ".nojekyll"
    if (-not (Test-Path $noJekyllPath)) {
        New-Item -Path $noJekyllPath -ItemType File | Out-Null
    }

    Write-Step "[4/5] Creating deployment commit"
    Push-Location $distPath
    try {
        git init | Out-Null
        git add -A

        $hasChanges = git status --porcelain
        if (-not $hasChanges) {
            Write-Host "No changes detected in dist, but deployment commit will still be refreshed." -ForegroundColor Yellow
        }

        git commit -m $CommitMessage --allow-empty | Out-Null
        git branch -M $Branch

        $existingRemote = git remote
        if ($existingRemote -contains $Remote) {
            git remote remove $Remote
        }
        git remote add $Remote $remoteUrl

        Write-Step "[5/5] Pushing dist to $Remote/$Branch"
        git push -f $Remote $Branch
    }
    finally {
        Pop-Location
    }

    Write-Host ""
    Write-Host "Deployment completed." -ForegroundColor Green
    Write-Host "GitHub Pages URL: https://tyt-tong-dev.github.io/TianYanTao/" -ForegroundColor Yellow
}
finally {
    Pop-Location
}
