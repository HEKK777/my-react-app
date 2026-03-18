import { Hero } from '@/components/Hero';
import { GalleryGrid } from '@/components/GalleryGrid';
import { mockArtworks, sortArtworks } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * 首页特色功能项配置
 */
const FEATURE_ITEMS = [
  {
    icon: '🎨',
    title: 'AI图像生成',
    description: '使ComfyUI、Stable Diffusion等工具创作独特视觉作品'
  },
  {
    icon: '🎬',
    title: 'AI视频创作',
    description: '运用即梦、LiblibAI等工具生成视频动态视觉艺术'
  },
  {
    icon: '✨',
    title: '后期处理',
    description: '使用高清修复，结合传统工具进行精修'
  }
];

/**
 * 首页组件
 *
 * 展示网站的首页内容，包括：
 * - Hero 区域（主视觉区）
 * - 精选作品展示（前 6 个作品）
 * - 特色功能介绍
 *
 * @returns 首页组件
 */
export const Home = () => {
  // 应用排序：图片在前，视频在后，各自按ID数字排序
  const sortedArtworks = sortArtworks(mockArtworks);
  // 取前 6 个作品作为精选展示
  const featuredArtworks = sortedArtworks.slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero 主视觉区 */}
      <Hero />

      {/* 精选作品区域 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">精选作品</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              探索我最新的AI创作作品
            </p>
          </div>

          <GalleryGrid artworks={featuredArtworks} type="all" />

          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 group">
                查看全部作品
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 特色功能介绍区域 */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {FEATURE_ITEMS.map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
