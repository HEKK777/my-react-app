import { AboutSection } from '@/components/AboutSection';
import { useProfile } from '@/contexts/ProfileContext';

export const About = () => {
  const { profile } = useProfile();

  return (
    <div className="min-h-screen pt-24">
      <AboutSection profile={profile} />
    </div>
  );
};

export default About;
