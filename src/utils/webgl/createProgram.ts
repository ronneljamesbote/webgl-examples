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

export default createProgram
