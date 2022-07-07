import Renderer from '/engine/graphics/Renderer.js';

export default class Buffer {

    /**
     * @param {object} options 
     * @param {Renderer} options.renderer
     * @param {number[]} options.data
     */
    constructor(options) {
        this._renderer = options.renderer;
        this._handle = this._renderer.context.createBuffer();
        this.setData(options.data);
    }

    get valid() {
        return this._handle !== null;
    }

    bind() {
        this._renderer.context.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this._handle);
    }

    delete() {
        this._renderer.context.deleteBuffer(this._handle);
        this._handle = null;
    }

    /**
     * @param {number[]} data 
     */
    setData(data) {
        this.bind();
        this._renderer.context.bufferData(
            WebGLRenderingContext.ARRAY_BUFFER,
            new Float32Array(data),
            WebGLRenderingContext.STATIC_DRAW
        );
    }

}