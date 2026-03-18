# 阿里云 OSS + CDN 部署指南

## 适用场景

✅ 需要极快的访问速度
✅ 需要高可用性
✅ 企业级项目
✅ 需要自定义域名

## 费用说明

- OSS 存储：约 0.12 元/GB/月
- CDN 流量：约 0.24 元/GB
- 本项目约 400KB，每月费用不到 1 元

## 部署步骤

### 1. 开通阿里云 OSS

1. 登录阿里云：https://www.aliyun.com
2. 搜索 "对象存储 OSS" 并开通
3. 创建 Bucket：
   - 名称：`my-react-app`
   - 地域：选择离用户最近的区域
   - 存储类型：标准存储
   - 读写权限：公共读

### 2. 上传构建文件

在项目目录执行：

```bash
# 构建项目
pnpm run build

# 安装阿里云 CLI
npm install -g aliyun-cli

# 配置密钥
aliyun configure

# 上传到 OSS
aliyun oss cp dist/ oss://my-react-app/ -r -f
```

### 3. 配置 CDN 加速

1. 在阿里云控制台搜索 "CDN"
2. 添加域名：
   - 业务类型：图片小文件
   - 加速域名：您的域名或 OSS 默认域名
3. 配置 CNAME
4. 开启 HTTPS

### 4. 自动化部署脚本

创建 `deploy-aliyun.sh`：

```bash
#!/bin/bash
# 构建项目
pnpm run build

# 上传到 OSS
aliyun oss cp dist/ oss://my-react-app/ -r -f --update

# 刷新 CDN 缓存
aliyun cdn RefreshObjectCaches --ObjectPath="http://my-react-app.oss-cn-hangzhou.aliyuncs.com/*"
```

每次部署只需运行：`bash deploy-aliyun.sh`

## 访问地址

部署后可以通过以下地址访问：
- OSS 默认域名：`https://my-react-app.oss-cn-hangzhou.aliyuncs.com`
- 自定义域名（配置后）
- CDN 加速域名（配置后）

## 优势

⚡️ 国内访问速度极快
⚡️ CDN 全球加速
⚡️ 高可用性（99.99%）
⚡️ 自动 HTTPS
⚡️ 按量付费，成本极低
