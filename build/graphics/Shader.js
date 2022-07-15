export default class Shader {
    _renderer;
    _type;
    _handle;
    constructor(renderer, type, source) {
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
    get gl() {
        return this._renderer.gl;
    }
    get type() {
        return this._type;
    }
    get handle() {
        return this._handle;
    }
}
