import Renderer from '/engine/graphics/Renderer.js';

export default class Texture {

    /**
     * @param {object} options 
     * @param {Renderer} options.renderer
     * @param {TexImageSource} [options.data]
     * @param {number} [options.width]
     * @param {number} [options.height]
     * @param {Uint8Array} [options.pixels]
     */
    constructor(options) {
        this._renderer = options.renderer;
        this._handle = this._renderer.context.createTexture();
        if ('data' in options) {
            this.setData(options.data);
            this._width = options.data.width;
            this._height = options.data.height;
        } else if ('width' in options && 'height' in options) {
            this._width = options.width;
            this._height = options.height;
            let pixels = 'pixels' in options ? options.pixels : new Uint8Array(this.width * this.height * 4);
            this.bind();
            this._renderer.context.texImage2D(
                Renderer.GL.TEXTURE_2D, 0,
                Renderer.GL.RGBA,
                this.width, this.height,
                0, Renderer.GL.RGBA,
                Renderer.GL.UNSIGNED_BYTE,
                pixels
            );
        } else {
            throw new Error('Must specify data or a width and height to creat a texture');
        }
    }

    get width() { return this._width; }
    get height() { return this._height; }

    bind() {
        this._renderer.context.bindTexture(Renderer.GL.TEXTURE_2D, this._handle);
    }

    /**
     * @param {TexImageSource} data
     */
    setData(data) {
        this.bind();
        this._renderer.context.texImage2D(
            Renderer.GL.TEXTURE_2D, 0,
            Renderer.GL.RGBA,
            Renderer.GL.RGBA,
            Renderer.GL.UNSIGNED_BYTE,
            data
        );
        this._renderer.context.texParameteri(Renderer.GL.TEXTURE_2D, Renderer.GL.TEXTURE_MIN_FILTER, Renderer.GL.LINEAR);
        this._renderer.context.texParameteri(Renderer.GL.TEXTURE_2D, Renderer.GL.TEXTURE_MAG_FILTER, Renderer.GL.NEAREST);
        this._renderer.context.texParameteri(Renderer.GL.TEXTURE_2D, Renderer.GL.TEXTURE_WRAP_S, Renderer.GL.CLAMP_TO_EDGE);
        this._renderer.context.texParameteri(Renderer.GL.TEXTURE_2D, Renderer.GL.TEXTURE_WRAP_T, Renderer.GL.CLAMP_TO_EDGE);
    }

    /**
     * @param {number} slot
     */
    use(slot) {
        this._renderer.context.activeTexture(Renderer.GL[`TEXTURE${slot}`]);
        this._renderer.context.bindTexture(Renderer.GL.TEXTURE_2D, this._handle);
    }

}