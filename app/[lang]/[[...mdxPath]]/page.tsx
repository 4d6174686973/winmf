import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'
import fs from 'node:fs'
import path from 'node:path'

const LOCALES = ['en', 'de']

function collectMdxPaths(dir: string): string[][] {
  const result: string[][] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      for (const sub of collectMdxPaths(path.join(dir, entry.name))) {
        result.push([entry.name, ...sub])
      }
    } else if (entry.name.endsWith('.mdx')) {
      const stem = entry.name.slice(0, -4)
      result.push(stem === 'index' ? [] : [stem])
    }
  }
  return result
}

export async function generateStaticParams() {
  const contentRoot = path.join(process.cwd(), 'content')
  const params: { lang: string; mdxPath: string[] }[] = []
  for (const lang of LOCALES) {
    for (const mdxPath of collectMdxPaths(path.join(contentRoot, lang))) {
      params.push({ lang, mdxPath })
    }
  }
  return params
}

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
