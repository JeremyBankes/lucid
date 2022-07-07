import Renderer from '/engine/graphics/Renderer.js';

export default class Shader {

    static TYPE = {
        VERTEX: Renderer.GL.VERTEX_SHADER,
        FRAGMENT: Renderer.GL.FRAGMENT_SHADER
    };

    /**
     * @param {object} options 
     * @param {Renderer} options.renderer 
     * @param {number} options.type Shader.TYPE
     * @param {string} options.source
     */
    constructor(options) {
        this._renderer = options.renderer;
        this._handle = this._renderer.context.createShader(options.type);
        this._renderer.context.shaderSource(this._handle, options.source);
        this._renderer.context.compileShader(this._handle);
        if (!this._renderer.context.getShaderParameter(this._handle, Renderer.GL.COMPILE_STATUS)) {
            const log = this._renderer.context.getShaderInfoLog(this._handle);
            console.warn(`Failed to compile shader\n${log}`);
            this._renderer.context.deleteShader(this._handle);
            this._handle = null;
        }
    }

    get valid() { return this._handle !== null; }

    delete() {
        this._renderer.context.deleteShader(this._handle);
        this._handle = null;
    }

}