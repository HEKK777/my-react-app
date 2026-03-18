import { createHashRouter, Link } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Gallery } from '@/pages/Gallery';
import { Videos } from '@/pages/Videos';
import { About } from '@/pages/About';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * 布局组件 - 包含导航栏和页脚
 */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

/**
 * 404 页面组件
 * 当访问不存在的路由时显示
 */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-full mb-6">
          <span className="text-4xl">🔮</span>
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white/70 mb-2">页面未找到</p>
        <p className="text-sm text-white/60 mb-8">
          抱歉，您访问的页面不存在或已被移动
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

/**
 * 路由配置
 * 使用 HashRouter（hash 模式）
 * 路由路径格式：/#/gallery, #/videos 等
 *
 * Hash 模式的优点：
 * - 不需要服务器配置，可以在任何路径下部署
 * - URL 中的 hash 部分不会发送到服务器
 * - 适合静态部署和 CDN 部署
 */
export const router = createHashRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/gallery',
    element: <Layout><Gallery /></Layout>,
  },
  {
    path: '/videos',
    element: <Layout><Videos /></Layout>,
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
]);
