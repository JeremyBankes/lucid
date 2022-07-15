export default class ShaderProgram {
    _renderer;
    _handle;
    constructor(renderer, vertexShader, fragmentShader) {
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
    get gl() {
        return this._renderer.gl;
    }
    get handle() {
        return this._handle;
    }
}
