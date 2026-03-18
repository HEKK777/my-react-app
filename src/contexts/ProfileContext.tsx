import { createContext, useContext, ReactNode, useMemo } from 'react';
import { UserProfile } from '@/types';
import { mockUserProfile } from '@/data/mockData';

interface ProfileContextType {
  profile: UserProfile;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = useMemo(() => ({
    profile: mockUserProfile,
  }), []);

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
