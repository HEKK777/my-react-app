#!/usr/bin/env node

/**
 * 阿里云 OSS 部署脚本
 * 用于将构建后的静态文件上传到阿里云 OSS
 */

import OSS from 'ali-oss';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}?${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}?${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}?${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}?${colors.reset} ${msg}`)
};

/**
 * 递归读取目录下所有文件
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * 获取文件的 Content-Type
 */
function getContentType(filePath, contentTypeMap) {
  const ext = path.extname(filePath).toLowerCase();
  return contentTypeMap[ext] || 'application/octet-stream';
}

/**
 * 判断文件是否应该被排除
 */
function shouldExclude(filePath, excludePatterns) {
  return excludePatterns.some((pattern) => {
    if (pattern.startsWith('*')) {
      const ext = path.extname(filePath);
      return ext === pattern.slice(1);
    }
    return filePath.includes(pattern);
  });
}

/**
 * 上传文件到 OSS
 */
async function uploadFile(ossClient, localPath, remotePath, options) {
  try {
    const result = await ossClient.put(remotePath, localPath, {
      headers: {
        'Content-Type': options.contentType,
        'Cache-Control': options.cacheControl
      },
      meta: {
        'content-type': options.contentType
      }
    });
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * 主部署函数
 */
async function deploy() {
  try {
    log.info('开始部署到阿里云 OSS...');

    // 读取配置文件
    const configPath = path.join(process.cwd(), 'oss.config.json');
    if (!fs.existsSync(configPath)) {
      throw new Error('配置文件不存在：oss.config.json');
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // 从环境变量读取敏感信息（优先级高于配置文件）
    const accessKeyId = process.env.OSS_ACCESS_KEY_ID || config.accessKeyId;
    const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET || config.accessKeySecret;

    if (!accessKeyId || !accessKeySecret) {
      throw new Error(
        '缺少 OSS 凭证，请在配置文件中设置或使用环境变量 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET'
      );
    }

    // 初始化 OSS 客户端
    const client = new OSS({
      region: config.region,
      accessKeyId,
      accessKeySecret,
      bucket: config.bucket
    });

    log.success(`OSS 客户端初始化成功（区域：${config.region}，存储桶：${config.bucket}）`);

    // 检查构建目录
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error('构建目录不存在，请先运行 npm run build');
    }

    // 获取所有文件
    let files = getAllFiles(distPath);

    // 过滤排除的文件
    if (config.exclude && config.exclude.length > 0) {
      files = files.filter((file) => !shouldExclude(file, config.exclude));
    }

    log.info(`找到 ${files.length} 个文件待上传`);

    // 上传文件
    const uploadPath = config.uploadPath || '';
    const defaultCacheControl = 'max-age=31536000';
    const htmlCacheControl = 'no-cache'; // HTML 文件不缓存，确保获取最新版本
    const contentTypeMap = config.contentType || {};

    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
      const relativePath = path.relative(distPath, file);
      const remotePath = uploadPath ? `${uploadPath}/${relativePath}` : relativePath;
      const contentType = getContentType(file, contentTypeMap);

      // HTML 文件使用不同的缓存策略
      const isHtmlFile = path.extname(file).toLowerCase() === '.html';
      const cacheControl = isHtmlFile ? htmlCacheControl : defaultCacheControl;

      process.stdout.write(`\r${colors.blue}↑${colors.reset} 上传中: ${relativePath}`);

      const { success, error } = await uploadFile(client, file, remotePath, {
        contentType,
        cacheControl
      });

      if (success) {
        successCount++;
      } else {
        failCount++;
        log.error(`上传失败: ${relativePath} - ${error.message}`);
      }
    }

    console.log(''); // 换行

    if (failCount > 0) {
      log.warn(`部署完成，成功 ${successCount} 个，失败 ${failCount} 个`);
    } else {
      log.success(`部署成功！共上传 ${successCount} 个文件`);
    }

    // 显示访问地址
    const protocol = 'https';
    let accessUrl;

    if (config.cdnDomain) {
      accessUrl = `${protocol}://${config.cdnDomain}`;
      log.success(`CDN 访问地址: ${accessUrl}`);
    } else {
      accessUrl = `${protocol}://${config.bucket}.${config.region}.aliyuncs.com`;
      log.success(`OSS 访问地址: ${accessUrl}`);
    }

    // 清理 CDN 缓存提示
    if (config.cdnDomain) {
      log.info('提示: 如需刷新 CDN 缓存，请前往阿里云 CDN 控制台或使用 CDN SDK');
    }
  } catch (error) {
    log.error(`部署失败: ${error.message}`);
    process.exit(1);
  }
}

// 运行部署
deploy();
