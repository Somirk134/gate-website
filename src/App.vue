<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  GitPullRequest,
  Languages,
  LockKeyhole,
  Menu,
  MonitorCog,
  Moon,
  Package,
  RefreshCw,
  Router,
  Server,
  ShieldCheck,
  Sun,
  TerminalSquare,
  X,
} from '@lucide/vue';
import { siGitee, siGithub } from 'simple-icons';
import BrandIcon from './BrandIcon.vue';
import {
  changelogUrl,
  content,
  docsUrl,
  giteeReleasesUrl,
  giteeUrl,
  githubReleasesUrl,
  localeLabels,
  repoUrl,
  type Locale,
} from './content';

type Theme = 'dark' | 'light';
type ScreenshotKey = 'dashboard' | 'tunnel' | 'logs';
type GithubState = 'loading' | 'ready' | 'error';

const locale = ref<Locale>('zh-CN');
const theme = ref<Theme>('dark');
const menuOpen = ref(false);
const downloadDialogOpen = ref(false);
const activeScreenshot = ref<ScreenshotKey>('dashboard');
const githubStars = ref<number>(0); // 默认值，API 加载成功后更新；失败时也显示当前值而非"暂不可用"
const githubState = ref<GithubState>('ready');

const t = computed(() => content[locale.value]);

const icons = {
  Activity,
  BookOpen,
  Boxes,
  CheckCircle2,
  FileText,
  GitPullRequest,
  LockKeyhole,
  MonitorCog,
  Package,
  RefreshCw,
  Router,
  Server,
  ShieldCheck,
  TerminalSquare,
};

const brandIcons = {
  github: siGithub,
  gitee: siGitee,
};

// 使用 BASE_URL 确保子路径部署（如 /gate-website/）时资源路径正确
const B = import.meta.env.BASE_URL;
const screenshotSources: Record<ScreenshotKey, string> = {
  dashboard: `${B}assets/screenshots/dashboard.png`,
  tunnel: `${B}assets/screenshots/tunnel.png`,
  logs: `${B}assets/screenshots/log-center.png`,
};

