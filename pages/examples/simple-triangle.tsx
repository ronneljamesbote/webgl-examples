import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

// Vertex shader
const vertexShaderSource = `
  attribute vec4 position;

  void main() {
    gl_Position = position;
  }
`

// Fragment shader
const fragmentShaderSource = `
  precision mediump float;
  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }
`

const compileShader = (gl: WebGLRenderingContext, source: string, type: number): WebGLShader => {
  const shader: WebGLShader | null = gl.createShader(type)
  if (!shader) {
    throw 'compile shader error'
  }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!success) {
    gl.deleteShader(shader)
    throw `compile shader error: ${gl.getShaderInfoLog(shader)}`
  }
  return shader
}

const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram => {
  const program: WebGLProgram | null = gl.createProgram()
  if (!program) {
    throw `create program error`
  }
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!success) {
    gl.deleteProgram(program)
    throw `create program error: ${gl.getProgramInfoLog(program)}`
  }
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

      const gl = canvas.getContext('webgl')
      if (!gl) {
        return
      }

      const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
      const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
      const program = createProgram(gl, vertexShader, fragmentShader)

      gl.useProgram(program)

      const vertexA = [0, 0]
      const vertexB = [0, 0.5]
      const vertexC = [0.7, 0]
      const vertices = [...vertexA, ...vertexB, ...vertexC]

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

      const color = gl.getUniformLocation(program, 'color')
      gl.uniform4fv(color, new Float32Array([1, 0, 1, 1]))

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clearColor(0, 0, 1, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

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
      <canvas id="canvas"></canvas>
    </>
  )
}

export default SimpleTriangle
