var Renderer = /** @class */ (function () {
    function Renderer(canvas) {
        var context = canvas.getContext('webgl2');
        if (context === null) {
            throw new Error('Failed to aquire WebGL2 context.');
        }
        this.context = context;
    }
    Object.defineProperty(Renderer.prototype, "canvas", {
        get: function () {
            return this.context.canvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "aspectRatio", {
        get: function () {
            return this.width / this.height;
        },
        enumerable: false,
        configurable: true
    });
    return Renderer;
}());
export default Renderer;
