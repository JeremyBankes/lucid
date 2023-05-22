
export class State {

    private _loaded: boolean;
    public loadImmediately: boolean;
    public automaticallyUnload: boolean;

    public constructor(loadImmediately: boolean = true, automaticallyUnload = true) {
        this._loaded = false;
        this.loadImmediately = loadImmediately;
        this.automaticallyUnload = automaticallyUnload;
    }

    public get loaded() {
        return this._loaded;
    }

    public get name() {
        return this.constructor["name"];
    }

    public async load() {
        this._loaded = true;
        console.debug(`Loaded ${this.name}.`);
    }

    public async unload() {
        this._loaded = false;
        console.debug(`Unloaded ${this.name}.`);
    }

    public enter(oldState: State) {
        console.debug(`Entered ${this.name}.`);
    };

    public update(deltaTime: number) { }

    public exit(newState: State) {
        console.debug(`Exited ${this.name}.`);
    };

}