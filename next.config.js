import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  transform(content, { route }) {
    if (route.startsWith('/en/docs/advanced/dynamic-markdown-import')) {
      return `
${content}
export function getStaticProps() {
  return {
    props: {
      foo: 'from nextra config'
    }
  }
}`
    }
    return content
  },
  // transformPageMap(pageMap, locale) {
  //   if (locale === 'en') {
  //     pageMap = [
  //       ...pageMap,
  //       {
  //         name: 'virtual-page',
  //         route: '/en/virtual-page',
  //         frontMatter: { sidebarTitle: 'Virtual Page' }
  //       }
  //     ]
  //   }
  //   return pageMap
  // },
  latex: true
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/**
 * @type {import('next').NextConfig}
 */
export default withBundleAnalyzer(
  withNextra({
    eslint: {
      // Eslint behaves weirdly in this monorepo.
      ignoreDuringBuilds: true
    },
    i18n: {
      locales: ['en', 'de'],
      defaultLocale: 'en'
    }, // 
    redirects: () => [
      {
        source: '/docs.([a-zA-Z-]+)',
        destination: '/docs/getting-started',
        statusCode: 302
      },
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 302
      },
      {
        source: '/',
        destination: '/en',
        permanent: true
      },
      {
        source: '/:path*.html',   // match anything ending in .html
        destination: '/:path*',   // redirect to same path without .html
        permanent: true,          // 308 permanent redirect
      },
      {
        source: '/en/features/features',
        destination: '/en/features',
        permanent: true
      },
    ],
    reactStrictMode: true,
    
    // Fix Image Optimization Error
    images: { unoptimized: true }
  })
)
