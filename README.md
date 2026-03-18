# 何建桉的 AI 艺术作品集

一个展示 AI 生成艺术作品的现代化个人作品集网站，使用 React + Vite + TypeScript 构建。

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4)

## 📖 项目简介

这是一个专为 AI 艺术创作者设计的个人作品集展示平台，展示了何建桉使用各种 AI 工具创作的艺术作品，包括图片和视频作品。

### ✨ 主要功能

- 🎨 **作品画廊** - 以网格布局展示所有 AI 创作作品，支持查看大图
- 🎬 **视频展示** - 支持视频作品的播放和查看
- 👤 **个人简介** - 展示个人信息、教育经历、技能和荣誉奖项
- 📱 **响应式设计** - 完美适配桌面端和移动端设备
- 🔍 **作品详情** - 点击查看作品的详细信息、技术栈和生成提示词
- 🌓 **暗黑模式** - 支持亮色/暗色主题切换
- 🏷️ **分类浏览** - 按作品类型（图片/视频）筛选浏览

### 🛠️ 技术亮点

- ⚡️ **Vite 构建** - 极速的开发体验和构建速度
- 🎯 **TypeScript** - 完整的类型安全保障
- 🎨 **Radix UI** - 高质量的 UI 组件库
- 🪨 **React Router** - 使用 Hash 模式路由，支持静态部署
- 💅 **Tailwind CSS** - 实用优先的 CSS 框架
- 🎭 **Lucide Icons** - 精美的图标库

## 📁 项目结构

```
src/
├── App.tsx              # 应用主组件，包含 ProfileProvider 和路由
├── main.tsx             # 应用入口文件，渲染根组件
├── index.css            # 全局样式和 Tailwind CSS 导入
├── vite-env.d.ts        # Vite 环境变量类型定义
│
├── components/          # 可复用组件
│   ├── ui/             # UI 基础组件（基于 Radix UI）
│   │   ├── badge.tsx           # 徽章组件
│   │   ├── button.tsx          # 按钮组件
│   │   ├── card.tsx            # 卡片组件
│   │   ├── dialog.tsx          # 对话框组件
│   │   ├── label.tsx           # 标签组件
│   │   └── tooltip.tsx         # 提示框组件
│   ├── Navbar.tsx      # 导航栏组件
│   ├── Footer.tsx      # 页脚组件
│   ├── Hero.tsx        # 首页英雄区组件
│   ├── GalleryGrid.tsx # 作品网格展示组件
│   └── AboutSection.tsx # 关于页面个人资料组件
│
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页（Hero + 作品预览）
│   ├── Gallery.tsx     # 图片作品画廊页
│   ├── Videos.tsx      # 视频作品展示页
│   └── About.tsx       # 关于我页面
│
├── router/             # 路由配置
│   └── index.tsx       # 路由定义（Hash 模式）
│
├── contexts/           # React Context 状态管理
│   └── ProfileContext.tsx # 用户资料上下文
│
├── data/               # 模拟数据
│   └── mockData.ts     # 作品数据和用户个人资料数据
│
├── types/              # TypeScript 类型定义
│   └── index.ts        # 项目核心类型接口
│
└── lib/                # 工具函数
    └── utils.ts        # 通用工具函数（cn 类名合并）
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm（推荐）、npm 或 yarn

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
pnpm dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 🌐 部署

### GitHub Pages 部署

本项目已配置为使用 Hash 路由模式，可直接部署到 GitHub Pages：

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 main 分支作为发布源
4. 自动部署完成

### 其他静态托管

由于使用 Hash 路由模式，本项目可以部署到任何静态文件托管服务，无需特殊服务器配置：
- Netlify
- Vercel
- Cloudflare Pages
- 阿里云 OSS
- 腾讯云 COS

## 🎨 自定义内容

### 修改作品数据

编辑 `src/data/mockData.ts` 文件中的 `mockArtworks` 数组：

```typescript
export const mockArtworks: Artwork[] = [
  {
    id: 'image-1',
    title: '作品标题',
    description: '作品描述',
    type: 'image', // 或 'video'
    images: [      // 多图展示
      {
        url: 'https://example.com/image.jpg',
        thumbnail: 'https://example.com/thumb.jpg',
        prompt: 'AI 生成提示词'
      }
    ],
    createdAt: '2024-03-19',
    tags: ['标签1', '标签2'],
    techniques: ['技术1', '技术2'],
    prompt: 'AI 生成提示词'
  },
  // 添加更多作品...
];
```

### 修改个人信息

编辑 `src/data/mockData.ts` 文件中的 `mockUserProfile` 对象：

```typescript
export const mockUserProfile: UserProfile = {
  name: '您的名字',
  bio: '个人简介',
  avatar: '头像URL',
  skills: ['技能1', '技能2'],
  advantages: '个人优势',
  education: [...],
  honors: [...],
  socialLinks: {
    email: 'your@email.com',
    github: 'https://github.com/username'
  },
  gender: '性别',
  age: 年龄,
  phone: '电话号码'
};
```

## 📜 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览生产构建 |
| `pnpm lint` | 运行 ESLint 检查 |
| `pnpm lint:fix` | 自动修复 ESLint 问题 |
| `pnpm format` | 格式化代码（Prettier） |
| `pnpm type-check` | TypeScript 类型检查 |

## 🧰 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **React** | 18.2.0 | UI 框架 |
| **Vite** | 5.4.21 | 构建工具 |
| **TypeScript** | 5.2.2 | 编程语言 |
| **Tailwind CSS** | 3.4.0 | CSS 框架 |
| **React Router** | 7.9.5 | 路由管理（Hash 模式） |
| **Radix UI** | - | UI 组件库 |
| **Lucide React** | 0.544.0 | 图标库 |
| **ESLint** | 8 | 代码检查 |
| **Prettier** | 3.0.0 | 代码格式化 |

## 🌐 浏览器支持

- Chrome/Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 移动端浏览器（iOS Safari, Chrome Mobile）

## 📄 许可证

MIT License

## 👨‍💻 作者

**何建桉**
- 📧 邮箱：hekk777@163.com
- 🐙 GitHub：[HEKK777](https://github.com/HEKK777)
- 🎓 专业：计算机科学与技术（广东海洋大学）
- 💼 擅长：AI 艺术创作、ComfyUI 工作流搭建、前端开发

---

本项目使用 React + Vite + TypeScript 构建，展示 AI 艺术作品的无限可能。
