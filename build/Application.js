import AssetManager from './assets/AssetManager';
import DomLoader from './assets/DomLoader';
import ImageBitmapLoader from './assets/ImageBitmapLoader';
import JsonLoader from './assets/JsonLoader';
import TextLoader from './assets/TextLoader';
import Clock from './Clock';
import Renderer from './graphics/Renderer';
import ShaderLoader from './graphics/ShaderLoader';
import StateManager from './states/StateManager';
export default class Application {
    clock;
    assets;
    states;
    renderer;
    constructor(canvas) {
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
    async start() {
        await this.states.load();
        let lastAnimationFrameTime = performance.now();
        const receiveFrame = (currentTime) => {
            const deltaTime = currentTime - lastAnimationFrameTime;
            this.update(deltaTime);
            lastAnimationFrameTime = currentTime;
            window.requestAnimationFrame(receiveFrame);
        };
        window.requestAnimationFrame(receiveFrame);
    }
    update(deltaTime) {
        this.renderer.startRender();
        this.states.update(deltaTime);
    }
}
