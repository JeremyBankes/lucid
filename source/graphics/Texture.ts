import Renderer from './Renderer';

export default class Texture {

    private _gl: WebGL2RenderingContext;
    private _handle: WebGLTexture;

    public constructor(renderer: Renderer, source?: TexImageSource) {
        this._gl = renderer.gl;
        this._handle = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, source);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    }

    private get gl() {
        return this._gl;
    }

    public get handle() {
        return this._handle;
    }

}