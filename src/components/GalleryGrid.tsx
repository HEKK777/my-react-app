import { useState } from 'react';
import { Artwork } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Play, Eye, ChevronLeft, ChevronRight, ImageOff, Film, Image as ImageIcon, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryGridProps {
  artworks: Artwork[];
  type: 'image' | 'video' | 'all';
}

// 卡芙拉作品集的特殊描述
const KAFKA_DESCRIPTIONS = {
  generation: '使用Flux.1基础模型配合卡芙卡Lora生成的角色展示图，展现了卡芙卡在不同场景和姿态下的魅力。图片风格高度还原原作角色特征，包括发型、服装、表情等细节，体现了Lora模型在角色生成方面的优秀效果',
  training: '基于Flux.1基础模型为基底，训练的崩坏：星穹铁道卡芙卡角色形象Lora模型，在以Flux.1为大模型使用下配合该Lora可直接生成的卡芙卡外貌风格，不需过多的提示词描述，效果优良。'
};

// 卡芙拉模型训练图片的描述
const KAFKA_TRAINING_IMAGE_LABELS = [
  '角色原型图',
  '参数配置',
  '训练数据集',
  '训练结果'
];

// 香水广告的特殊标识
const isPerfumeAdArtwork = (artwork: Artwork) => {
  return artwork.id === 'video-2';
};

// 圣骑士AI动画短片的特殊标识
const isPaladinArtwork = (artwork: Artwork) => {
  return artwork.id === 'video-1';
};

