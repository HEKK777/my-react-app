import { AboutSection } from '@/components/AboutSection';
import { useProfile } from '@/contexts/ProfileContext';

/**
 * 关于我页面
 *
 * 展示个人详细信息的页面，包括：
 * - 基本信息（头像、姓名、性别、年龄、联系方式）
 * - 教育经历
 * - 个人技术和优势
 * - 专业技能
 * - 荣誉奖项
 * - 求职意向
 *
 * @returns 关于页面组件
 */
export const About = () => {
  // 从 ProfileContext 获取用户资料数据
  const { profile } = useProfile();

  return (
    <div className="min-h-screen pt-24">
      <AboutSection profile={profile} />
    </div>
  );
};

export default About;
