# AI 艺术作品集

一个展示 AI 生成艺术作品的现代化 Web 应用，使用 React + Vite + TypeScript 构建。

## 项目简介

这是一个专为 AI 艺术创作者设计的作品集展示平台，支持展示图片和视频作品，并提供丰富的交互体验。

### 主要功能

- 🎨 **作品画廊** - 以网格布局展示所有 AI 创作作品
- 🎬 **视频展示** - 支持视频作品的播放和查看
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔍 **作品详情** - 点击查看作品的详细信息、技术栈和生成提示词
- 🌓 **暗黑模式** - 支持亮色/暗色主题切换
- 🏷️ **标签筛选** - 支持按作品类型（全部/图片/视频）筛选

### 技术亮点

- ⚡️ **Vite 构建** - 极速的开发体验和构建速度
- 🎯 **TypeScript** - 完整的类型安全保障
- 🎨 **Radix UI** - 高质量的 UI 组件库
- 🪨 **React Router** - 使用 Hash 模式路由，支持静态部署
- 💅 **Tailwind CSS** - 实用优先的 CSS 框架
- 🎭 **Lucide Icons** - 精美的图标库

## 项目结构

```
src/
├── App.tsx              # 应用主组件
├── main.tsx             # 应用入口
├── index.css            # 全局样式
├── components/          # 可复用组件
│   ├── ui/             # UI 基础组件
│   ├── Navbar.tsx      # 导航栏组件
│   ├── Footer.tsx      # 页脚组件
│   ├── Hero.tsx        # 首页英雄区
│   ├── GalleryGrid.tsx # 作品网格组件
│   └── AboutSection.tsx # 关于页面组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Gallery.tsx     # 画廊页
│   ├── Videos.tsx      # 视频页
│   └── About.tsx       # 关于页
├── router/             # 路由配置
│   └── index.tsx       # 路由定义（Hash 模式）
├── contexts/           # React Context
│   └── ProfileContext.tsx # 用户资料上下文
├── data/               # 模拟数据
│   └── mockData.ts     # 作品和用户数据
├── types/              # TypeScript 类型定义
│   └── index.ts        # 类型接口
└── lib/                # 工具函数
    └── utils.ts        # 通用工具
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm（推荐）、npm 或 yarn

### 安装依赖

```bash
pnpm install
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

## 部署

### Vercel 部署

本项目已配置 `vercel.json`，可直接部署到 Vercel：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他静态托管

由于使用 Hash 路由模式，本项目可以部署到任何静态文件托管服务，无需特殊服务器配置。

## 自定义内容

### 修改作品数据

编辑 `src/data/mockData.ts` 文件：

```typescript
export const mockArtworks: Artwork[] = [
  {
    id: 'image-1',
    title: '作品标题',
    description: '作品描述',
    type: 'image', // 或 'video'
    url: 'https://example.com/image.jpg',
    thumbnail: 'https://example.com/thumb.jpg',
    createdAt: '2024-03-19',
    tags: ['标签1', '标签2'],
    techniques: ['技术1', '技术2'],
    prompt: 'AI 生成提示词'
  },
  // 添加更多作品...
];
```

### 修改个人信息

编辑 `src/data/mockData.ts` 中的 `mockUserProfile` 对象。

## 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm preview` - 预览生产构建
- `pnpm lint` - 运行 ESLint 检查
- `pnpm format` - 格式化代码（Prettier）

## 技术栈

- **框架**: React 18
- **构建工具**: Vite 5
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 3
- **UI 组件**: Radix UI
- **路由**: React Router v7 (Hash 模式)
- **图标**: Lucide React
- **代码规范**: ESLint + Prettier

## 浏览器支持

- Chrome/Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 移动端浏览器

## 许可证

MIT License

## 作者

AI 艺术创作者
