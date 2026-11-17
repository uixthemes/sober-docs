import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';
import remarkImageAlign from './src/plugins/remark-image-align.mjs';

const section = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
  site: 'https://docs.uix.store',
  base: '/sober',
  trailingSlash: 'always',
  // The old Installation section is now a single "Install Theme" page under
  // Getting Started. Keep the old URLs working. Keys are relative to `base`;
  // destinations include it.
  redirects: {
    '/installation/download-sober/': '/sober/getting-started/install-theme/#step-1-download-theme',
    '/installation/install-sober/': '/sober/getting-started/install-theme/#step-2-install-theme',
    '/installation/install-plugins/':
      '/sober/getting-started/install-theme/#step-3-install-plugins',
    '/installation/config-plugins/':
      '/sober/getting-started/install-theme/#step-4-config-image-sizes',
    '/installation/enable-portfolio-support/':
      '/sober/getting-started/install-theme/#step-5-enable-portfolio-support',
    '/installation/import-demo/': '/sober/getting-started/install-theme/#step-6-import-demo',
  },
  markdown: {
    remarkPlugins: [remarkImageAlign],
  },
  integrations: [
    starlight({
      title: 'Sober Docs',
      description: 'User documentation for the Sober WooCommerce WordPress theme by UIX Themes.',
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      plugins: [starlightImageZoom(), starlightLinksValidator()],
      components: {
        SocialIcons: './src/components/HeaderLinks.astro',
      },
      sidebar: [
        section('Getting Started', 'getting-started'),
        section('Theme Options', 'theme-options'),
        section('WPBakery Page Builder', 'visual-composer'),
        section('Elementor Builder', 'elementor'),
        section('Header', 'header'),
        section('Page Header', 'page-header'),
        section('Sliders', 'slider'),
        section('Pages', 'page'),
        section('Shop', 'shop'),
        section('Portfolio', 'portfolio'),
        section('Footer', 'footer'),
        section('Other', 'misc'),
        section('Translation', 'translate'),
        section('Customize Theme', 'customize'),
        section('Updates', 'update'),
      ],
    }),
  ],
});
