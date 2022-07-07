#version 300 es
in vec4 a_position;

out vec4 v_color;

void main() {
    gl_Position = a_position;

    // Convert from clip space to color space.
    // Clip space goes -1.0 to +1.0
    // Color space goes from 0.0 to 1.0
    v_color = a_position * 0.5 + 0.5;
}
