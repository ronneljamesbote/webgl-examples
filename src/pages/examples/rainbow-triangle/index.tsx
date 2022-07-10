import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { CanvasContainer } from '../../../components'
import { initializeInstance } from '../../../utils/webgl'
import fragmentShaderSource from './_shaders/fragment.glsl'
import vertexShaderSource from './_shaders/vertex.glsl'

const canvasId = 'canvas'
const canvasDimensions = 500

const drawScene = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
  const triangleGeometry = new Float32Array([0, 0, 250, 0, 0, 250])

  const positionsBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, triangleGeometry, gl.STATIC_DRAW)

  const vertexArrayObject = gl.createVertexArray()
  gl.bindVertexArray(vertexArrayObject)
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
  gl.drawArrays(gl.TRIANGLES, 0, triangleGeometry.length / 2)

  gl.useProgram(null)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
}

const RainbowTriangle: NextPage = () => {
  // In pixels
  const [translation, setTranslation] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

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

    const resolutionUniform = gl.getUniformLocation(program, 'u_resolution')
    gl.uniform1f(resolutionUniform, canvasDimensions)

    const translationUniform = gl.getUniformLocation(program, 'u_translation')
    gl.uniform2f(translationUniform, translation.x, translation.y)

    drawScene(gl, program)
  }, [translation])

  return (
    <CanvasContainer canvasId={canvasId} title="Rainbow Triangle">
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem', fontWeight: '700' }}>X</label>
          <input
            type="range"
            min={0}
            max={canvasDimensions}
            value={translation.x}
            onChange={(e) =>
              setTranslation((prevState) => {
                return { x: Number(e.target.value), y: prevState.y }
              })
            }
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem', fontWeight: '700' }}>Y</label>
          <input
            type="range"
            min={0}
            max={canvasDimensions}
            value={translation.y}
            onChange={(e) =>
              setTranslation((prevState) => {
                return { x: prevState.x, y: Number(e.target.value) }
              })
            }
          />
        </div>
      </div>
    </CanvasContainer>
  )
}

export default RainbowTriangle
