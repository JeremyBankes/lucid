import Renderer from '/scripts/engine/graphics/Renderer.js';

export default class Camera {

    /**
     * @param {object} options
     * @param {Renderer} options.renderer
     */
    constructor(options) {
        this._renderer = options.renderer;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {[number, number, number, number]}
     */
    toScreen(x, y, width, height) {
        return [x, y, width, height];
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {[number, number, number, number]}
     */
    fromScreen(x, y, width, height) {
        return [x, y, width, height];
    }

}