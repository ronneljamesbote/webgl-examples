#version 300 es
// Vertex shader for using pixels as positions with bottom-left corner as origin
in vec2 a_position;

uniform float u_resolution;

void main() {
  // Pixel to 1.0
  vec2 valueA = a_position / u_resolution;
  // Double 1.0 to 2.0
  vec2 valueB = valueA * 2.0;
  // Shift 2.0 to 1.0
  vec2 valueC = valueB - 1.0;
  gl_Position = vec4(valueC, 0, 1);
}
