import AssetManager from './assets/AssetManager.js';
import DomLoader from './assets/DomLoader.js';
import ImageBitmapLoader from './assets/ImageBitmapLoader.js';
import JsonLoader from './assets/JsonLoader.js';
import TextLoader from './assets/TextLoader.js';
import Clock from './Clock.js';
import Renderer from './graphics/Renderer.js';
import ShaderLoader from './graphics/ShaderLoader.js';
import StateManager from './state/StateManager.js';

export default class Application {

    public clock: Clock;
    public assets: AssetManager;
    public states: StateManager;
    public renderer: Renderer;

    public constructor(canvas: HTMLCanvasElement) {
        this.clock = new Clock();
        this.assets = new AssetManager();
        this.states = new StateManager();
        this.renderer = new Renderer(canvas);

        this.assets.register(new TextLoader());
        this.assets.register(new DomLoader());
        this.assets.register(new JsonLoader());
        this.assets.register(new ImageBitmapLoader());
        this.assets.register(new ShaderLoader(this.renderer));
    }

    public async start() {
        await this.states.load();
        let lastAnimationFrameTime = performance.now();
        const receiveFrame = (currentTime: DOMHighResTimeStamp) => {
            const deltaTime = currentTime - lastAnimationFrameTime;
            this.update(deltaTime);
            lastAnimationFrameTime = currentTime;
            window.requestAnimationFrame(receiveFrame);
        };
        window.requestAnimationFrame(receiveFrame);
    }

    public update(deltaTime: number) {
        this.renderer.startRender();
        this.states.update(deltaTime);
    }

}