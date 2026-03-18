import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { ProfileProvider } from '@/contexts/ProfileContext';

/**
 * 应用主组件
 * 使用 RouterProvider 来管理路由
 */
function App() {
  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  );
}

export default App;
