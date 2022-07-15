import Renderer from './Renderer.js';
import Shader from './Shader.js';
export default class ShaderProgram {
    private _renderer;
    private _handle;
    constructor(renderer: Renderer, vertexShader: Shader, fragmentShader: Shader);
    private get gl();
    get handle(): WebGLProgram;
}
