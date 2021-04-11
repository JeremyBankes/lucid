import Game from './Game.js'
import State from './State.js';

/**
 * Manages the entering, exiting and updating of the states of a game.
 */
class StateManager {

    /**
     * Creates a manager for states within the given game
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.states = {}
        this.currentStateName = null;
    }

    update(deltaTime) {
        if (this.currentState) {
            this.currentState.update(deltaTime);
        }
    }

    /**
     * Registers a state that can be entered and exited
     * @param {State} state The state to be registered
     */
    async registerState(state) {
        this.states[state.name] = state;
        await state.initialize();
    }

    /**
     * Enters a given state
     * @param {string} stateName The name of the state to enter
     */
    enterState(stateName) {
        const state = this.getState(stateName);
        if (!state) throw 'attempted to enter unregistered state';
        this.currentStateName = stateName;
        state.enter();
    }

    /**
     * Retrieves a State by name
     * @param {string} stateName The name of the state to be retrieved
     * @returns {State} A State object
     */
    getState(stateName) {
        const state = this.states[stateName];
        return state ? state : null;
    }

    /**
     * Sets the current State by name
     * @param {string} stateName The name of the state to be set
     */
    setState(stateName) {
        if (this.currentState) this.currentState.exit();
        if (!this.states[stateName]) throw `unregistered state "${stateName}"`;
        this.currentStateName = stateName;
        this.currentState.enter();
    }

    /**
     * @returns {State} The currently active State object
     */
    get currentState() { return this.getState(this.currentStateName); }

}

export default StateManager;