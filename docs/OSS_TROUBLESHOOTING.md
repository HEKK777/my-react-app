# OSS 部署问题排查指南

## 问题：访问域名时下载文件或显示空白

### 原因分析
访问 OSS 域名时出现下载文件或空白页，通常是因为：
1. **静态网站托管未开启**
2. **Content-Type 配置不正确**
3. **文件路径问题**

### 解决步骤

#### 步骤 1：开启静态网站托管

1. 登录阿里云 OSS 控制台
2. 进入 Bucket：`my-react-app-hekk`
3. 左侧菜单选择 **"基础设置"** → **"静态网站托管"**
4. 点击 **"设置"** → **"开启静态网站托管"**
5. 配置如下：
   - **默认首页**：`index.html`
   - **默认 404 页**：`index.html`（重要：支持 SPA 路由）
   - **子目录首页**：勾选 **"默认开通子目录首页"**
6. 点击 **"确定"** 保存

#### 步骤 2：设置读写权限

1. 左侧菜单选择 **"权限管理"** → **"读写权限"**
2. 设置为 **"公共读"**
3. 点击 **"确定"** 保存

#### 步骤 3：获取正确的访问地址

开启静态网站托管后，会显示 **"静态网站托管端点"**：

```
http://my-react-app-hekk.oss-cn-guangzhou.aliyuncs.com
```

**重要**：使用这个端点访问，而不是普通的 OSS 域名。

#### 步骤 4：重新上传文件（如果需要）

如果文件 Content-Type 不正确，需要重新上传：

```bash
# 构建项目
npm run build

# 重新部署到 OSS
npm run deploy:oss
```

### 验证部署

#### 1. 检查文件列表
在 OSS 控制台的 **"文件管理"** 中，确认根目录包含：
```
├── index.html
└── assets/
    ├── index-xxx.js
    ├── index-xxx.css
    └── vite.svg
```

#### 2. 检查文件 Content-Type
在文件列表中，点击文件右侧的 **"详情"**，确认：
- `index.html` → Content-Type: `text/html`
- `*.js` → Content-Type: `application/javascript`
- `*.css` → Content-Type: `text/css`

#### 3. 访问测试
在浏览器中访问静态网站托管端点：
```
http://my-react-app-hekk.oss-cn-guangzhou.aliyuncs.com
```

应该看到网站正常显示，而不是下载文件。

### 常见错误

#### 错误 1：NoSuchKey
**现象**：XML 错误，提示 key 不存在

**解决**：
- 确认 `index.html` 已上传到根目录
- 确认访问的是静态网站托管端点，不是普通 OSS 域名

#### 错误 2：AccessDenied
**现象**：403 权限错误

**解决**：
- 设置 Bucket 读写权限为 **"公共读"**
- 检查 RAM 用户权限是否包含 OSS 读取权限

#### 错误 3：下载 index.html 文件
**现象**：访问时浏览器下载 HTML 文件

**解决**：
- 确认 Content-Type 为 `text/html`
- 确认已开启静态网站托管
- 使用静态网站托管端点而不是普通 OSS 域名

#### 错误 4：白屏或控制台错误
**现象**：页面空白，浏览器控制台有错误

**解决**：
- 检查 `assets/index.js` 是否存在
- 检查 JS 文件路径是否正确（HashRouter 不需要特殊配置）
- 清除浏览器缓存后重试

### CDN 配置（可选但推荐）

如果配置了 CDN 加速：

1. **添加 CDN 域名**
   - 在 OSS 控制台，选择 **"域名管理"** → **"绑定域名"**
   - 添加您的自定义域名
   - 开启 CDN 加速

2. **配置 CNAME**
   - 在域名服务商处添加 CNAME 记录
   - 记录值：CDN 提供的 CNAME 地址

3. **访问测试**
   ```
   https://your-custom-domain.com
   ```

### 配置文件说明

项目根目录的 `oss.config.json` 配置说明：

```json
{
  "region": "oss-cn-guangzhou",    // OSS 区域，必须与 Bucket 实际区域一致
  "bucket": "my-react-app-hekk",   // Bucket 名称
  "accessKeyId": "YOUR_KEY",       // AccessKey ID（建议用环境变量）
  "accessKeySecret": "YOUR_SECRET", // AccessKey Secret（建议用环境变量）
  "uploadPath": "",                // 上传路径，空字符串表示根目录
  "exclude": ["*.map"],            // 排除的文件
  "cacheControl": "max-age=31536000" // 缓存策略（JS/CSS）
}
```

**注意事项**：
- HTML 文件缓存策略自动设为 `no-cache`
- JS/CSS/图片等资源使用配置的缓存策略
- `*.map` 文件默认不上传

### 相关链接

- [阿里云 OSS 控制台](https://oss.console.aliyun.com/)
- [静态网站托管文档](https://help.aliyun.com/document_detail/31900.html)
- [OSS 权限管理](https://help.aliyun.com/document_detail/100676.html)

### 获取帮助

如果问题仍未解决：
1. 检查 OSS 控制台的 **"访问日志"**
2. 使用浏览器开发者工具查看网络请求
3. 确认所有文件都已正确上传
4. 检查 Bucket 实际所在区域是否与配置一致
