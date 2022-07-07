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

export default compileShader
