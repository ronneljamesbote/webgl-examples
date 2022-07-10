import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CanvasContainerProps {
  title: string
  canvasId?: string
  headContents?: ReactNode
  children?: ReactNode
}

const CanvasContainer = ({ title, headContents, children, canvasId = 'canvas' }: CanvasContainerProps) => {
  const pageTitle = `WebGL Examples - ${title}`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        {headContents}
      </Head>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <div style={{ paddingBottom: '2rem', textAlign: 'center' }}>
          <Link href="/">
            <a style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Return Home</a>
          </Link>
          <h1>{title}</h1>
        </div>
        <canvas id={canvasId}></canvas>
        {children}
      </div>
    </>
  )
}

export default CanvasContainer
