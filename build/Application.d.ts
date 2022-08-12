import AssetManager from './assets/AssetManager';
import Clock from './Clock';
import Renderer from './graphics/Renderer';
import StateManager from './states/StateManager';
export default class Application {
    clock: Clock;
    assets: AssetManager;
    states: StateManager;
    renderer: Renderer;
    constructor(canvas: HTMLCanvasElement);
    start(): Promise<void>;
    update(deltaTime: number): void;
}
