import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * 应用入口文件
 *
 * 负责渲染 React 应用到 DOM 根节点
 * 使用 React 18 的 createRoot API 进行渲染
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)