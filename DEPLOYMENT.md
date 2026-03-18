# Vercel 部署指南

## 📋 前置准备

1. 一个 **GitHub** 账号
2. 一个 **Vercel** 账号（可以用 GitHub 账号登录）
3. 本地项目代码

---

## 🚀 部署步骤

### 方法一：通过 GitHub + Vercel 自动部署（推荐）

#### 1. 将代码推送到 GitHub

```bash
# 初始化 git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "准备部署到 Vercel"

# 创建 GitHub 仓库后，添加远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 GitHub
git push -u origin main
```

#### 2. 在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 使用 **GitHub 账号登录**
3. 点击 **"Add New..."** → **"Project"**
4. 选择你刚才推送的 **GitHub 仓库**
5. Vercel 会自动检测到你的项目配置（因为我已经创建了 `vercel.json`）
6. 点击 **"Deploy"** 开始部署
7. 等待几分钟，部署完成后会获得一个 `https://你的项目名.vercel.app` 的链接

---

### 方法二：通过 Vercel CLI 部署

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
# 或者
pnpm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

#### 3. 部署项目

在项目根目录执行：

```bash
vercel
```

按照提示操作即可：
- 选择链接到现有项目或创建新项目
- 确认项目设置
- 等待部署完成

#### 4. 生产环境部署

```bash
vercel --prod
```

---

## 🔧 配置说明

我已经为你创建了 `vercel.json` 配置文件，包含以下优化：

- ✅ 自动构建配置（使用 pnpm）
- ✅ SPA 路由支持（所有路由指向 index.html）
- ✅ 静态资源缓存优化
- ✅ 安全头部配置

---

## 🌐 自定义域名（可选）

如果你有自己的域名，可以在 Vercel 中设置：

1. 进入项目的 **Settings** → **Domains**
2. 添加你的域名
3. 按照提示配置 DNS 记录
4. Vercel 会自动提供 SSL 证书

---

## 📱 部署后验证

部署完成后，你可以：

1. **访问你的 Vercel 链接**（类似 `https://你的项目名.vercel.app`）
2. **用手机或其他设备访问**这个链接
3. **分享链接**给其他人访问

---

## 🔄 自动更新

使用 GitHub + Vercel 部署的好处：

- ✅ 每次推送代码到 GitHub，Vercel 会自动重新部署
- ✅ 每次创建 Pull Request，Vercel 会自动创建预览链接
- ✅ 部署历史记录可以回滚

---

## ❓ 常见问题

### Q: 部署失败怎么办？
A: 检查 Vercel 的部署日志，通常是因为依赖安装失败或构建错误。

### Q: 如何查看部署日志？
A: 在 Vercel 项目页面，点击具体的部署记录，可以查看详细日志。

### Q: 免费版有限制吗？
A: 免费版提供：
- 无限带宽
- 100GB 每月流量
- 自动 HTTPS
- 全球 CDN
- 足够个人使用

---

## 🎯 快速开始

现在你可以按照 **方法一** 的步骤开始部署了！只需：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 等待部署完成
4. 获得公网链接分享给他人

部署完成后，你会获得一个类似 `https://react-vite-app.vercel.app` 的链接，可以在任何设备上访问！

# GitHub Pages 部署说明
构建时间: Thu Mar 19 04:56:18 CST 2026

