import { GalleryGrid } from '@/components/GalleryGrid';
import { mockArtworks, sortArtworks } from '@/data/mockData';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

/**
 * 作品筛选类型
 */
type FilterType = 'all' | 'image' | 'video';

/**
 * 作品画廊页面
 *
 * 展示所有 AI 创作作品，支持按类型筛选：
 * - 全部作品
 * - 仅图片作品
 * - 仅视频作品
 *
 * @returns 画廊页面组件
 */
export const Gallery = () => {
  // 当前激活的筛选器
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // 应用排序：图片在前，视频在后，各自按ID数字排序
  const sortedArtworks = sortArtworks(mockArtworks);

  // 筛选器配置
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: '全部作品' },
    { type: 'image', label: '图片作品' },
    { type: 'video', label: '视频作品' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
            <Filter className="w-8 h-8 text-gray-900 dark:text-gray-100" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">作品画廊</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            这里展示了我使用各种AI工具创作的所有作品，包括图像生成和视频创作
          </p>
        </div>

        {/* 筛选按钮组 */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.type}
              variant={activeFilter === filter.type ? 'default' : 'outline'}
              className={
                activeFilter === filter.type
                  ? 'bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900'
                  : 'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
              onClick={() => setActiveFilter(filter.type)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* 作品网格展示 */}
        <GalleryGrid artworks={sortedArtworks} type={activeFilter} />
      </div>
    </div>
  );
};

export default Gallery;
