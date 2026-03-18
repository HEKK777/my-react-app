import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { UserProfile, Education } from '@/types';
import { mockUserProfile } from '@/data/mockData';

const PROFILE_STORAGE_KEY = 'userProfile';
const DATA_VERSION_KEY = 'profileDataVersion';
const CURRENT_DATA_VERSION = '2.0';

// 保存个人资料到 localStorage
const saveProfile = (profile: UserProfile) => {
  if (typeof window === 'undefined') return;

  try {
    const profileToSave = {
      ...profile,
      education: Array.isArray(profile.education) ? profile.education : [],
      honors: Array.isArray(profile.honors) ? profile.honors : [],
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileToSave));
  } catch (error) {
    console.error('保存个人资料失败:', error);
  }
};

// 迁移单个教育经历数据
const migrateEducation = (edu: any): Education => ({
  school: edu.school || '',
  major: edu.major || '',
  degree: edu.degree || '',
  period: edu.period || '',
  gpa: edu.gpa,
  courses: edu.courses,
  achievements: edu.achievements,
});

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window === 'undefined') return mockUserProfile;

    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      const storedVersion = localStorage.getItem(DATA_VERSION_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        // 智能迁移：保留用户数据，只添加缺失的新字段
        const result: UserProfile = {
          ...parsed,
          education: Array.isArray(parsed.education) ? parsed.education.map(migrateEducation) : [],
          honors: Array.isArray(parsed.honors) ? parsed.honors : [],
          socialLinks: parsed.socialLinks || { email: '', github: '' },
        };

        // 版本更新处理
        if (storedVersion !== CURRENT_DATA_VERSION) {
          console.log('数据结构已更新，保留了你的个人数据');
          localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
          saveProfile(result);
        }

        // 旧版本数据检测
        if (result.education.length === 0 && parsed.name === 'HEKK') {
          return mockUserProfile;
        }

        return result;
      }

      localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
    } catch (error) {
      console.error('初始化时读取 localStorage 失败:', error);
    }

    return mockUserProfile;
  });

  const updateProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(mockUserProfile);
    saveProfile(mockUserProfile);
  }, []);

  const contextValue = useMemo(() => ({
    profile,
    updateProfile,
    resetProfile
  }), [profile, updateProfile, resetProfile]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
