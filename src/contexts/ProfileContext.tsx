import { createContext, useContext, ReactNode, useMemo } from 'react';
import { UserProfile } from '@/types';
import { mockUserProfile } from '@/data/mockData';

/**
 * 用户资料上下文类型定义
 */
interface ProfileContextType {
  /** 用户个人资料数据 */
  profile: UserProfile;
}

/**
 * 用户资料上下文
 *
 * 用于在应用中共享用户个人资料数据
 * 所有需要访问用户信息的组件都可以通过 useProfile hook 获取
 */
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * 用户资料提供者组件
 *
 * 为应用提供用户资料数据，使用固定的 mockUserProfile 作为数据源
 *
 * @param children - 子组件
 * @returns 包含用户资料上下文的组件
 *
 * @example
 * ```tsx
 * <ProfileProvider>
 *   <App />
 * </ProfileProvider>
 * ```
 */
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  // 使用 useMemo 缓存上下文值，避免不必要的重新渲染
  const contextValue = useMemo(() => ({
    profile: mockUserProfile,
  }), []);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

/**
 * 获取用户资料的 Hook
 *
 * 用于在组件中获取用户个人资料数据
 * 必须在 ProfileProvider 内部使用
 *
 * @returns 用户资料上下文值
 * @throws 如果在 ProfileProvider 外部使用会抛出错误
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { profile } = useProfile();
 *   return <div>{profile.name}</div>;
 * }
 * ```
 */
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
