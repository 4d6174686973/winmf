/* eslint sort-keys: error */
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { LocaleSwitch, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'nextra/hooks'
// import type { ComponentProps, ReactElement } from 'react'
import Image from 'next/image';
// import Link from 'next/link';

const TITLE = {
  en: 'WinMF Measurement Software',
  de: 'WinMF Messsoftware'
}

const EDIT_TEXT = {
  en: 'Edit this page on GitHub',
  de: 'Bearbeite diese Seite auf GitHub'
}

const FOOTER_LINK = {
  en: 'https://www.four-audio.com/en/home/',
  de: 'https://www.four-audio.com/'
}


const config: DocsThemeConfig = {
  
  // CUSTOM
  backgroundColor: {
    dark: '14,14,14',
    light: '255,255,255'
  },
  darkMode: true,

  // BANNER
  // banner: {
  //   content:  "Hello World!",
  //   key: 'winmf-banner',
  //   dismissible: false
  // },

  // DISCORD
  // chat: {
  //   link: 'https://discord.com'
  // },


  // REPO
  docsRepositoryBase:
    'https://github.com/4d6174686973/winmf',
  editLink: {
    content: function useText() {
      const { locale } = useRouter()
      return EDIT_TEXT[locale!]
    }
  },

  // // FEEDBACK LINK
  // feedback: {
  //   content: 'Question? Give us feedback →',
  //   labels: 'feedback',
  //   useLink() {
  //     const config = useConfig()
  //     return `https://google.com/search?q=${encodeURIComponent(
  //       `Feedback for ${config.title}`
  //     )}`
  //   }
  // },

  // FOOTER
  footer: {
    content: function useText() {
      const { locale } = useRouter()
      return (
        <span>
          {TITLE[locale!]} {new Date().getFullYear()} ©{' '}
          <a href={FOOTER_LINK[locale!]} target="_blank">
            Four Audio
          </a>
        </span>
      )
    }
  },

  // HEADER
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>()
    const { locale } = useRouter()
    const description =
      config.frontMatter.description ||
      'WinMF Measurement Software'
    // const image =
    //   config.frontMatter.image ||
    //   'https://assets.vercel.com/image/upload/v1572282926/swr/twitter-card.jpg'
    const title = `${config.title} | WinMF (${locale})`
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        {/* Favicons, meta */}
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* <meta name="msapplication-TileColor" content="#fff" /> */}
        <meta httpEquiv="Content-Language" content="en" />
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta property="og:image" content={image} /> */}
        <meta name="apple-mobile-web-app-title" content="WinMF" />
      </>
    )
  },
  i18n: [
    { locale: 'en', name: 'English' },
    { locale: 'de', name: 'Deutsch' }
  ],
  logo: (
    <>
      <Image
        alt="WinMF Logo"
        src="/favicon/favicon.svg"
        width={44}
        height={44}
      />
      <span style={{ marginLeft: '0.8em', fontWeight: 700, fontSize: '1.0em'}}>
        WinMF
      </span>
    </>
  ),
  navbar: {
    extraContent: LocaleSwitch
  },
  nextThemes: {
    defaultTheme: 'dark'
  },
  project: {
    link: 'https://github.com/4d6174686973/winmf'
  },
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  // toc: {
  //   extraContent: (
  //     <img alt="placeholder cat" src="https://placecats.com/300/200" />
  //   ),
  //   float: true
  // }
}

export default config
