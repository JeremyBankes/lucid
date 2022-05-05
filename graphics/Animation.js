import Lucid from '../Lucid.js';
import Renderer from './Renderer.js';
import SpriteSheet from './SpriteSheet.js';

export default class Animation {

    /**
     * @param {object} options
     * @param {SpriteSheet} options.spriteSheet
     * @param {number} options.firstSpriteIndex
     * @param {number} options.lastSpriteIndex
     * @param {number} [options.frameRate]
     */
    constructor(options) {
        this._id = Lucid.tools.generateId();
        this._spriteSheet = options.spriteSheet;
        this._firstSpriteIndex = options.firstSpriteIndex;
        this._lastSpriteIndex = options.lastSpriteIndex;
        this._currentIndex = options.firstSpriteIndex;
        this.frameRate = 'frameRate' in options ? options.frameRate : 16;
    }

    get name() {
        return this.name;
    }

    get currentIndex() {
        return this._currentIndex;
    }

    get spriteSheet() {
        return this._spriteSheet;
    }

    restart() {
        this._currentIndex = this._firstSpriteIndex;
    }

    /**
     * @param {Renderer} renderer
     */
    onUpdate(renderer) {
        if (Lucid.timer.elapsed(this._id, 1 / this.frameRate, renderer.deltaTime)) {
            this._currentIndex++;
            if (this._currentIndex > this._lastSpriteIndex) {
                this.restart();
            }
        }
    }

}