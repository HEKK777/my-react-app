# Netlify 部署指南

## 特点

✅ 自动部署
✅ 国内访问速度尚可
✅ 支持 Form 处理
✅ 支持 Serverless Functions
✅ 免费 SSL 证书

## 部署步骤

### 方法一：通过网页部署

1. 访问：https://netlify.com
2. 注册账号（可用 GitHub 登录）
3. 点击 "New site from Git"
4. 选择 GitHub 仓库：`HEKK777/my-react-app`
5. 构建设置：
   - Build command: `pnpm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

### 方法二：通过 CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化
netlify init

# 部署
netlify deploy --prod

# 绑定自定义域名（可选）
netlify domains:add www.yourdomain.com
```

### 访问地址

部署后获得的地址格式：
```
https://amazing-johnson-123456.netlify.app
```

可以在 Netlify 控制台自定义域名前缀。

## 配置文件

项目根目录创建 `netlify.toml`：

```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 自动部署

每次推送到 GitHub，Netlify 会自动重新部署。

## 与 Gitee Pages 对比

| 特性 | Gitee Pages | Netlify |
|------|------------|---------|
| 国内速度 | ⚡️⚡️⚡️ | ⚡️⚡️ |
| 部署方式 | 手动更新 | 自动部署 |
| 费用 | 免费 | 免费 |
| 自定义域名 | 支持 | 支持 |
| 推荐度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
