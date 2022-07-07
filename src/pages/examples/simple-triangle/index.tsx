import type { NextPage } from 'next'
import { useEffect } from 'react'

import { CanvasContainer } from '../../../components'
import { compileShader, createProgram } from '../../../utils/webgl'
import fragmentShaderSource from './_shaders/fragment.glsl'
import vertexShaderSource from './_shaders/vertex.glsl'

const SimpleTriangle: NextPage = () => {
  useEffect(() => {
    const canvasId = 'canvas'
    const canvasDimensions = 500

    const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) {
      throw `Canvas element not found`
    }

    canvas.width = canvasDimensions
    canvas.height = canvasDimensions
    canvas.style.width = `${canvas.width}px`
    canvas.style.height = `${canvas.height}px`

    const gl = canvas.getContext('webgl2')
    if (!gl) {
      throw `WebGL not supported`
    }

    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
    const program = createProgram(gl, vertexShader, fragmentShader)

    gl.useProgram(program)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 1, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // In pixels
    const vertexA = [100, 50]
    const vertexB = [100, 250]
    const vertexC = [350, 50]
    const vertices = new Float32Array([...vertexA, ...vertexB, ...vertexC])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const color = gl.getUniformLocation(program, 'u_color')
    gl.uniform4fv(color, new Float32Array([1, 1, 0, 1]))

    const resolution = gl.getUniformLocation(program, 'u_resolution')
    gl.uniform1f(resolution, canvasDimensions)

    const vertexArrayObject = gl.createVertexArray()
    gl.bindVertexArray(vertexArrayObject)
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)
  }, [])

  return <CanvasContainer title="Simple Triangle" />
}

export default SimpleTriangle
