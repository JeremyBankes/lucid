import Renderer from '/scripts/engine/graphics/Renderer.js';
import RootComponent from '/scripts/engine/interface/RootComponent.js';

export default class State {

    /**
     * @param {object} options
     * @param {string} options.name
     */
    constructor(options) {
        this.name = options.name;
        this.root = new RootComponent({ bounds: [0, 0, 1, 1] });
    }

    /**
     * @param {Renderer} renderer
     */
    onUpdate(renderer) {
        this.root.onUpdate(renderer);
    }

    /**
     * @param {State} oldState
     */
    onEnter(oldState) { }

    /**
     * @param {State} newState
     */
    onExit(newState) { }

}