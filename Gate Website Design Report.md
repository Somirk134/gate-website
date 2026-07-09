# Gate Website Design Report

## 1. 页面结构

- 首页采用开源项目主页结构：Hero、可信标签、产品能力、架构说明、快速开始、真实截图、下载、开源、文档入口、更新日志、Footer。
- 导航使用页内锚点：首页、功能、文档、部署、更新日志，右侧保留 GitHub、下载、语言切换和主题切换。
- 页面默认中文，支持实时切换 English。

## 2. 组件设计

- `App.vue` 负责页面组合、主题切换、语言切换、移动端导航、截图切换和 GitHub Star 动态读取。
- 下载按钮不直接下载文件，而是打开下载源弹框，由用户选择 GitHub Releases 或 Gitee Releases。
- `content.ts` 集中维护中英文文案、功能卡片、快速开始步骤、下载状态、文档入口和更新日志。
- 产品截图使用项目已有真实截图资源：Dashboard、Tunnel、Log Center、Settings，不生成虚假 UI。

## 3. 视觉规范

- 风格关键词：现代、极简、技术感、开源感。
- 主题支持：Dark Mode 和 Light Mode。
- 主色使用 Gate 现有品牌气质中的青色，辅以绿色、琥珀色、珊瑚色，避免单一色系。
- 卡片圆角保持 8px，整体布局以清晰信息密度为主。
- 动画仅用于 Hero 背景网络节点和连接信号，支持 `prefers-reduced-motion`。

## 4. 文件结构

```text
Gateweb/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.node.json
  public/
    assets/
      branding/
      screenshots/
  src/
    App.vue
    content.ts
    main.ts
    styles.css
```

## 5. SEO 方案

- `index.html` 写入基础 title、description、keywords、Open Graph 和 favicon。
- 运行时根据当前语言更新 `document.title`、`meta description` 和 `html lang`。
- 中文 SEO：Gate、自托管、内网穿透、TCP、HTTP、HTTPS。
- 英文 SEO：Gate、self-hosted tunnel、TCP tunnel、HTTP tunnel、HTTPS tunnel。

## 6. 国际化方案

- 使用轻量内容表，不引入额外 i18n 框架，降低维护成本。
- 默认语言为 `zh-CN`。
- 语言偏好写入 `localStorage`，切换后立即生效。

## 7. 部署方案

- 开发：`npm.cmd run dev`
- 构建：`npm.cmd run build`
- 预览：`npm.cmd run preview`
- 输出目录：`dist`
- 可部署到 GitHub Pages、Cloudflare Pages、Vercel、Nginx 静态站点或项目自有服务器。
- 官网服务器只托管静态页面，不保存安装包；下载入口跳转 GitHub Releases 或 Gitee Releases。
- `public/_headers` 和 `vercel.json` 提供 CSP、HSTS、X-Frame-Options、Referrer-Policy 等安全响应头。
- 构建后自动生成 `dist/integrity-manifest.json`，并为 JS/CSS 注入 SRI，用于发布后校验静态资源是否被篡改。
