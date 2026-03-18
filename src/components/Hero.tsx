import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { memo } from 'react';

const STATS = [
  { value: '10+', label: 'AI作品' },
  { value: '半年', label: '创作经验' },
  { value: '10+', label: 'AI工具精通' }
] as const;

export const Hero = memo(() => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoMnYyaDJ2LTJoMnYtMmgtMnYtMmgtMnYyaC0ydi0yaC0yek0wIDM0djJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYtMmgtMnYtMmgtMnYyaC0ydi0yaC0yek0wIDB2MmgydjJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYtMmgtMnYtMmgtMnYyaC0ydi0yaC0yek0zNiAwdjJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYtMmgtMnYtMmgtMnYyaC0ydi0yaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 dark:opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-gray-900 dark:text-gray-100" />
          <span className="text-gray-900 dark:text-gray-100 text-sm">AI生成艺术作品集</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          探索AI创作的
          <span className="text-gray-600 dark:text-gray-400">
            无限可能
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          这里展示了我使用人工智能工具创作的图片和视频作品
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/gallery">
            <Button size="lg" className="bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 px-8 py-6 text-lg group">
              浏览作品
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-lg">
              了解更多
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
