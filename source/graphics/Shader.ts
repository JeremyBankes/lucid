import Renderer from './Renderer.js';

export type ShaderType = 'vertex' | 'fragment';

export default class Shader {

    private _renderer: Renderer;
    private _type: ShaderType;
    private _handle: WebGLShader;

    public constructor(renderer: Renderer, type: ShaderType, source: string) {
        this._type = type;
        this._handle = renderer.gl.createShader(type === 'vertex' ? renderer.gl.VERTEX_SHADER : renderer.gl.FRAGMENT_SHADER);
        this._renderer = renderer;
        renderer.gl.shaderSource(this._handle, source);
        this.gl.compileShader(this._handle);
        if (!this.gl.getShaderParameter(this._handle, this.gl.COMPILE_STATUS)) {
            const details = this.gl.getShaderInfoLog(this._handle);
            throw new Error(`Could not compile ${this.type} shader.\n${details}`);
        }
    }

    private get gl() {
        return this._renderer.gl;
    }

    public get type() {
        return this._type;
    }

    public get handle() {
        return this._handle;
    }

}