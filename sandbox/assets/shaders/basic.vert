#version 300 es

in vec3 vertexPosition;

void main() {
    gl_Position = vec4(vertexPosition, 1);
}