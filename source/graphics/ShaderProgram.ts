import Renderer from './Renderer.js';
import Shader from './Shader.js';

export default class ShaderProgram {

    private _renderer: Renderer;
    private _handle: WebGLProgram;

    public constructor(renderer: Renderer, vertexShader: Shader, fragmentShader: Shader) {
        this._renderer = renderer;
        this._handle = this.gl.createProgram();
        this.gl.attachShader(this._handle, vertexShader.handle);
        this.gl.attachShader(this._handle, fragmentShader.handle);
        this.gl.linkProgram(this._handle);
        if (!this.gl.getProgramParameter(this._handle, this.gl.LINK_STATUS)) {
            const details = this.gl.getProgramInfoLog(this._handle);
            throw new Error(`Could not link shader program.\n${details}`);
        }
    }

    private get gl() {
        return this._renderer.gl;
    }

    public get handle() {
        return this._handle;
    }

}