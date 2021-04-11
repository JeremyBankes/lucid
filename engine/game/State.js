import StateManager from './StateManager.js'

class State {

    /**
     * Createa a state, mangaged by 'manager'. Note that this class is meant to be overridden to
     * allow for custom application specific states. 
     * @param {StateManager} manager 
     */
    constructor(manager) {
        this.manager = manager;
    }

    async initialize() { }

    enter() {}

    update(deltaTime) {
        this.renderer.fillRectangle(0, 0, this.renderer.width, this.renderer.height, '#000000');
    }

    exit() { }

    /**
     * Called by Game whenever a keyboard or mouse event is received on the interface
     * @param {Event} event The event that is being receieved
     */
    receiveEvent(event) { }

    get name() { return this.constructor.name; }

    get game() { return this.manager.game; }

    get renderer() { return this.game.renderer; }

}

export default State;