const activeScreenshotSrc = computed(() => screenshotSources[activeScreenshot.value]);
const oppositeLocale = computed<Locale>(() => (locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'));
const localeButtonLabel = computed(() => localeLabels[oppositeLocale.value]);
const screenshotTabs = computed(
  () => Object.entries(t.value.screenshots.tabs) as Array<[ScreenshotKey, string]>,
);

const githubStarsLabel = computed(() => {
  // 始终显示当前 Stars 数，API 失败也不回退到错误文案
  return `${new Intl.NumberFormat(locale.value).format(githubStars.value)} Stars`;
});

function iconFor(name: keyof typeof icons) {
  return icons[name];
}

function setLocale(nextLocale: Locale) {
  locale.value = nextLocale;
  localStorage.setItem('gate-locale', nextLocale);
  menuOpen.value = false;
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('gate-theme', theme.value);
}

function openDownloadDialog() {
  menuOpen.value = false;
  downloadDialogOpen.value = true;
}

function closeDownloadDialog() {
  downloadDialogOpen.value = false;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && downloadDialogOpen.value) {
    closeDownloadDialog();
  }
}

function syncDocumentMetadata() {
  document.documentElement.lang = locale.value;
  document.documentElement.dataset.theme = theme.value;
  document.title = t.value.seo.title;

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  if (description) {
    description.content = t.value.seo.description;
  }

  if (themeColor) {
    themeColor.content = theme.value === 'dark' ? '#080a0f' : '#f7faf8';
  }
}

async function loadGithubStars() {
  try {
    const response = await fetch('https://api.github.com/repos/Somirk134/Gate', {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}`);
    }

    const data = (await response.json()) as { stargazers_count?: number };
    if (typeof data.stargazers_count === 'number') {
      githubStars.value = data.stargazers_count;
    }
    // 失败时保留默认值 0，不显示错误文案
  } catch {
    // API 请求失败时静默保留默认值，不影响用户体验
  }
}

onMounted(() => {
  const storedLocale = localStorage.getItem('gate-locale') as Locale | null;
  const storedTheme = localStorage.getItem('gate-theme') as Theme | null;

  if (storedLocale === 'zh-CN' || storedLocale === 'en-US') {
    locale.value = storedLocale;
  }

  if (storedTheme === 'dark' || storedTheme === 'light') {
    theme.value = storedTheme;
  }

  syncDocumentMetadata();
  window.addEventListener('keydown', handleKeydown);
  void loadGithubStars();
});

watch([locale, theme], syncDocumentMetadata);
watch(downloadDialogOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Gate home" @click="menuOpen = false">
        <img :src="`${B}assets/branding/logo.svg`" alt="Gate" />
        <span>Gate</span>
      </a>

      <button class="icon-button menu-toggle" type="button" :aria-label="menuOpen ? t.controls.close : t.controls.menu" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="20" aria-hidden="true" />
        <Menu v-else :size="20" aria-hidden="true" />
      </button>

      <nav class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Primary navigation">
        <a href="#home" @click="menuOpen = false">{{ t.nav.home }}</a>
        <a href="#features" @click="menuOpen = false">{{ t.nav.features }}</a>
        <a href="#docs" @click="menuOpen = false">{{ t.nav.docs }}</a>
        <a href="#changelog" @click="menuOpen = false">{{ t.nav.changelog }}</a>
      </nav>

      <div class="header-actions">
        <a class="ghost-button brand-button github-button" :href="repoUrl" target="_blank" rel="noreferrer">
          <BrandIcon :icon="brandIcons.github" :size="18" />
          <span>{{ t.nav.github }}</span>
        </a>
        <a class="ghost-button brand-button gitee-button" :href="giteeUrl" target="_blank" rel="noreferrer">
          <BrandIcon :icon="brandIcons.gitee" :size="18" />
          <span>{{ t.nav.gitee }}</span>
        </a>
        <a class="primary-button compact stars-button" :href="repoUrl" target="_blank" rel="noreferrer">
          <BrandIcon :icon="brandIcons.github" :size="18" />
          <span>{{ githubStarsLabel }}</span>
        </a>
        <button class="icon-button" type="button" :aria-label="t.controls.language" @click="setLocale(oppositeLocale)">
          <Languages :size="18" aria-hidden="true" />
          <span>{{ localeButtonLabel }}</span>
        </button>
        <button class="icon-button square" type="button" :aria-label="t.controls.theme" @click="toggleTheme">
          <Sun v-if="theme === 'dark'" :size="18" aria-hidden="true" />
          <Moon v-else :size="18" aria-hidden="true" />
        </button>
      </div>
    </header>

    <main>
      <section id="home" class="hero section">
        <div class="network-field" aria-hidden="true">
          <span class="node node-a"></span>
          <span class="node node-b"></span>
          <span class="node node-c"></span>
          <span class="signal signal-a"></span>
          <span class="signal signal-b"></span>
        </div>

        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">{{ t.hero.eyebrow }}</p>
            <h1>
              <span v-for="line in t.hero.title" :key="line">{{ line }}</span>
            </h1>
            <p class="hero-lead">{{ t.hero.lead }}</p>
            <div class="protocol-list" aria-label="Supported protocols">
              <span v-for="protocol in t.hero.protocols" :key="protocol">{{ protocol }}</span>
            </div>
            <div class="hero-actions">
              <a class="primary-button" :href="repoUrl" target="_blank" rel="noreferrer">
                <BrandIcon :icon="brandIcons.github" :size="20" />
                <span>{{ githubStarsLabel }}</span>
              </a>
              <a class="secondary-button brand-button github-button" :href="repoUrl" target="_blank" rel="noreferrer">
                <BrandIcon :icon="brandIcons.github" :size="20" />
                <span>{{ t.hero.secondary }}</span>
              </a>
              <a class="secondary-button brand-button gitee-button" :href="giteeUrl" target="_blank" rel="noreferrer">
                <BrandIcon :icon="brandIcons.gitee" :size="20" />
                <span>{{ t.hero.mirror }}</span>
              </a>
            </div>
            <p class="alpha-note">{{ t.hero.note }}</p>
          </div>

          <figure class="hero-product" :aria-label="t.hero.visualLabel">
            <div class="window-bar" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img :src="`${B}assets/screenshots/hero.png`" :alt="t.hero.visualLabel" />
          </figure>
        </div>

        <div class="trust-strip container" aria-label="Gate trust signals">
          <span v-for="item in t.trust" :key="item">
            <CheckCircle2 :size="18" aria-hidden="true" />
            {{ item }}
          </span>
        </div>
      </section>

      <section id="features" class="section">
        <div class="container section-heading">
          <p class="eyebrow">Capabilities</p>
          <h2>{{ t.featuresTitle }}</h2>
          <p>{{ t.featuresLead }}</p>
        </div>

        <div class="container feature-grid">
          <article v-for="feature in t.features" :key="feature.title" class="feature-card">
            <component :is="iconFor(feature.icon)" class="feature-icon" :size="28" aria-hidden="true" />
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
            <div class="tag-row">
              <span v-for="tag in feature.tags" :key="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section class="section band">
        <div class="container split-layout">
          <div class="section-heading align-left">
            <p class="eyebrow">Architecture</p>
            <h2>{{ t.works.title }}</h2>
            <p>{{ t.works.lead }}</p>
            <ul class="clean-list">
              <li v-for="bullet in t.works.bullets" :key="bullet">
                <ShieldCheck :size="18" aria-hidden="true" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>

          <ol class="flow-line" aria-label="Gate architecture flow">
            <li v-for="step in t.works.steps" :key="step">
              <span>{{ step }}</span>
            </li>
          </ol>
        </div>
      </section>

      <section id="deploy" class="section">
        <div class="container section-heading">
          <p class="eyebrow">Quick Start</p>
          <h2>{{ t.quickStart.title }}</h2>
          <p>{{ t.quickStart.lead }}</p>
        </div>

        <div class="container steps-grid">
          <article v-for="step in t.quickStart.steps" :key="step.number" class="step-card">
            <span class="step-number">{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
            <code>{{ step.command }}</code>
          </article>
        </div>
      </section>

      <section class="section screenshot-section">
        <div class="container section-heading">
          <p class="eyebrow">Product</p>
          <h2>{{ t.screenshots.title }}</h2>
          <p>{{ t.screenshots.lead }}</p>
        </div>

        <div class="container screenshot-layout">
          <div class="screenshot-tabs" role="tablist" aria-label="Gate screenshots">
            <button
              v-for="[key, label] in screenshotTabs"
              :key="key"
              type="button"
              :class="{ active: activeScreenshot === key }"
              @click="activeScreenshot = key"
            >
              {{ label }}
            </button>
          </div>
          <figure class="screenshot-frame">
            <img :src="activeScreenshotSrc" :alt="t.screenshots.tabs[activeScreenshot]" />
          </figure>
        </div>
      </section>

      <section class="section">
        <div class="container open-source">
          <div>
            <p class="eyebrow">Open Source</p>
            <h2>{{ t.openSource.title }}</h2>
            <p>{{ t.openSource.lead }}</p>
            <div class="repo-actions">
              <a class="primary-button brand-button github-button" :href="repoUrl" target="_blank" rel="noreferrer">
                <BrandIcon :icon="brandIcons.github" :size="20" />
                <span>{{ t.openSource.githubCta }}</span>
                <ExternalLink :size="16" aria-hidden="true" />
              </a>
              <a class="secondary-button brand-button gitee-button" :href="giteeUrl" target="_blank" rel="noreferrer">
                <BrandIcon :icon="brandIcons.gitee" :size="20" />
                <span>{{ t.openSource.giteeCta }}</span>
                <ExternalLink :size="16" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div class="oss-metrics" aria-label="Open source project information">
            <span>
              <BrandIcon :icon="brandIcons.github" :size="22" />
              {{ githubStarsLabel }}
            </span>
            <span>
              <ShieldCheck :size="22" aria-hidden="true" />
              {{ t.openSource.license }}
            </span>
            <span>
              <GitPullRequest :size="22" aria-hidden="true" />
              {{ t.openSource.contribution }}
            </span>
          </div>
        </div>
      </section>

      <section id="docs" class="section band">
        <div class="container section-heading">
          <p class="eyebrow">Docs</p>
          <h2>{{ t.docs.title }}</h2>
          <p>{{ t.docs.lead }}</p>
        </div>

        <div class="container docs-grid">
          <a v-for="entry in t.docs.entries" :key="entry.title" class="doc-card" :href="docsUrl" target="_blank" rel="noreferrer">
            <component :is="iconFor(entry.icon)" :size="28" aria-hidden="true" />
            <h3>{{ entry.title }}</h3>
            <p>{{ entry.body }}</p>
            <ArrowRight :size="18" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="changelog" class="section">
        <div class="container changelog-layout">
          <div class="section-heading align-left">
            <p class="eyebrow">Changelog</p>
            <h2>{{ t.changelog.title }}</h2>
            <p>{{ t.changelog.lead }}</p>
            <a class="secondary-button" :href="changelogUrl" target="_blank" rel="noreferrer">
              <FileText :size="18" aria-hidden="true" />
              <span>{{ t.nav.changelog }}</span>
            </a>
          </div>

          <div class="timeline">
            <article v-for="item in t.changelog.items" :key="item.version">
              <span></span>
              <h3>{{ item.version }}</h3>
              <p>{{ item.body }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand" href="#home">
            <img :src="`${B}assets/branding/logo.svg`" alt="Gate" />
            <span>Gate</span>
          </a>
          <p>{{ t.footer.tagline }}</p>
        </div>

        <nav aria-label="Footer navigation">
          <a :href="repoUrl" target="_blank" rel="noreferrer">GitHub</a>
          <a :href="giteeUrl" target="_blank" rel="noreferrer">Gitee</a>
          <a :href="docsUrl" target="_blank" rel="noreferrer">Docs</a>
          <a :href="`${repoUrl}/blob/main/LICENSE`" target="_blank" rel="noreferrer">{{ t.footer.license }}</a>
          <a :href="`${repoUrl}/discussions`" target="_blank" rel="noreferrer">{{ t.footer.community }}</a>
        </nav>
      </div>
    </footer>

    <div v-if="downloadDialogOpen" class="modal-backdrop" role="presentation" @click.self="closeDownloadDialog">
      <section
        class="download-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`download-title-${locale}`"
      >
        <button class="modal-close" type="button" :aria-label="t.download.dialog.close" @click="closeDownloadDialog">
          <X :size="20" aria-hidden="true" />
        </button>
        <p class="eyebrow">Download</p>
        <h2 :id="`download-title-${locale}`">{{ t.download.dialog.title }}</h2>
        <p>{{ t.download.dialog.body }}</p>
        <div class="download-source-grid">
          <a
            class="source-card github-source"
            :href="githubReleasesUrl"
            target="_blank"
            rel="noreferrer"
            @click="closeDownloadDialog"
          >
            <BrandIcon :icon="brandIcons.github" :size="28" />
            <span>{{ t.download.dialog.github }}</span>
            <ExternalLink :size="18" aria-hidden="true" />
          </a>
          <a
            class="source-card gitee-source"
            :href="giteeReleasesUrl"
            target="_blank"
            rel="noreferrer"
            @click="closeDownloadDialog"
          >
            <BrandIcon :icon="brandIcons.gitee" :size="28" />
            <span>{{ t.download.dialog.gitee }}</span>
            <ExternalLink :size="18" aria-hidden="true" />
          </a>
        </div>
        <p class="download-hint">{{ t.download.dialog.hint }}</p>
      </section>
    </div>
  </div>
</template>
