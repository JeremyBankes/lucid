import Renderer from '/scripts/engine/graphics/Renderer.js';
import Container from '/scripts/engine/interface/Container.js';

export default class RootComponent extends Container {

    /**
     * @param {object} options
     */
    constructor(options) {
        super(options);
    }

    /**
     * @param {Renderer} renderer
     */
    getScreenBounds(renderer) {
        return [0, 0, renderer.width, renderer.height];
    }
}