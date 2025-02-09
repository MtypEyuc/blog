import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '블로그 이름',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  // https://docusaurus.io/ko/docs/next/i18n/tutorial
  // npm run write-translations -- --locale ko
  i18n: {
    defaultLocale: 'ko',
    // locales: ['ko', 'en', 'jp', 'fr', 'es'],
    // locales: ['ko', 'en', 'jp'],
    locales: ['ko'],
    localeConfigs: {
      'ko': {
        label: 'ko-한국어',
        htmlLang: 'ko',
      },
      'en': {
        label: 'en-English',
        htmlLang: 'en',
      },
      'jp': {
        label: 'jp-日本語',
        htmlLang: 'jp',
      },
      'fr': {
        label: 'fr-Français',
        htmlLang: 'fr',
      },
      'es': {
        label: 'es-Español',
        htmlLang: 'es',
      },
    }
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showLastUpdateTime:false,
          postsPerPage: 1,
          include: ['post/**/*.md','post/**/*.mdx','home/**/*.mdx'],
          blogSidebarCount: "ALL",
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-project',
        path: 'docs-project',
        routeBasePath: 'docs-project',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-learn',
        path: 'docs-learn',
        routeBasePath: 'docs-learn',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     /**
    //      * Required for any multi-instance plugin
    //      */
    //     id: 'life',
    //     /**
    //      * URL route for the blog section of your site.
    //      * *DO NOT* include a trailing slash.
    //      */
    //     routeBasePath: 'life',
    //     /**
    //      * Path to data on filesystem relative to site dir.
    //      */
    //     path: 'life',
    //   },
    // ],
  ],

  themeConfig: {
    docs:{
      versionPersistence: 'localStorage',
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '블로그 이름',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        { position: 'left', label: 'Tutorial', type: 'docSidebar', sidebarId: 'tutorialSidebar', },
        { position: 'left', label: 'Project', to: '/docs-project/intro', activeBaseRegex: `/docs-project/`,}, // ./docs-project/Intro.md
        { position: 'left', label: 'Learn', to: '/docs-learn/intro', activeBaseRegex: `/docs-learn/`,}, // ./docs-learn/Intro.md
        { position: 'left', label: 'Blog', to: '/blog/home', },
        // { position: 'left', label: 'Life', to: '/life', },
        { position: 'right', type: 'localeDropdown', },
        { position: 'right', label: 'GitHub', href: 'https://github.com/MtypEyuc', },
      ],
      hideOnScroll : true
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      logo: {
        alt: 'footer Logo',
        src: 'img/random_gif_emojis.gif',
        srcDark: 'img/construction.jpg',
        href: 'https://docusaurus.io/',
        target: '_self',
        width: 64,
        height: 64,
        className: 'custom-navbar-logo-class',
        style: {border: 'solid green'},
      },
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
