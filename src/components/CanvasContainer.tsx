import Head from 'next/head'
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
        <h1 style={{ paddingBottom: '2rem' }}>{title}</h1>
        <canvas id={canvasId}></canvas>
        {children}
      </div>
    </>
  )
}

export default CanvasContainer
