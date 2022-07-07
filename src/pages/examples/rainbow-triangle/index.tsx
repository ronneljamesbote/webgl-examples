import { NextPage } from 'next'
import { useEffect } from 'react'

import { CanvasContainer } from '../../../components'
import { initializeInstance } from '../../../utils/webgl'
import fragmentShaderSource from './_shaders/fragment.glsl'
import vertexShaderSource from './_shaders/vertex.glsl'

const canvasId = 'canvas'
const canvasDimensions = 500

const RainbowTriangle: NextPage = () => {
  useEffect(() => {
    const { gl, program } = initializeInstance({
      canvasId: canvasId,
      shaders: {
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
      },
      options: {
        canvasBgColor: [0, 0, 0, 0.2],
        canvasViewPort: [canvasDimensions, canvasDimensions],
      },
    })

    const triangle = new Float32Array([-1, -1, 1, 0, 0, 1])
    const positionsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW)

    const vertexArrayObject = gl.createVertexArray()
    gl.bindVertexArray(vertexArrayObject)
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }, [])

  return <CanvasContainer canvasId={canvasId} title="Rainbow Triangle" />
}

export default RainbowTriangle
