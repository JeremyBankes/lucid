export default class State {
    _loaded;
    loadImmediately;
    automaticallyUnload;
    constructor(loadImmediately = true, automaticallyUnload = true) {
        this._loaded = false;
        this.loadImmediately = loadImmediately;
        this.automaticallyUnload = automaticallyUnload;
    }
    get loaded() {
        return this._loaded;
    }
    get name() {
        return this.constructor['name'];
    }
    async load() {
        this._loaded = true;
        console.debug(`Loaded ${this.name}.`);
    }
    async unload() {
        this._loaded = false;
        console.debug(`Unloaded ${this.name}.`);
    }
    enter(oldState) {
        console.debug(`Entered ${this.name}.`);
    }
    ;
    update(deltaTime) { }
    exit(newState) {
        console.debug(`Exited ${this.name}.`);
    }
    ;
}
