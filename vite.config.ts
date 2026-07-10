import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 项目页子路径部署需要此 base（仓库名 gate-website → /gate-website/）
  // 若改用自定义域名或 用户名.github.io 根路径仓库，请删除此行
  base: '/gate-website/',
});
