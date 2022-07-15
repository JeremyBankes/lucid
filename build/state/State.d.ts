export default class State {
    private _loaded;
    loadImmediately: boolean;
    automaticallyUnload: boolean;
    constructor(loadImmediately?: boolean, automaticallyUnload?: boolean);
    get loaded(): boolean;
    get name(): string;
    load(): Promise<void>;
    unload(): Promise<void>;
    enter(oldState: State): void;
    update(deltaTime: number): void;
    exit(newState: State): void;
}
