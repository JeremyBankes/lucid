import Renderer from '../graphics/Renderer.js';
import Interface from './Interface.js';
import StateManager from './StateManager.js';

class Game {

    constructor(canvasId, width = 400, height = 300) {
        const canvas = document.getElementById(canvasId);
        this.renderer = new Renderer(canvas, width, height);
        this.interface = new Interface(canvas);
        this.stateManager = new StateManager(this);
        this.age = 0;

        const events = [
            'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'mousemove',
            'keyup', 'keydown', 'keypress'
        ];

        this.interface.overlay.addEventListener('load', () => events.forEach(event => {
            this.interface.document.addEventListener(event, event => this.receiveEvent(event));
        }));
    }

    async initialize() {
    }

    async start() {
        await this.initialize();

        // Game Loop
        let lastUpdate = performance.now();
        const animate = currentTime => {
            this.update((currentTime - lastUpdate) / 1000);
            lastUpdate = currentTime;
            requestAnimationFrame(animate);
        };
        animate(lastUpdate);
    }

    update(deltaTime) {
        this.stateManager.update(deltaTime);
        this.age += deltaTime;
    }

    /**
     * Called by Game whenever a keyboard or mouse event is received on the interface
     * @param {Event} event The event that is being receieved
     */
    receiveEvent(event) {
        if (this.stateManager.currentState) this.stateManager.currentState.receiveEvent(event);
    }

}

export default Game;