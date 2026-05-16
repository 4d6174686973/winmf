import bundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
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
      ignoreDuringBuilds: true
    },
    output: 'export',
    i18n: {
      locales: ['en', 'de'],
      defaultLocale: 'en'
    },
    reactStrictMode: true,
    images: { unoptimized: true }
  })
)
