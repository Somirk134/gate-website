export type Locale = 'zh-CN' | 'en-US';

export const repoUrl = 'https://github.com/Somirk134/Gate';
export const giteeUrl = 'https://gitee.com/lancemorii-git/gate';
export const githubReleasesUrl = 'https://github.com/Somirk134/Gate/releases';
export const giteeReleasesUrl = 'https://gitee.com/lancemorii-git/gate/releases';
export const docsUrl = 'https://github.com/Somirk134/Gate/tree/main/docs';
export const changelogUrl = 'https://github.com/Somirk134/Gate/blob/main/CHANGELOG.md';

export const localeLabels: Record<Locale, string> = {
  'zh-CN': '中文',
  'en-US': 'English',
};

export const content = {
  'zh-CN': {
    seo: {
      title: 'Gate - 自托管内网穿透平台',
      description: 'Gate 是一个现代化的自托管 TCP、HTTP、HTTPS 内网穿透平台。',
    },
    nav: {
      home: '首页',
      features: '功能',
      docs: '文档',
      deploy: '部署',
      changelog: '更新日志',
      github: 'GitHub',
      gitee: 'Gitee',
      download: '下载',
    },
    controls: {
      language: '切换语言',
      theme: '切换主题',
      menu: '打开导航',
      close: '关闭导航',
    },
    hero: {
      eyebrow: 'Self Hosted · Open Source · Rust Powered',
      title: ['让本地服务，', '安全连接公网。'],
      lead:
        '通过 Gate 使用自己的服务器，快速、安全地访问本地服务、开发环境和私有工具。',
      protocols: ['TCP', 'HTTP', 'HTTPS'],
      primary: '立即下载',
      secondary: '查看 GitHub',
      mirror: '查看 Gitee',
      note: 'v0.9.0 Release Candidate：适合开发者试用、反馈和参与共建。',
      visualLabel: 'Gate Dashboard 真实截图',
    },
    trust: ['Rust Powered', 'Self Hosted', 'Open Source', 'Cross Platform', 'Secure Tunnel'],
    featuresTitle: '为什么选择 Gate',
    featuresLead:
      'Gate 聚焦自托管隧道的核心工作流：部署入口、创建 Tunnel、观察连接、管理证书与日志。',
    features: [
      {
        icon: 'MonitorCog',
        title: '可视化管理',
        text: '无需记住复杂命令，在桌面端统一管理 Tunnel、Server、Domain 和 Certificate。',
        tags: ['Dashboard', 'Tunnel', 'Server'],
      },
      {
        icon: 'Router',
        title: '多协议支持',
        text: '覆盖任意 TCP 服务、Web 应用与 HTTPS 入口，适合开发、联调和私有服务访问。',
        tags: ['TCP', 'HTTP', 'HTTPS'],
      },
      {
        icon: 'Server',
        title: '自托管优先',
        text: '你的服务器、你的数据、你的控制。公网入口部署在你信任的环境中。',
        tags: ['VPS', 'Private Cloud', 'Homelab'],
      },
      {
        icon: 'LockKeyhole',
        title: '自动 HTTPS',
        text: '围绕 Domain、ACME、Certificate 和 TLS 设计证书自动化能力。',
        tags: ['ACME', 'TLS', 'Renewal'],
      },
      {
        icon: 'Activity',
        title: '实时监控',
        text: '通过 Dashboard 和 Log Center 观察 Traffic、Latency、Connection 与运行日志。',
        tags: ['Traffic', 'Latency', 'Logs'],
      },
      {
        icon: 'RefreshCw',
        title: '稳定可靠',
        text: '面向 Reconnect、Heartbeat 和 Session Recovery 构建隧道运行基础。',
        tags: ['Reconnect', 'Heartbeat', 'Recovery'],
      },
    ],
    works: {
      title: 'How Gate Works',
      lead: '客户端主动连接 Gate Server，本地服务无需直接暴露端口。',
      steps: ['本地服务', 'Gate Client', '加密隧道', 'Gate Server', 'Internet'],
      bullets: ['服务端部署在你的公网机器上。', '客户端从内网主动建立连接。', '外部访问通过受控入口转发到本地服务。'],
    },
    quickStart: {
      title: '3 分钟开始使用 Gate',
      lead: '官网第一版保持开源项目式路径：先部署 Server，再安装 Client，最后创建 Tunnel。',
      steps: [
        {
          number: '01',
          title: '部署 Server',
          body: '使用 Docker 或源码启动自托管入口。',
          command: 'docker compose -f docker/docker-compose.yml up -d',
        },
        {
          number: '02',
          title: '安装 Client',
          body: 'Windows、macOS、Linux 桌面客户端覆盖可视化管理流程。',
          command: 'cd client && npm install && npm run tauri dev',
        },
        {
          number: '03',
          title: '创建 Tunnel',
          body: '连接本地服务，选择协议并验证 Dashboard 与日志。',
          command: 'local: 127.0.0.1:3000 -> remote: :18080',
        },
      ],
    },
    screenshots: {
      title: '真实产品截图',
      lead: '以下素材来自 Gate 项目现有截图资源，不使用虚构运行数据生成官网展示。',
      tabs: {
        dashboard: 'Dashboard',
        tunnel: 'Tunnel',
        logs: 'Logs',
      },
    },
    download: {
      title: '开始使用 Gate',
      lead: 'Gate 当前处于 pre-1.0 alpha 阶段，桌面安装包会随发布流程完善。',
      platforms: [
        { name: 'Windows', status: 'Coming Soon', action: '选择下载源' },
        { name: 'macOS', status: 'Coming Soon', action: '选择下载源' },
        { name: 'Linux', status: 'Coming Soon', action: '选择下载源' },
      ],
      dialog: {
        title: '选择下载源',
        body: 'Gate 官网只展示静态页面，不在服务器维护安装包。请前往代码托管平台的 Releases 获取安装包、源码或发布说明。',
        github: '前往 GitHub Releases',
        gitee: '前往 Gitee Releases',
        hint: '如果 GitHub 访问较慢，建议选择 Gitee。',
        close: '关闭弹窗',
      },
    },
    openSource: {
      title: '开放、可审计、欢迎参与',
      lead: 'Gate 是一个 MIT License 开源项目。欢迎提交 Issue、Pull Request、示例和文档改进。',
      starsLoading: '读取 GitHub Star',
      starsError: 'GitHub API 暂不可用',
      license: 'MIT License',
      contribution: 'Issue / Pull Request',
      githubCta: '打开 GitHub',
      giteeCta: '打开 Gitee',
    },
    docs: {
      title: '文档入口',
      lead: '快速了解部署、客户端工作流和 API 约定。',
      entries: [
        { icon: 'BookOpen', title: '快速开始', body: '从本地服务到第一个 Tunnel。' },
        { icon: 'Package', title: '部署指南', body: 'Server、Docker、升级和故障排查。' },
        { icon: 'FileText', title: 'API 文档', body: '协议、配置和集成说明。' },
      ],
    },
    changelog: {
      title: '更新日志',
      lead: '保持开源项目透明度，记录每次发布的变更。',
      items: [
        { version: '0.9.0 · Release Candidate', body: '发布工程：重整公开文档（用户/开发/内部参考）、重建中英文 README、统一 Cargo/npm/Tauri 版本至 0.9.0、准备 Tauri 多平台打包目标、扩展 GitHub Actions 自动化（服务端二进制/桌面安装包/Docker 镜像/GitHub Release 草稿）、添加 npm typecheck/build 代理脚本。清理：移除本地构建输出/依赖缓存/IDE 文件/日志和占位资源；移除 Beta 冲刺报告/未来规划草案/一次性验证报告；重命名非英文资源文件名。兼容性：本次发布清理不包含隧道数据面、TCP/HTTP/HTTPS 运行时、协议、数据库或业务逻辑变更。' },
        { version: '0.1.0 · 2026-07-06', body: '初始化 Rust workspace、桌面客户端、服务端运行时、通信、认证、心跳和监控基础。' },
      ],
    },
    footer: {
      tagline: '下一代自托管内网穿透工具。',
      community: 'Community',
      license: 'License',
    },
  },
  'en-US': {
    seo: {
      title: 'Gate - Self Hosted Tunnel Platform',
      description: 'Gate is a modern self-hosted TCP, HTTP, HTTPS tunnel platform.',
    },
    nav: {
      home: 'Home',
      features: 'Features',
      docs: 'Docs',
      deploy: 'Deploy',
      changelog: 'Changelog',
      github: 'GitHub',
      gitee: 'Gitee',
      download: 'Download',
    },
    controls: {
      language: 'Switch language',
      theme: 'Switch theme',
      menu: 'Open navigation',
      close: 'Close navigation',
    },
    hero: {
      eyebrow: 'Self Hosted · Open Source · Rust Powered',
      title: ['Bring local services', 'securely online.'],
      lead:
        'Use your own server with Gate to reach local services, dev environments, and private tools safely.',
      protocols: ['TCP', 'HTTP', 'HTTPS'],
      primary: 'Download',
      secondary: 'View GitHub',
      mirror: 'View Gitee',
      note: 'v0.9.0 Release Candidate: ready for developer trials, feedback, and contributions.',
      visualLabel: 'Real Gate Dashboard screenshot',
    },
    trust: ['Rust Powered', 'Self Hosted', 'Open Source', 'Cross Platform', 'Secure Tunnel'],
    featuresTitle: 'Why Gate',
    featuresLead:
      'Gate focuses on the core self-hosted tunnel workflow: deploy an entrypoint, create tunnels, observe connections, manage certificates and logs.',
    features: [
      {
        icon: 'MonitorCog',
        title: 'Visual management',
        text: 'Manage tunnels, servers, domains, and certificates from a desktop client instead of memorizing commands.',
        tags: ['Dashboard', 'Tunnel', 'Server'],
      },
      {
        icon: 'Router',
        title: 'Multi-protocol',
        text: 'Expose TCP services, web apps, and HTTPS entrypoints for development, integration, and private access.',
        tags: ['TCP', 'HTTP', 'HTTPS'],
      },
      {
        icon: 'Server',
        title: 'Self-hosted first',
        text: 'Your server, your data, your control. Run the public entrypoint inside infrastructure you trust.',
        tags: ['VPS', 'Private Cloud', 'Homelab'],
      },
      {
        icon: 'LockKeyhole',
        title: 'Automatic HTTPS',
        text: 'Certificate automation is designed around domains, ACME, certificates, and TLS renewal.',
        tags: ['ACME', 'TLS', 'Renewal'],
      },
      {
        icon: 'Activity',
        title: 'Realtime visibility',
        text: 'Use Dashboard and Log Center to inspect traffic, latency, connections, and runtime logs.',
        tags: ['Traffic', 'Latency', 'Logs'],
      },
      {
        icon: 'RefreshCw',
        title: 'Reliable runtime',
        text: 'The tunnel foundation is built around reconnect, heartbeat, and session recovery behavior.',
        tags: ['Reconnect', 'Heartbeat', 'Recovery'],
      },
    ],
    works: {
      title: 'How Gate Works',
      lead: 'Gate Client connects outbound to Gate Server, so local ports do not need direct exposure.',
      steps: ['Local Service', 'Gate Client', 'Encrypted Tunnel', 'Gate Server', 'Internet'],
      bullets: ['Deploy the server on your public machine.', 'The client opens an outbound connection from your private network.', 'External traffic enters through your controlled gateway.'],
    },
    quickStart: {
      title: 'Start with Gate in 3 minutes',
      lead: 'The first website version keeps the open-source path clear: deploy Server, install Client, create Tunnel.',
      steps: [
        {
          number: '01',
          title: 'Deploy Server',
          body: 'Start the self-hosted entrypoint with Docker or source.',
          command: 'docker compose -f docker/docker-compose.yml up -d',
        },
        {
          number: '02',
          title: 'Install Client',
          body: 'Windows, macOS, and Linux desktop clients cover the visual workflow.',
          command: 'cd client && npm install && npm run tauri dev',
        },
        {
          number: '03',
          title: 'Create Tunnel',
          body: 'Connect a local service, choose the protocol, and verify Dashboard plus logs.',
          command: 'local: 127.0.0.1:3000 -> remote: :18080',
        },
      ],
    },
    screenshots: {
      title: 'Real product screenshots',
      lead: 'These assets come from the existing Gate screenshot set. The website does not invent runtime metrics.',
      tabs: {
        dashboard: 'Dashboard',
        tunnel: 'Tunnel',
        logs: 'Logs',
      },
    },
    download: {
      title: 'Start using Gate',
      lead: 'Gate is currently pre-1.0 alpha. Desktop installers will follow the release packaging flow.',
      platforms: [
        { name: 'Windows', status: 'Coming Soon', action: 'Choose source' },
        { name: 'macOS', status: 'Coming Soon', action: 'Choose source' },
        { name: 'Linux', status: 'Coming Soon', action: 'Choose source' },
      ],
      dialog: {
        title: 'Choose a download source',
        body: 'Gate keeps this website fully static and does not host installers on the web server. Use the code hosting releases page for installers, source archives, and release notes.',
        github: 'Go to GitHub Releases',
        gitee: 'Go to Gitee Releases',
        hint: 'If GitHub is slow from your network, choose Gitee.',
        close: 'Close dialog',
      },
    },
    openSource: {
      title: 'Open, auditable, contribution-ready',
      lead: 'Gate is an MIT-licensed open-source project. Issues, pull requests, examples, and documentation improvements are welcome.',
      starsLoading: 'Loading GitHub stars',
      starsError: 'GitHub API unavailable',
      license: 'MIT License',
      contribution: 'Issue / Pull Request',
      githubCta: 'Open GitHub',
      giteeCta: 'Open Gitee',
    },
    docs: {
      title: 'Documentation entry points',
      lead: 'Learn the deployment path, desktop workflow, and API conventions.',
      entries: [
        { icon: 'BookOpen', title: 'Quick Start', body: 'From local service to first tunnel.' },
        { icon: 'Package', title: 'Deployment Guide', body: 'Server, Docker, upgrade, and troubleshooting.' },
        { icon: 'FileText', title: 'API Docs', body: 'Protocol, configuration, and integration notes.' },
      ],
    },
    changelog: {
      title: 'Changelog',
      lead: 'Keep open-source releases transparent with detailed change records.',
      items: [
        { version: '0.9.0 · Release Candidate', body: 'Release engineering: reorganized public docs (user/dev/internal), rebuilt bilingual READMEs, unified Cargo/npm/Tauri versions to 0.9.0, prepared Tauri bundle targets for Windows/macOS/Linux, expanded GitHub Actions automation (server binaries, desktop installers, Docker images, draft GitHub Releases), added npm proxy scripts for typecheck/build. Cleanup: removed local build output, dependency caches, IDE files, logs, and placeholder resources; removed beta sprint reports, future-plan drafts, and one-off validation reports; renamed non-English resource filenames to release-safe names. Compatibility: no tunnel data-plane, runtime, protocol, database, or business-logic changes included in this release cleanup.' },
        { version: '0.1.0 · 2026-07-06', body: 'Initial Rust workspace, desktop client, server runtime, communication, authentication, heartbeat, and monitoring foundations.' },
      ],
    },
    footer: {
      tagline: 'A next-generation self-hosted tunnel tool.',
      community: 'Community',
      license: 'License',
    },
  },
} as const;
