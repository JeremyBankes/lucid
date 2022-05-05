import State from '/scripts/engine/state/State.js';

export default class StateManager {

    constructor() {
        this._currentState = null;
        this._previousState = null;

        /** @type {Object.<string, State>} */ this.states = {};
    }

    get currentState() {
        return this._currentState;
    }

    get previousState() {
        return this._previousState;
    }

    /**
     * @param {string} stateName
     */
    getState(stateName) {
        return this.states[stateName];
    }

    /**
     * @param {State} state
     */
    registerState(state) {
        this.states[state.name] = state;
    }

    /**
     * @param {string} stateName
     */
    unregisterState(stateName) {
        delete this.states[stateName];
    }

    /**
     * @param {string} stateName
     */
    enterState(stateName) {
        const newState = this.getState(stateName);
        if (this.currentState !== null) {
            this._previousState = this.currentState;
            this._previousState.onExit(newState);
        }
        this._currentState = newState;
        this._currentState.onEnter(this._previousState);
    }

}