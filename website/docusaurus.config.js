/* eslint-disable */
// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const rehypeJargon = require('remark-jargon')
const jargon = require('./src/jargon')
const path = require('path')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Starlight JS SDK',
  tagline: 'Documentação oficial do Starlight SDK para JavaScript',
  url: 'https://js.sdk.starlight.sh',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
  },

  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-typedoc-api',
      {
        projectRoot: path.join(__dirname, '..'),
        packages: ['.'],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/starlightcms/js-sdk/tree/main/website/',
          remarkPlugins: [[rehypeJargon, { jargon }]],
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Posts recentes',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'JavaScript SDK',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Guia',
          },
          {
            to: 'api',
            label: 'API',
            position: 'left',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/starlightcms/js-sdk',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentação',
            items: [
              {
                label: 'Guia',
                to: '/docs/intro',
              },
              {
                label: 'API',
                to: '/api',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Starlight',
            items: [
              {
                label: 'Conheça o Starlight',
                href: 'https://starlight.sh',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/starlightcms',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Starlight`,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
}

module.exports = config
