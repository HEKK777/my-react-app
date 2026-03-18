import { Heart, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { useMemo } from 'react';

const QUICK_LINKS = [
  { to: '/', label: '首页' },
  { to: '/gallery', label: '作品画廊' },
  { to: '/about', label: '关于我' }
] as const;

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const profile = useProfile().profile;

  const socialLinks = useMemo(() => ({
    email: profile?.socialLinks?.email || '',
    github: profile?.socialLinks?.github || ''
  }), [profile?.socialLinks?.email, profile?.socialLinks?.github]);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-bold text-xl">AI</span>
              </div>
              <span className="text-gray-900 dark:text-gray-100 font-semibold text-lg">艺术作品集</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              探索人工智能与艺术的无限可能
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">社交媒体</h3>
            <div className="flex space-x-4">
              <a
                href={`mailto:${socialLinks.email}`}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                title="邮箱"
              >
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {CURRENT_YEAR} AI艺术作品集. 保留所有权利.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
            用 <Heart className="w-4 h-4 fill-gray-900 dark:fill-gray-100 text-gray-900 dark:text-gray-100" /> 和 AI 制作
          </p>
        </div>
      </div>
    </footer>
  );
};
