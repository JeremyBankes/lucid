import AssetManager from './assets/AssetManager.js';
import Clock from './Clock.js';
import Renderer from './graphics/Renderer.js';
import StateManager from './state/StateManager.js';
export default class Application {
    clock: Clock;
    assets: AssetManager;
    states: StateManager;
    renderer: Renderer;
    constructor(canvas: HTMLCanvasElement);
    start(): Promise<void>;
    update(deltaTime: number): void;
}
