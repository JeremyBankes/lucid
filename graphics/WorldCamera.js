import Camera from './Camera.js';
import Renderer from './Renderer.js';

export default class WorldCamera extends Camera {

    /**
     * @param {object} options
     * @param {Renderer} options.renderer
     * @param {number} options.pixelsPerUnit
     */
    constructor(options) {
        super(options);
        this._pixelsPerUnit = options.pixelsPerUnit;
        this._effectivePixelsPerUnit = this._pixelsPerUnit;
        this.zoom = 1;
    }

    /**
     * @param {number} value
     */
    set zoom(value) {
        this._effectivePixelsPerUnit = this._pixelsPerUnit * value;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {[number, number, number, number]}
     */
    toScreen(x, y, width, height) {
        return [
            x * this._effectivePixelsPerUnit + this._renderer.width / 2,
            y * this._effectivePixelsPerUnit + this._renderer.height / 2,
            width * this._effectivePixelsPerUnit,
            height * this._effectivePixelsPerUnit
        ];
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {[number, number, number, number]}
     */
    fromScreen(x, y, width, height) {
        return [
            (x - this._renderer.width / 2) / this._effectivePixelsPerUnit,
            (y - this._renderer.height / 2) / this._renderer.height,
            width / this._effectivePixelsPerUnit,
            height / this._effectivePixelsPerUnit
        ];
    }

}