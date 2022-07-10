import { promises as fs } from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'

interface HomeStaticProps {
  links: { title: string; link: string }[]
}

const dirToTitleCase = (str: string) => {
  return str
    .split('-')
    .map((word: string) => {
      const capitalLetter = word.charAt(0).toUpperCase()
      return `${capitalLetter}${word.slice(1)}`
    })
    .join(' ')
}

const dirToLink = (dir: string) => ({ title: dirToTitleCase(dir), link: `examples/${dir}` })

const getExampleLinks = async () => {
  const examplesPath = path.join(process.cwd(), 'src/pages/examples')
  const examplesPages = await fs.readdir(examplesPath)

  return examplesPages.map(dirToLink)
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  const links = await getExampleLinks()

  return {
    props: {
      links: links,
    },
  }
}

const Home: NextPage<HomeStaticProps> = ({ links }) => {
  return (
    <>
      <Head>
        <title>WebGL Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>Example Links</h1>

        <section style={{ padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none' }}>
            {links.map(({ title, link }) => {
              return (
                <li key={title}>
                  <Link href={link}>
                    <a>- {title}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Home
