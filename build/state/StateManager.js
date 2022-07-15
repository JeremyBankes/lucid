export default class StateManager {
    _stateMap;
    _currentState;
    _loaded;
    constructor() {
        this._stateMap = {};
        this._currentState = null;
        this._loaded = false;
    }
    register(state) {
        this._stateMap[state.name] = state;
    }
    unregister(stateName) {
        const state = this._stateMap[stateName];
        delete this._stateMap[stateName];
        return state;
    }
    getState(stateName) {
        if (stateName in this._stateMap) {
            return this._stateMap[stateName];
        }
        else {
            return null;
        }
    }
    update(deltaTime) {
        if (this._currentState !== null) {
            this._currentState.update(deltaTime);
        }
    }
    async change(stateName) {
        const newState = this.getState(stateName);
        const oldState = this._currentState;
        if (oldState !== null) {
            this._currentState.exit(newState);
        }
        this._currentState = newState;
        if (!newState.loaded && this._loaded) {
            await newState.load();
        }
        newState.enter(oldState);
        if (oldState !== null) {
            if (oldState.automaticallyUnload) {
                oldState.unload();
            }
        }
    }
    async load() {
        const tasks = [];
        for (const stateName in this._stateMap) {
            const state = this._stateMap[stateName];
            if (!state.loaded && state.loadImmediately) {
                tasks.push(state.load());
            }
        }
        await Promise.all(tasks);
        this._loaded = true;
    }
}
