import type { Metadata } from 'next'
import { Footer, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Image from 'next/image'
import '../../styles.css'

const TITLE: Record<string, string> = {
  en: 'WinMF Measurement Software',
  de: 'WinMF Messsoftware'
}

const EDIT_TEXT: Record<string, string> = {
  en: 'Edit this page on GitHub',
  de: 'Bearbeite diese Seite auf GitHub'
}

const FOOTER_LINK: Record<string, string> = {
  en: 'https://www.four-audio.com/en/home/',
  de: 'https://www.four-audio.com/'
}

export const metadata: Metadata = {
  description: 'WinMF Measurement Software',
  title: { absolute: '', template: '%s | WinMF' },
  appleWebApp: { title: 'WinMF' },
  icons: [
    { rel: 'icon', type: 'image/png', sizes: '96x96', url: '/favicon/favicon-96x96.png' },
    { rel: 'icon', type: 'image/svg+xml', url: '/favicon/favicon.svg' },
    { rel: 'shortcut icon', url: '/favicon/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' }
  ],
  manifest: '/favicon/site.webmanifest'
}

type LayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>

export default async function DocsLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  const pageMap = await getPageMap(`/${lang}`)

  return (
    <html lang={lang} suppressHydrationWarning>
      <Head
        backgroundColor={{ dark: 'rgb(14,14,14)', light: 'rgb(255,255,255)' }}
      />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={
                <>
                  <Image
                    alt="WinMF Logo"
                    src="/favicon/favicon.svg"
                    width={44}
                    height={44}
                  />
                  <span style={{ marginLeft: '0.8em', fontWeight: 700, fontSize: '1.0em' }}>
                    WinMF
                  </span>
                </>
              }
              projectLink="https://github.com/4d6174686973/winmf"
            >
              <LocaleSwitch />
            </Navbar>
          }
          footer={
            <Footer>
              <span>
                {TITLE[lang]} {new Date().getFullYear()} ©{' '}
                <a href={FOOTER_LINK[lang]} target="_blank" rel="noreferrer">
                  Four Audio
                </a>
              </span>
            </Footer>
          }
          docsRepositoryBase="https://github.com/4d6174686973/winmf"
          editLink={EDIT_TEXT[lang]}
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'de', name: 'Deutsch' }
          ]}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1, toggleButton: true }}
          nextThemes={{ defaultTheme: 'dark' }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
