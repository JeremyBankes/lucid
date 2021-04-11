import State from '../game/State.js';

/**
 * TO-OD
 */
class Effect {

    /**
     * 
     * @param {State} state 
     */
    constructor(state) {
        this.state = state;
    }

    update(deltaTime) { }

    get game() { return this.state.manager.game; }

    get renderer() { return this.state.game.renderer; }

}

export default Effect;