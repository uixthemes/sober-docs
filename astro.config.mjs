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
        section('Installation', 'installation'),
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
