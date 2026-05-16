import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  latex: true,
  unstable_shouldAddLocaleToLinks: true
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
      ignoreDuringBuilds: true
    },
    i18n: {
      locales: ['en', 'de'],
      defaultLocale: 'en'
    },
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
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true
      },
      {
        source: '/en/features/features',
        destination: '/en/features',
        permanent: true
      }
    ],
    outputFileTracingRoot: new URL('.', import.meta.url).pathname,
    reactStrictMode: true,
    images: { unoptimized: true }
  })
)