export const GalleryGrid = ({ artworks, type }: GalleryGridProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'video' | 'images' | 'storyboard'>('video');
  // 卡芙拉作品集的特殊状态
  const [kafkaDisplayMode, setKafkaDisplayMode] = useState<'generation' | 'training'>('generation');
  // 提示词弹窗状态
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);

  const filteredArtworks = artworks.filter(artwork =>
    type === 'all' ? true : artwork.type === type
  );

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const isImageError = (imageUrl: string) => {
    return imageErrors.has(imageUrl);
  };

  // 重置视图模式当选择新作品时
  const handleCardClick = (artwork: Artwork) => {
    setCurrentImageIndex(0);
    // 圣骑士作品集默认播放视频
    if (isPaladinArtwork(artwork)) {
      setViewMode('video');
    } else if (isPerfumeAdArtwork(artwork)) {
      // 香水广告默认播放视频
      setViewMode('video');
    } else {
      setViewMode('video');
    }
    // 如果是卡芙拉作品集，重置到生图模式
    if (artwork.id === 'image-5') {
      setKafkaDisplayMode('generation');
    }
    // 如果是新视频作品且有图片，默认切换到图片模式
    if (artwork.id === 'video-3' && artwork.images && artwork.images.length > 0) {
      setViewMode('images');
    }
  };

  // 检查是否为卡芙拉作品集
  const isKafkaArtwork = (artwork: Artwork) => {
    return artwork.id === 'image-5';
  };

  // 获取作品的主图或第一张图片
  const getMainImage = (artwork: Artwork) => {
    if (artwork.images && artwork.images.length > 0) {
      return artwork.images[0];
    }
    return { url: artwork.url || '', thumbnail: artwork.thumbnail };
  };

  // 获取作品的所有图片（卡芙拉作品集会根据模式返回不同的图片组）
  const getArtworkImages = (artwork: Artwork) => {
    if (artwork.images && artwork.images.length > 0) {
      if (isKafkaArtwork(artwork)) {
        // 卡芙拉作品集：根据模式返回不同的图片组
        if (kafkaDisplayMode === 'generation') {
          // 前9张：模型生图
          return artwork.images.slice(0, 9);
        } else {
          // 后4张：模型训练
          return artwork.images.slice(9);
        }
      }
      return artwork.images;
    }
    return artwork.url ? [{ url: artwork.url, thumbnail: artwork.thumbnail }] : [];
  };

  // 获取当前显示的描述文本
  const getDisplayDescription = (artwork: Artwork) => {
    if (isKafkaArtwork(artwork)) {
      return kafkaDisplayMode === 'generation' ? KAFKA_DESCRIPTIONS.generation : KAFKA_DESCRIPTIONS.training;
    }
    return artwork.description;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => {
          const mainImage = getMainImage(artwork);
          const artworkImages = getArtworkImages(artwork);
          const hasMultipleImages = artworkImages.length > 1;

          return (
            <Dialog key={artwork.id}>
              <DialogTrigger asChild>
                <Card
                  className="group cursor-pointer overflow-hidden bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300 hover:shadow-xl"
                  onClick={() => handleCardClick(artwork)}
                >
                  <CardContent className="p-0">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      {isImageError(mainImage.thumbnail || mainImage.url) ? (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                          <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-500">图片加载失败</p>
                        </div>
                      ) : (
                        <img
                          src={mainImage.thumbnail || mainImage.url}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={() => handleImageError(mainImage.thumbnail || mainImage.url)}
                        />
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Type badge */}
                      <div className="absolute top-3 right-3">
                        <Badge variant={artwork.type === 'video' ? 'default' : 'secondary'} className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900">
                          {artwork.type === 'video' ? (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              视频
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3 mr-1" />
                              {hasMultipleImages ? `${artworkImages.length}张图片` : '图片'}
                            </>
                          )}
                        </Badge>
                      </div>
                      {/* Multi-image indicator */}
                      {hasMultipleImages && (
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                            {artworkImages.length} 张图片
                          </Badge>
                        </div>
                      )}
                      {/* View indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-full p-3">
                          {artwork.type === 'video' ? (
                            <Play className="w-8 h-8 text-white dark:text-gray-100 fill-white dark:fill-gray-100" />
                          ) : (
                            <Eye className="w-8 h-8 text-white dark:text-gray-100" />
                          )}
                        </div>
                      </div>
                    </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {artwork.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {artwork.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            {/* Full view dialog */}
            <DialogContent className="max-w-6xl w-[95vw] h-[90vh] overflow-hidden bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 p-0">
              <DialogTitle className="sr-only">{artwork.title}</DialogTitle>
              <DialogDescription className="sr-only">{artwork.description}</DialogDescription>
              <div className="h-full flex flex-col overflow-hidden">
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
                  <div className="space-y-3">
                    {/* Media */}
                    {/* 香水广告的图片查看模式 - 左右布局 */}
                    {artwork.type === 'video' && viewMode === 'images' && isPerfumeAdArtwork(artwork) ? (
                      <div className="flex gap-4 flex-shrink-0">
                        {/* 左侧：图片区域 */}
                        <div className="flex-1 relative aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                          {/* 视图模式切换按钮 */}
                          <div className="absolute top-2 left-2 z-10 flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7"
                              onClick={() => setViewMode('video')}
                            >
                              <Film className="w-3 h-3 mr-1" />
                              播放视频
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7"
                              onClick={() => setViewMode('images')}
                            >
                              <ImageIcon className="w-3 h-3 mr-1" />
                              查看图片
                            </Button>
                          </div>

                          {/* 导航按钮 */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 w-8 h-8"
                            onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : artworkImages.length - 1))}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 w-8 h-8"
                            onClick={() => setCurrentImageIndex((prev) => (prev < artworkImages.length - 1 ? prev + 1 : 0))}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>

                          {/* 图片显示 */}
                          {isImageError(artworkImages[currentImageIndex]?.url) ? (
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                              <ImageOff className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-3" />
                              <p className="text-gray-500 dark:text-gray-500">图片加载失败</p>
                            </div>
                          ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={artworkImages[currentImageIndex]?.url}
                                alt={`${artwork.title} - ${currentImageIndex + 1}/${artworkImages.length}`}
                                className="max-w-full max-h-full object-contain"
                                onError={() => handleImageError(artworkImages[currentImageIndex]?.url)}
                              />
                              {/* 图片计数器 */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs">
                                {currentImageIndex + 1} / {artworkImages.length}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 右侧：提示词区域 */}
                        <div className="w-80 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col">
                          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              生成提示词
                            </h4>
                          </div>
                          <div className="flex-1 p-4 overflow-y-auto">
                            {artworkImages[currentImageIndex]?.prompt ? (
                              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {artworkImages[currentImageIndex].prompt}
                              </div>
                            ) : artwork.prompt ? (
                              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {artwork.prompt}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 dark:text-gray-500">
                                暂无提示词
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : artwork.type === 'video' && viewMode === 'images' && hasMultipleImages ? (
                      /* 视频图片模式：像图片作品集一样显示多张图片 */
                      <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        {/* 视图模式切换按钮 */}
                        <div className="absolute top-2 left-2 z-10 flex gap-1">
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7"
                            onClick={() => setViewMode('images')}
                          >
                            <ImageIcon className="w-3 h-3 mr-1" />
                            查看图片
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7"
                            onClick={() => setViewMode('video')}
                          >
                            <Film className="w-3 h-3 mr-1" />
                            播放视频
                          </Button>
                        </div>

                        {/* 导航按钮 */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 w-8 h-8"
                          onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : artworkImages.length - 1))}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 w-8 h-8"
                          onClick={() => setCurrentImageIndex((prev) => (prev < artworkImages.length - 1 ? prev + 1 : 0))}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>

                        {/* 图片显示 */}
                        {isImageError(artworkImages[currentImageIndex]?.url) ? (
                          <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                            <ImageOff className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-3" />
                            <p className="text-gray-500 dark:text-gray-500">图片加载失败</p>
                          </div>
                        ) : (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              src={artworkImages[currentImageIndex]?.url}
                              alt={`${artwork.title} - ${currentImageIndex + 1}/${artworkImages.length}`}
                              className="max-w-full max-h-full object-contain"
                              onError={() => handleImageError(artworkImages[currentImageIndex]?.url)}
                            />
                            {/* 提示词显示 - 右下角 */}
                            {(artworkImages[currentImageIndex]?.prompt || artwork.prompt) && (
                              <div className="absolute bottom-2 right-2 z-10">
                                <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
                                  <DialogTrigger asChild>
                                    <button
                                      className="bg-white dark:bg-gray-900 rounded-full p-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-lg"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPromptDialogOpen(true);
                                      }}
                                    >
                                      <Eye className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg w-[95vw] bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">生成提示词</DialogTitle>
                                    <DialogDescription asChild>
                                      <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto leading-relaxed">
                                        {artworkImages[currentImageIndex]?.prompt || artwork.prompt}
                                      </div>
                                    </DialogDescription>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )}
                            {/* 图片计数器 */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs">
                              {currentImageIndex + 1} / {artworkImages.length}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : artwork.type === 'video' && viewMode === 'video' ? (
                      /* 视频播放模式 */
                      <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        {/* 视图模式切换按钮 */}
                        {/* 圣骑士作品集：三个按钮 */}
                        {isPaladinArtwork(artwork) ? (
                          <div className="absolute top-2 left-2 z-10 flex gap-1">
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7"
                              onClick={() => setViewMode('video')}
                            >
                              <Film className="w-3 h-3 mr-1" />
                              播放视频
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7"
                              onClick={() => setViewMode('storyboard')}
                            >
                              <Layers className="w-3 h-3 mr-1" />
                              查看分镜
                            </Button>
                          </div>
                        ) : /* 香水广告：两个按钮 */
                        hasMultipleImages && (
                          <div className="absolute top-2 left-2 z-10 flex gap-1">
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7"
                              onClick={() => setViewMode('video')}
                            >
                              <Film className="w-3 h-3 mr-1" />
                              播放视频
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7"
                              onClick={() => setViewMode('images')}
                            >
                              <ImageIcon className="w-3 h-3 mr-1" />
                              查看图片
                            </Button>
                          </div>
                        )}
                        <video
                          src={artwork.url}
                          controls
                          className="w-full h-full object-contain"
                          autoPlay
                        />
                      </div>
                    ) : artwork.type === 'video' && viewMode === 'storyboard' ? (
                      /* 分镜模式 - 圣骑士AI动画短片 */
                      <div className="relative w-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                        {/* 视图模式切换按钮 */}
                        <div className="absolute top-2 left-2 z-20 flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7"
                            onClick={() => setViewMode('video')}
                          >
                            <Film className="w-3 h-3 mr-1" />
                            播放视频
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7"
                            onClick={() => setViewMode('storyboard')}
                          >
                            <Layers className="w-3 h-3 mr-1" />
                            查看分镜
                          </Button>
                        </div>

                        {/* 分镜脚本文本 */}
                        <div className="w-full h-full bg-white dark:bg-gray-950 p-6 overflow-y-auto">
                          <div className="max-w-4xl mx-auto mt-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                              分镜脚本
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                              <div className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {artwork.storyboardPrompt || artwork.prompt || '暂无分镜脚本'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* 图片作品：保持原有布局 */
                      <>
                        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                          {/* 卡芙拉作品集的特殊切换按钮 */}
                          {isKafkaArtwork(artwork) && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
                              <Button
                                size="sm"
                                variant={kafkaDisplayMode === 'generation' ? 'default' : 'outline'}
                                className={kafkaDisplayMode === 'generation' ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7' : 'bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7'}
                                onClick={() => {
                                  setKafkaDisplayMode('generation');
                                  setCurrentImageIndex(0);
                                }}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                模型生图
                              </Button>
                              <Button
                                size="sm"
                                variant={kafkaDisplayMode === 'training' ? 'default' : 'outline'}
                                className={kafkaDisplayMode === 'training' ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 h-7' : 'bg-white/80 dark:bg-gray-900/80 text-xs px-2 py-1 h-7'}
                                onClick={() => {
                                  setKafkaDisplayMode('training');
                                  setCurrentImageIndex(0);
                                }}
                              >
                                <Film className="w-3 h-3 mr-1" />
                                模型训练
                              </Button>
                            </div>
                          )}
                          {hasMultipleImages && artworkImages.length > 1 && (
                            <>
                              {/* Navigation buttons */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 w-8 h-8"
                                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : artworkImages.length - 1))}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 w-8 h-8"
                                onClick={() => setCurrentImageIndex((prev) => (prev < artworkImages.length - 1 ? prev + 1 : 0))}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {isImageError(artworkImages[currentImageIndex]?.url) ? (
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                              <ImageOff className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-3" />
                              <p className="text-gray-500 dark:text-gray-500">图片加载失败</p>
                              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1 max-w-md text-center px-4">
                                URL: {artworkImages[currentImageIndex]?.url?.slice(0, 50)}...
                              </p>
                            </div>
                          ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={artworkImages[currentImageIndex]?.url}
                                alt={`${artwork.title} - ${currentImageIndex + 1}/${artworkImages.length}`}
                                className="max-w-full max-h-full object-contain"
                                onError={() => handleImageError(artworkImages[currentImageIndex]?.url)}
                              />
                              {/* 卡芙拉训练图片的左下角描述标签 */}
                              {isKafkaArtwork(artwork) && kafkaDisplayMode === 'training' && KAFKA_TRAINING_IMAGE_LABELS[currentImageIndex] && (
                                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm backdrop-blur-sm">
                                  {KAFKA_TRAINING_IMAGE_LABELS[currentImageIndex]}
                                </div>
                              )}
                              {/* Prompt indicator on image */}
                              {(artworkImages[currentImageIndex]?.prompt || artwork.prompt) && (
                                <div className="absolute bottom-2 right-2 z-10">
                                  <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
                                    <DialogTrigger asChild>
                                      <button
                                        className="bg-white dark:bg-gray-900 rounded-full p-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-lg"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPromptDialogOpen(true);
                                        }}
                                      >
                                        <Eye className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                                      </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-lg w-[95vw] bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                                      <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">生成提示词</DialogTitle>
                                      <DialogDescription asChild>
                                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto leading-relaxed">
                                          {artworkImages[currentImageIndex]?.prompt || artwork.prompt}
                                        </div>
                                      </DialogDescription>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              )}
                              {/* Image counter */}
                              {hasMultipleImages && artworkImages.length > 1 && (
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs">
                                  {currentImageIndex + 1} / {artworkImages.length}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Details */}
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{artwork.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{getDisplayDescription(artwork)}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {artwork.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">创作技术</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {artwork.techniques.map((technique) => (
                            <Badge key={technique} variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs">
                              {technique}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        创建于 {new Date(artwork.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed thumbnail strip at bottom */}
                {/* 香水广告在图片模式下不显示缩略图条，圣骑士作品集在分镜模式下不显示缩略图条 */}
                {(!isPerfumeAdArtwork(artwork) || viewMode !== 'images') && (!isPaladinArtwork(artwork) || viewMode !== 'storyboard') ? (
                  hasMultipleImages && artworkImages.length > 1 && ((artwork.type === 'image') || (artwork.type === 'video' && viewMode === 'images') || (artwork.type === 'video' && viewMode === 'storyboard' && artwork.storyboardPrompt)) && (
                    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3">
                      <div className="flex gap-2 overflow-x-auto overflow-y-visible scrollbar-hide">
                        {artworkImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex
                                ? 'border-gray-900 dark:border-gray-100 scale-105'
                                : 'border-gray-200 dark:border-gray-800 opacity-60 hover:opacity-100'
                            }`}
                          >
                            {isImageError(image.thumbnail || image.url) ? (
                              <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                                <ImageOff className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                              </div>
                            ) : (
                              <img
                                src={image.thumbnail || image.url}
                                alt={`${artwork.title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(image.thumbnail || image.url)}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            </DialogContent>
          </Dialog>
          );
        })}
      </div>
    );
  };
