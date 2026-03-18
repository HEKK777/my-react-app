import { GalleryGrid } from '@/components/GalleryGrid';
import { mockArtworks, sortArtworks } from '@/data/mockData';
import { Video } from 'lucide-react';

/**
 * 视频创作工具列表
 */
const VIDEO_TOOLS = ['Runway Gen-2', 'Pika Labs', 'Stable Video', 'Kaiber'] as const;

/**
 * 视频作品页面
 *
 * 专门展示 AI 生成的视频作品
 * 包括作品统计、作品展示和使用的工具介绍
 *
 * @returns 视频作品页面组件
 */
export const Videos = () => {
  // 应用排序：视频作品按ID数字排序
  const sortedArtworks = sortArtworks(mockArtworks);
  // 筛选出视频类型作品
  const videoArtworks = sortedArtworks.filter(artwork => artwork.type === 'video');

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
            <Video className="w-8 h-8 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">视频作品</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            探索AI生成的动态视觉艺术，包括实验短片、音乐可视化和创意动画
          </p>
        </div>

        {/* 统计数据 */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{videoArtworks.length}</div>
            <div className="text-gray-500 dark:text-gray-500 text-sm">视频作品</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">AI</div>
            <div className="text-gray-500 dark:text-gray-500 text-sm">驱动创作</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">∞</div>
            <div className="text-gray-500 dark:text-gray-500 text-sm">创意可能</div>
          </div>
        </div>

        {/* 视频作品网格 */}
        {videoArtworks.length > 0 ? (
          <GalleryGrid artworks={videoArtworks} type="video" />
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Video className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">暂无视频作品</h3>
            <p className="text-gray-600 dark:text-gray-400">敬请期待更多精彩内容</p>
          </div>
        )}

        {/* 使用工具介绍 */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">使用工具</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VIDEO_TOOLS.map((tool) => (
              <div
                key={tool}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-gray-900 dark:text-gray-100 font-medium">{tool}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
