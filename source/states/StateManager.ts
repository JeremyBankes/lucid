import State from './State';

interface StateMap {
    [key: string]: State
}

export default class StateManager {

    private _stateMap: StateMap;
    private _currentState?: State;
    private _loaded: boolean;

    public constructor() {
        this._stateMap = {};
        this._currentState = null;
        this._loaded = false;
    }

    public register(state: State) {
        this._stateMap[state.name] = state;
    }

    public unregister(stateName: string) {
        const state = this._stateMap[stateName];
        delete this._stateMap[stateName];
        return state;
    }

    public getState(stateName: string) {
        if (stateName in this._stateMap) {
            return this._stateMap[stateName];
        } else {
            return null;
        }
    }

    public update(deltaTime: number) {
        if (this._currentState !== null) {
            this._currentState.update(deltaTime);
        }
    }

    public async change(stateName: string) {
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

    public async load() {
        const tasks: Promise<void>[] = [];
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