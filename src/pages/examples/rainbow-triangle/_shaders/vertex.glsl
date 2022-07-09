#version 300 es
in vec2 a_position;

uniform float u_resolution;
uniform vec2 u_translation;

out vec4 v_color;

void main() {
    vec2 translated = a_position + u_translation;
    vec2 valueA = translated / u_resolution;
    vec2 valueB = valueA * 2.0;
    vec2 valueC = valueB - 1.0;
    vec4 position = vec4(valueC, 0 ,1);
    gl_Position = position;

    // Convert from clip space to color space.
    // Clip space goes -1.0 to +1.0
    // Color space goes from 0.0 to 1.0
    v_color = position * 0.5 + 0.5;
}
