# 阿里云 OSS + CDN 部署指南

本文档介绍如何将项目部署到阿里云 OSS，并配置 CDN 加速。

## 准备工作

### 1. 注册阿里云账号

如果还没有阿里云账号，请先注册：[https://www.aliyun.com](https://www.aliyun.com)

### 2. 开通 OSS 服务

1. 登录阿里云控制台
2. 搜索并进入"对象存储 OSS"服务
3. 开通 OSS 服务（新用户有免费额度）

### 3. 创建存储桶

1. 在 OSS 控制台点击"创建 Bucket"
2. 配置参数：
   - **Bucket 名称**：自定义，如 `my-artwork-gallery`
   - **地域**：选择距离用户最近的区域（如华东1-杭州）
   - **存储类型**：标准存储
   - **读写权限**：**公共读**（重要：否则网站无法访问）
   - **其他**：使用默认配置

### 4. 获取访问密钥

1. 访问 [AccessKey 管理页面](https://ram.console.aliyun.com/manage/ak)
2. 创建 AccessKey（或使用子账号 AccessKey）
3. 保存 `AccessKey ID` 和 `AccessKey Secret`（请妥善保管）

### 5. 配置 CDN（可选但推荐）

1. 在 OSS 控制台，找到您的 Bucket
2. 点击"域名管理" → "绑定域名"
3. 添加您的自定义域名（如 `cdn.example.com`）
4. 开启 CDN 加速
5. 在域名解析中添加 CNAME 记录

## 项目配置

### 1. 安装依赖

```bash
pnpm install
```

这将安装 `ali-oss` SDK 用于上传文件到 OSS。

### 2. 配置 OSS 参数

创建项目根目录下的 `oss.config.json` 文件：

```json
{
  "region": "oss-cn-hangzhou",
  "bucket": "your-bucket-name",
  "accessKeyId": "your-access-key-id",
  "accessKeySecret": "your-access-key-secret",
  "cdnDomain": "cdn.example.com",
  "uploadPath": "",
  "exclude": [
    "*.map",
    ".DS_Store",
    "Thumbs.db"
  ],
  "cacheControl": "max-age=31536000"
}
```

**配置说明**：

| 参数 | 说明 | 示例 |
|------|------|------|
| `region` | OSS 所在区域 | `oss-cn-hangzhou` |
| `bucket` | 存储桶名称 | `my-artwork-gallery` |
| `accessKeyId` | AccessKey ID | `LTAI5t...` |
| `accessKeySecret` | AccessKey Secret | `xxxxx...` |
| `cdnDomain` | CDN 加速域名（可选） | `cdn.example.com` |
| `uploadPath` | OSS 中的上传路径 | `web` 或留空表示根目录 |
| `exclude` | 排除的文件模式 | `["*.map"]` |
| `cacheControl` | 缓存策略 | `max-age=31536000` |

**常用区域列表**：

- `oss-cn-hangzhou` - 华东1（杭州）
- `oss-cn-beijing` - 华北2（北京）
- `oss-cn-shanghai` - 华东2（上海）
- `oss-cn-shenzhen` - 华南1（深圳）
- `oss-cn-guangzhou` - 华南2（广州）

### 3. 安全建议（推荐）

不要将 AccessKey 直接写在配置文件中，而是使用环境变量：

**Linux/Mac**:
```bash
export OSS_ACCESS_KEY_ID="your-access-key-id"
export OSS_ACCESS_KEY_SECRET="your-access-key-secret"
pnpm run deploy:oss
```

**Windows (PowerShell)**:
```powershell
$env:OSS_ACCESS_KEY_ID="your-access-key-id"
$env:OSS_ACCESS_KEY_SECRET="your-access-key-secret"
pnpm run deploy:oss
```

## 部署命令

### 构建并部署

```bash
pnpm run deploy:oss:build
```

这个命令会：
1. 清理旧的构建文件
2. 构建 TypeScript
3. 用 Vite 打包项目
4. 上传到阿里云 OSS

### 仅部署（已构建）

如果已经构建过，可以直接上传：

```bash
pnpm run deploy:oss
```

## 验证部署

### 1. 检查 OSS 文件

在 OSS 控制台的文件管理中，确认文件已上传。

### 2. 访问网站

- **无 CDN**：`https://{bucket-name}.{region}.aliyuncs.com`
- **有 CDN**：`https://{your-custom-domain}`

例如：
- `https://my-artwork-gallery.oss-cn-hangzhou.aliyuncs.com`
- `https://cdn.example.com`

### 3. 检查路由

由于使用 Hash 路由，直接访问 `https://cdn.example.com/#/gallery` 应该正常工作。

## CDN 缓存管理

### 刷新缓存

更新内容后，建议刷新 CDN 缓存：

**方式一：阿里云控制台**
1. 进入 CDN 控制台
2. 选择"刷新缓存"
3. 输入要刷新的 URL 或目录

**方式二：使用 CDN SDK**（高级用户）

可以创建一个自动刷新 CDN 缓存的脚本。

### 缓存策略建议

| 文件类型 | 缓存时间 |
|---------|---------|
| HTML | 不缓存或短时间缓存 |
| CSS/JS | 长时间缓存（1 年） |
| 图片/字体 | 长时间缓存（1 年） |

## 成本优化

### 免费额度

阿里云 OSS 新用户有免费额度：
- 存储空间：5 GB
- 流量：每月一定额度
- 请查看官方最新政策

### 节省成本建议

1. **使用 CDN**：CDN 流量比直接 OSS 流量便宜
2. **压缩资源**：Vite 默认已压缩
3. **删除无用文件**：定期清理旧版本
4. **选择合适区域**：选择用户就近的区域

## 自动部署

### GitHub Actions 自动部署

创建 `.github/workflows/deploy-oss.yml`：

```yaml
name: Deploy to OSS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build

      - name: Deploy to OSS
        env:
          OSS_ACCESS_KEY_ID: ${{ secrets.OSS_ACCESS_KEY_ID }}
          OSS_ACCESS_KEY_SECRET: ${{ secrets.OSS_ACCESS_KEY_SECRET }}
        run: pnpm run deploy:oss
```

在 GitHub 仓库设置中添加 Secrets：
- `OSS_ACCESS_KEY_ID`
- `OSS_ACCESS_KEY_SECRET`

## 常见问题

### 1. 上传失败：权限不足

检查 AccessKey 是否有 OSS 写入权限。

### 2. 网站无法访问

确认 Bucket 权限设置为"公共读"。

### 3. 路由 404

确认使用的是 Hash 路由（本项目已配置）。

### 4. CDN 缓存未更新

手动刷新 CDN 缓存或在 URL 后加时间戳。

### 5. 跨域问题

在 OSS 控制台配置 CORS 规则：

```json
{
  "allowedOrigins": ["*"],
  "allowedMethods": ["GET", "HEAD"],
  "allowedHeaders": ["*"],
  "exposeHeaders": [],
  "maxAgeSeconds": 3600
}
```

## 进阶配置

### 自定义错误页面

在 OSS 控制台设置静态网站托管：

1. 进入 Bucket 设置
2. 开启"静态网站托管"
3. 设置默认首页为 `index.html`
4. 设置默认 404 页面为 `index.html`（支持 SPA 路由）

### 图片处理

OSS 提供图片处理服务，可以在 URL 中添加处理参数：

```
https://example.com/image.jpg?x-oss-process=image/resize,w_500
```

### 日志分析

开启 OSS 访问日志，分析访问情况：

1. 进入 Bucket 设置
2. 开启"日志存储"
3. 选择日志存储位置

## 相关链接

- [阿里云 OSS 文档](https://help.aliyun.com/product/31815.html)
- [阿里云 CDN 文档](https://help.aliyun.com/product/27107.html)
- [ali-oss SDK 文档](https://github.com/ali-sdk/ali-oss)
