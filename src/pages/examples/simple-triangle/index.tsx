import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import fragmentShaderSource from './_shaders/fragment.glsl'
import vertexShaderSource from './_shaders/vertex.glsl'

const compileShader = (gl: WebGLRenderingContext, source: string, type: number): WebGLShader => {
  const shader: WebGLShader | null = gl.createShader(type)
  if (!shader) {
    throw 'compile shader error'
  }
  gl.shaderSource(shader, source.trim())
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    throw `compile shader error: ${gl.getShaderInfoLog(shader)}`
  }

  return shader
}

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
  validate = false,
): WebGLProgram => {
  const program: WebGLProgram | null = gl.createProgram()
  if (!program) {
    throw `create program error`
  }
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    throw `create program error: ${gl.getProgramInfoLog(program)}`
  }
  // Only do this for additional debugging.
  if (validate) {
    gl.validateProgram(program)
    if (gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      gl.deleteProgram(program)
      throw `create program error: ${gl.getProgramInfoLog(program)}`
    }
  }
  // Can delete the shaders since the program has been made.
  gl.detachShader(program, vertexShader)
  gl.detachShader(program, fragmentShader)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  return program
}

const SimpleTriangle: NextPage = () => {
  useEffect(() => {
    const canvasContainer = document.getElementById('canvas')
    if (canvasContainer) {
      const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
      if (!canvas) {
        return
      }
      canvas.width = 500
      canvas.height = 500
      canvas.style.width = `${canvas.width}px`
      canvas.style.height = `${canvas.height}px`

      const gl = canvas.getContext('webgl2')
      if (!gl) {
        return
      }

      const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
      const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
      const program = createProgram(gl, vertexShader, fragmentShader)

      gl.useProgram(program)

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clearColor(0, 0, 1, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const vertexA = [0, 0]
      const vertexB = [0, 0.5]
      const vertexC = [0.7, 0]
      const vertices = [...vertexA, ...vertexB, ...vertexC]

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

      const color = gl.getUniformLocation(program, 'color')
      gl.uniform4fv(color, new Float32Array([1, 1, 0, 1]))

      const positionAttributeLocation = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)
    }
  }, [])

  return (
    <>
      <Head>
        <title>WebGL Examples - Simple Triangle</title>
        <link rel="icon" href="/favicon.ico" />
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
        <h1 style={{ paddingBottom: '2rem' }}>Simple Triangle</h1>
        <canvas id="canvas"></canvas>
      </div>
    </>
  )
}

export default SimpleTriangle
