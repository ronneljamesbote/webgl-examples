import { compileShader, createProgram } from './index'

interface InitializeInstanceOptions {
  canvasId: string
  shaders: { vertexShader: string; fragmentShader: string }
  options: {
    canvasViewPort: [number, number, number?, number?]
    canvasBgColor?: [number?, number?, number?, number?]
  }
}

interface InitializeInstanceReturn {
  gl: WebGL2RenderingContext
  program: WebGLProgram
}

const initializeInstance = ({ canvasId, options, shaders }: InitializeInstanceOptions): InitializeInstanceReturn => {
  const { canvasViewPort, canvasBgColor } = options
  const [viewWidth, viewHeight, viewX, viewY] = canvasViewPort
  const [bgR, bgG, bgB, bgA] = canvasBgColor ?? []

  const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement
  if (!canvas) {
    throw `Canvas element not found`
  }
  canvas.width = viewWidth
  canvas.height = viewHeight
  canvas.style.width = `${canvas.width}px`
  canvas.style.height = `${canvas.height}px`

  const gl = canvas.getContext('webgl2')
  if (!gl) {
    throw `WebGL not supported`
  }

  const vertexShader = compileShader(gl, shaders.vertexShader, gl.VERTEX_SHADER)
  const fragmentShader = compileShader(gl, shaders.fragmentShader, gl.FRAGMENT_SHADER)
  const program = createProgram(gl, vertexShader, fragmentShader)

  gl.useProgram(program)

  gl.viewport(viewX ?? 0, viewY ?? 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(bgR ?? 0, bgG ?? 0, bgB ?? 0, bgA ?? 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  return {
    gl: gl,
    program: program,
  }
}

export default initializeInstance
