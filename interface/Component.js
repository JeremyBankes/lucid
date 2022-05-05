import Renderer from '/scripts/engine/graphics/Renderer.js';

export default class Component {

    /**
     * @param {object} options
     * @param {[number, number, number, number]} [options.bounds]
     * @param {[number, number, number, number]} [options.margin]
     * @param {[number, number, number, number]} [options.padding]
     * @param {string | CanvasGradient | CanvasPattern} [options.background]
     */
    constructor(options) {
        /** @type {Component} */ this._parent = null;
        if ('bounds' in options) {
            this.x = options.bounds[0];
            this.y = options.bounds[1];
            this.width = options.bounds[2];
            this.height = options.bounds[3];
        } else {
            this.x = 0;
            this.y = 0;
            this.width = 1;
            this.height = 1;
        }
        /** @type {[number, number, number, number]} */ this.margin = 'margin' in options ? options.margin : [0, 0, 0, 0];
        /** @type {[number, number, number, number]} */ this.padding = 'padding' in options ? options.padding : [0, 0, 0, 0];
        /** @type {string | CanvasGradient | CanvasPattern} */  this.background = 'background' in options ? options.background : 'dimgray';
    }

    /**
     * @param {Renderer} renderer
     */
    getScreenBounds(renderer) {
        const parentBounds = this._parent.getScreenBounds(renderer);
        return [
            Math.round(parentBounds[0] + this.x * parentBounds[2] + this.margin[3]),
            Math.round(parentBounds[1] + this.y * parentBounds[3] + this.margin[0]),
            Math.round(Math.min(parentBounds[2] - this.margin[1] - this.margin[3], this.width * parentBounds[2])),
            Math.round(Math.min(parentBounds[3] - this.margin[0] - this.margin[2], this.height * parentBounds[3]))
        ];
    }

    /**
     * @param {Renderer} renderer
     */
    onUpdate(renderer) {
        renderer.context.fillStyle = this.background;
        renderer.drawRectangle(...this.getScreenBounds(renderer));
    }

}