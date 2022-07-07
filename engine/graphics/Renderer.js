export default class Renderer {

    static GL = WebGL2RenderingContext;

    /**
     * @param {object} options 
     * @param {WebGL2RenderingContext} options.context 
     */
    constructor(options) {
        this._context = options.context;
        this.context.enable(Renderer.GL.DEPTH_TEST);
    }

    get context() { return this._context; }

    /**
     * @param {number} deltaTime
     */
    update(deltaTime) {
        this.clear();
    }

    clear() {
        this.context.clearColor(0.05, 0.15, 0.15, 1.0);
        this.context.clear(Renderer.GL.COLOR_BUFFER_BIT | Renderer.GL.DEPTH_BUFFER_BIT);
    }

}