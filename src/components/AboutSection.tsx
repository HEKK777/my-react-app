import { UserProfile } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, MessageCircle } from 'lucide-react';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection = ({ profile }: AboutSectionProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-gray-200 dark:ring-gray-800">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{profile.name}</h1>
                  {/* Gender and Age */}
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    {profile.gender && (
                      <span className="text-sm">{profile.gender}</span>
                    )}
                    {profile.gender && profile.age && (
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                    )}
                    {profile.age && (
                      <span className="text-sm">{profile.age}岁</span>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                {profile.phone && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm">WeChat</span>
                    </div>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">📞</span>
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
                    <a href={`mailto:${profile.socialLinks.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      邮箱
                    </a>
                  </Button>
                  {profile.socialLinks.github && (
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
                      <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 教育经历 */}
        {profile.education && profile.education.length > 0 && (
          <Card className="mt-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">教育经历</h2>
              <div className="space-y-6">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-6 last:pb-0 last:border-0">
                    {/* 学校名称 */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {edu.school}
                    </h3>

                    {/* 学位、专业、时间 */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span>{edu.degree}</span>
                        <span className="text-gray-400">·</span>
                        <span>{edu.major}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</span>
                    </div>

                    {/* 绩点 */}
                    {edu.gpa && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">绩点:</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{edu.gpa}</span>
                      </div>
                    )}

                    {/* 主修课程 */}
                    {edu.courses && edu.courses.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">相关课程:</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {edu.courses.join('、')}
                        </span>
                      </div>
                    )}

                    {/* 学术成就 */}
                    {edu.achievements && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">学术成就:</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {edu.achievements}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 个人技术 */}
        <Card className="mt-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">个人技术</h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
              {profile.bio.split(/。|\n/).filter((item) => {
                // 过滤空字符串和最后一个空元素
                return item.trim().length > 0;
              }).map((item, index) => (
                <p key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="flex-1 pt-0.5">{item.trim()}。</span>
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 专业技能 */}
        {profile.skills && profile.skills.length > 0 && (
          <Card className="mt-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">专业技能</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 个人优势 */}
        {profile.advantages && profile.advantages.trim().length > 0 && (
          <Card className="mt-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">个人优势</h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                {profile.advantages.split(/。|\n/).filter((item) => {
                  return item.trim().length > 0;
                }).map((item, index) => (
                  <p key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="flex-1 pt-0.5">{item.trim()}。</span>
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 荣誉奖项 */}
        {profile.honors && profile.honors.length > 0 && (
          <Card className="mt-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">荣誉奖项</h2>
              <div className="space-y-4">
                {profile.honors.map((honor, index) => (
                  <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-4 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{honor.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{honor.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{honor.issuer}</p>
                    {honor.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{honor.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Seeking Info */}
        <Card className="mt-8 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">求职意向</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  我正在寻找AI生图师、AI产品视频生成方向、AI动画师、ComfyUI工程师、AI内容创作等相关职位。欢迎随时联系我讨论！
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
