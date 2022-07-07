import AssetManager from '/engine/AssetManager.js';
import Clock from '/engine/Clock.js';

export default class Application {

    /**
     * Creates a new application.
     * @param {HTMLCanvasElement} canvas The canvas to render to. 
     */
    constructor(canvas) {
        this.clock = new Clock();
        this.assets = new AssetManager();

        this._context = canvas.getContext('webgl2');
    
        if (this._context === null) {
            throw new Error('Browser does not support WebGL2.');
        }

        this._start();
    }

    get canvas() { return this._context.canvas; }

    _start() {
        const frameRequestCallback = () => {
            this.update(this.clock.deltaTime);
            window.requestAnimationFrame(frameRequestCallback);
        };
        window.requestAnimationFrame(frameRequestCallback);
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
    }

}