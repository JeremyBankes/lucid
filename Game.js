import Renderer from '/scripts/engine/graphics/Renderer.js';
import StateManager from '/scripts/engine/state/StateManager.js';

/**
 * A class to represent a game. Extend from this class to add application specific functionality.
 */
export default class Game {

    /**
     * Creates a game Object.
     * @param {object} options 
     * @param {HTMLCanvasElement} [options.canvas] The canvas to render the game to.
     * @param {string} [options.canvasId] The ID of the canvas to render the game to. (Ignored if options.canvas is specified.)
     */
    constructor(options) {
        if ('canvas' in options) {
            this.canvas = options.canvas;
        } else if ('canvasId' in options) {
            this.canvas = document.getElementById(options.canvasId);
            if (!(this.canvas instanceof HTMLCanvasElement)) {
                throw new Error(`#${options.canvasId} is not a canvas element.`);
            }
        }

        this._age = 0;
        this._frameRate = 0;

        this.stateManager = new StateManager();
        this.renderer = new Renderer({ context: this.canvas.getContext('2d') });
    }

    get age() {
        return this._age;
    }

    get frameRate() {
        return this._frameRate;
    }

    _start() {
        let lastUpdateTime = 0;
        /** @type {FrameRequestCallback} */
        const loop = (currentTime) => {
            this._age = currentTime / 1000;
            this.renderer.deltaTime = this._age - lastUpdateTime;
            this.onUpdate(this.renderer);
            lastUpdateTime = this._age;
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    }

    async initialize() {
        await this.load();
        this._start();
    }

    /**
     * Calls once on initialization. Used for loading resources.
     * This method is meant to be overridden.
     */
    async load() { }

    /**
     * Called on repeat, to update the entire game.
     * This method is meant to be overridden.
     * @param {Renderer} renderer The time elapsed since the last update in seconds
     */
    onUpdate(renderer) {
        const camera = this.renderer.camera;
        this.renderer.camera = null;
        this.renderer.clearRectangle();
        this.renderer.camera = camera;
        this._frameRate = 1 / renderer.deltaTime;

        if (this.stateManager.currentState !== null) {
            this.stateManager.currentState.onUpdate(renderer);
        }
    }

}