import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>WinMF</span>,
  project: {
    link: 'https://github.com/4d6174686973/winmf',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase: 'https://github.com/4d6174686973/winmf',
  footer: {
    text: 'WinMF Measurement Software',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – WinMF'
    }
  }
}

export default config
