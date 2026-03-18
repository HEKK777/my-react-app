import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import appdevDesignMode from '@xagi/vite-plugin-design-mode';

// https://vitejs.dev/config/
export default defineConfig({
  // 使用相对路径，确保在 GitHub Pages 等子路径部署时资源能正确加载
  base: './',
  plugins: [
    react(),
    appdevDesignMode()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 确保公共目录下的静态资源能正确访问
  publicDir: 'public',
  server: {
    // 开发服务器配置
    port: 5173,
    strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
    host: true,
    // 防止端口占用错误
    watch: {
      usePolling: true,
    },
  },
  build: {
    // 构建配置
    assetsDir: 'assets',
    sourcemap: false,
  }
});
