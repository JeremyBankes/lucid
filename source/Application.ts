import { Clock, Color, Data } from "@jeremy-bankes/toolbox/shared";
import { AssetManager } from "@jeremy-bankes/toolbox/client";
import { Renderer } from "./graphics/Renderer";
import { StateManager } from "./states/StateManager";

export class Application {

    public canvas: HTMLCanvasElement;
    public clock: Clock;
    public assets: AssetManager;
    public states: StateManager;
    public renderer: Renderer;

    private _running: boolean;
    private _gameTask?: Promise<void>;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.clock = new Clock();
        this.assets = new AssetManager();
        this.states = new StateManager();
        this.renderer = new Renderer({ clearColor: Color.from(0x000000FF) });
        this._running = false;
    }

    public async initialize() {
        const context = this.canvas.getContext("webgpu");
        Data.assert(context !== null, "Failed to get WebGPU canvas context. It seems your browser does not support this feature!");
        await this.renderer.initialize(context);
    }

    public async terminate() { }

    public async start() {
        await this.states.load();
        await this.initialize();
        this._gameTask = new Promise<void>((resolve) => {
            let lastAnimationFrameTime = performance.now();
            const receiveFrame: FrameRequestCallback = (currentTime) => {
                if (this._running) {
                    const deltaTime = currentTime - lastAnimationFrameTime;
                    this.update(deltaTime);
                    lastAnimationFrameTime = currentTime;
                    window.requestAnimationFrame(receiveFrame);
                } else {
                    resolve();
                }
            };
            window.requestAnimationFrame(receiveFrame);
        });
        await this.terminate();
    }

    public async stop() {
        this._running = false;
        if (this._gameTask !== undefined) {
            await this._gameTask;
        }
    }

    public update(deltaTime: number) {
        this.states.update(deltaTime);
    }

    public get running() {
        return this._running;
    }

}