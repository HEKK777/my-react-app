#!/usr/bin/env node

/**
 * OSS 配置检查脚本
 * 用于验证 OSS 配置是否正确
 */

import fs from 'fs';
import path from 'path';
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
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}?${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}?${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}?${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}?${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

function checkConfig() {
  log.title('OSS 配置检查');

  const configPath = path.join(process.cwd(), 'oss.config.json');

  // 检查配置文件是否存在
  if (!fs.existsSync(configPath)) {
    log.error('配置文件不存在: oss.config.json');
    log.info('请先创建配置文件，参考 oss.config.json 的格式');
    return false;
  }

  log.success('配置文件存在 ✓');

  // 读取配置
  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (error) {
    log.error('配置文件格式错误: ' + error.message);
    return false;
  }

  log.success('配置文件格式正确 ✓');

  // 检查必需字段
  const requiredFields = ['region', 'bucket', 'accessKeyId', 'accessKeySecret'];
  let allFieldsPresent = true;

  log.title('必需字段检查');

  for (const field of requiredFields) {
    const value = config[field];
    const isPlaceholder = value === 'YOUR_ACCESS_KEY_ID' ||
                          value === 'YOUR_ACCESS_KEY_SECRET' ||
                          !value || value === '';

    if (isPlaceholder) {
      log.warn(`${field}: 未配置（使用占位符或为空）`);
      allFieldsPresent = false;
    } else {
      log.success(`${field}: ${field === 'accessKeySecret' ? '***' : value} ✓`);
    }
  }

  // 显示配置信息
  log.title('配置信息');

  console.log(`${colors.cyan}区域：${colors.reset}${config.region}`);
  console.log(`${colors.cyan}存储桶：${colors.reset}${config.bucket}`);
  console.log(`${colors.cyan}上传路径：${colors.reset}${config.uploadPath || '(根目录)'}`);
  console.log(`${colors.cyan}排除文件：${colors.reset}${config.exclude?.join(', ') || '无'}`);

  // 检查 dist 目录
  log.title('构建目录检查');

  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    log.warn('dist 目录不存在，请先运行 npm run build');
    return false;
  }

  log.success('dist 目录存在 ✓');

  // 检查 index.html
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    log.error('index.html 不存在');
    return false;
  }

  log.success('index.html 存在 ✓');

  // 检查 assets 目录
  const assetsPath = path.join(distPath, 'assets');
  if (!fs.existsSync(assetsPath)) {
    log.warn('assets 目录不存在');
  } else {
    const assetFiles = fs.readdirSync(assetsPath);
    log.success(`assets 目录存在 (${assetFiles.length} 个文件) ✓`);
  }

  // 显示访问地址
  log.title('访问地址');

  const protocol = 'https';

  if (config.cdnDomain) {
    console.log(`${colors.green}CDN 地址：${colors.reset}${protocol}://${config.cdnDomain}`);
  }

  console.log(`${colors.green}OSS 域名：${colors.reset}${protocol}://${config.bucket}.${config.region}.aliyuncs.com`);
  console.log(`${colors.yellow}静态网站端点：${colors.reset}http://${config.bucket}.${config.region}.aliyuncs.com`);

  // 检查清单
  log.title('部署前检查清单');

  const checklist = [
    { text: '已配置 OSS AccessKey', checked: allFieldsPresent },
    { text: '已构建项目 (npm run build)', checked: fs.existsSync(indexPath) },
    { text: 'Bucket 读写权限设为公共读', checked: false, manual: true },
    { text: '已开启静态网站托管', checked: false, manual: true },
    { text: '默认首页设为 index.html', checked: false, manual: true },
    { text: '默认 404 页设为 index.html', checked: false, manual: true }
  ];

  checklist.forEach(item => {
    const icon = item.manual ? '○' : (item.checked ? '✓' : '✗');
    const color = item.manual ? colors.yellow : (item.checked ? colors.green : colors.red);
    const prefix = item.manual ? '[需手动检查] ' : '';

    console.log(`  ${color}${icon}${colors.reset} ${prefix}${item.text}`);
  });

  // 提示信息
  log.title('下一步操作');

  if (!allFieldsPresent) {
    console.log(`1. 在 oss.config.json 中配置正确的 AccessKey`);
    console.log(`   或使用环境变量: OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET`);
    console.log(`\n2. 运行部署命令:`);
    console.log(`   ${colors.cyan}npm run deploy:oss:build${colors.reset}`);
  } else {
    console.log(`1. 确保已完成上述手动检查项`);
    console.log(`\n2. 运行部署命令:`);
    console.log(`   ${colors.cyan}npm run deploy:oss:build${colors.reset}`);
  }

  console.log(`\n3. 部署完成后，访问静态网站端点验证`);

  return true;
}

// 运行检查
checkConfig();
