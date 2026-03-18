import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { ProfileProvider } from '@/contexts/ProfileContext';

/**
 * 应用主组件
 *
 * 作为应用的根组件，负责包裹全局状态管理（ProfileProvider）
 * 并提供路由功能（RouterProvider）
 *
 * @component
 * @example
 * ```tsx
 * <App />
 * ```
 */
function App() {
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  );
}

export default App;
