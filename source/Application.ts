import { AssetManager } from "./assets/AssetManager";
import { DomLoader } from "./assets/DomLoader";
import { ImageBitmapLoader } from "./assets/ImageBitmapLoader";
import { JsonLoader } from "./assets/JsonLoader";
import { TextLoader } from "./assets/TextLoader";
import { Clock } from "./utilities/Clock";
import { Renderer } from "./graphics/Renderer";
import { StateManager } from "./states/StateManager";
import { Color } from "./utilities/Color";

export class Application {

    public clock: Clock;
    public assets: AssetManager;
    public states: StateManager;
    public renderer: Renderer;

    public constructor(canvas: HTMLCanvasElement) {
        this.clock = new Clock();
        this.assets = new AssetManager();
        this.states = new StateManager();
        this.renderer = new Renderer({ clearColor: Color.from(0x000000FF) });

        this.assets.register(new TextLoader());
        this.assets.register(new DomLoader());
        this.assets.register(new JsonLoader());
        this.assets.register(new ImageBitmapLoader());
    }

    public async start() {
        await this.states.load();
        let lastAnimationFrameTime = performance.now();
        const receiveFrame: FrameRequestCallback = (currentTime) => {
            const deltaTime = currentTime - lastAnimationFrameTime;
            this.update(deltaTime);
            lastAnimationFrameTime = currentTime;
            window.requestAnimationFrame(receiveFrame);
        };
        window.requestAnimationFrame(receiveFrame);
    }

    public update(deltaTime: number) {
        this.states.update(deltaTime);
    }

}