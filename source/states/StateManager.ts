import { Data } from "@jeremy-bankes/toolbox";
import { State } from "./State";

interface StateMap {
    [key: string]: State
}

export class StateManager {

    private _stateMap: StateMap;
    private _currentState?: State;
    private _loaded: boolean;

    public constructor() {
        this._stateMap = {};
        this._currentState = undefined;
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
            return undefined;
        }
    }

    public update(deltaTime: number) {
        if (this._currentState !== undefined) {
            this._currentState.update(deltaTime);
        }
    }

    public async change(stateName: string) {
        const newState = this.getState(stateName);
        Data.assert(newState !== undefined, `Failed to find state named "${stateName}".`);
        const oldState = this._currentState;
        if (oldState !== undefined) {
            oldState.exit(newState);
        }
        this._currentState = newState;
        if (!newState.loaded && this._loaded) {
            await newState.load();
        }
        newState.enter(oldState);
        if (oldState !== undefined && oldState.automaticallyUnload) {
            oldState.unload();
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