import { Clock, Color } from "@jeremy-bankes/toolbox/shared";
import { AssetManager } from "@jeremy-bankes/toolbox/client";
import { Renderer } from "./graphics/Renderer";
import { StateManager } from "./states/StateManager";

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