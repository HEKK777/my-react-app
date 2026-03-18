import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import appdevDesignMode from '@xagi/vite-plugin-design-mode';

// https://vitejs.dev/config/
export default defineConfig({
  // 使用相对路径，确保在 GitHub Pages 等子路径部署时资源能正确加载
  base: './',
  plugins: [
    
  // <!-- DEV-INJECT-START -->
  {
    name: 'dev-inject',
    enforce: 'post', // 确保在 HTML 注入阶段最后执行
    transformIndexHtml(html, { path }) {
      // 只在开发环境注入，避免生产环境出现 404 错误
      if (!html.includes('data-id="dev-inject-monitor"') && process.env.NODE_ENV !== 'production') {
        return html.replace("</head>", `
    <script data-id="dev-inject-monitor">
      (function() {
        const remote = "./sdk/dev-monitor.js";
        const separator = remote.includes('?') ? '&' : '?';
        const script = document.createElement('script');
        script.src = remote + separator + 't=' + Date.now();
        script.dataset.id = 'dev-inject-monitor-script';
        script.defer = true;
        script.onerror = function() {
          // 静默处理加载失败，避免阻塞页面
          console.debug('Dev monitor script not available');
        };
        // 防止重复注入
        if (!document.querySelector('[data-id="dev-inject-monitor-script"]')) {
          document.head.appendChild(script);
        }
      })();
    </script>
  \n</head>`);
      }
      return html;
    }
  },
  // <!-- DEV-INJECT-END -->
  
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
