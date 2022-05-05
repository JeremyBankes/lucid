import Texture from '/scripts/engine/graphics/Texture.js';

export default class SpriteSheet extends Texture {

    /**
     * @param {object} options
     * @param {ImageBitmapSource|string} [options.source]
     * @param {number} options.spriteWidth
     * @param {number} options.spriteHeight
     * @param {number} options.spriteCount
     */
    constructor(options) {
        super(options);
        this._spriteWidth = options.spriteWidth;
        this._spriteHeight = options.spriteHeight;
        this._spriteCount = options.spriteCount;
    }

    get spriteWidth() {
        return this._spriteWidth;
    }

    get spriteHeight() {
        return this._spriteHeight;
    }

    get spriteCount() {
        return this._spriteCount;
    }

    /**
     * @param {number} spriteIndex 
     * @returns The bounds of a sprite within a sheet
     */
    getSpriteBounds(spriteIndex) {
        const spritesAcross = this.width / this._spriteWidth;
        const spriteX = spriteIndex % spritesAcross;
        const spriteY = Math.floor(spriteIndex / spritesAcross);
        return [spriteX * this._spriteWidth, spriteY * this._spriteHeight, this._spriteWidth, this._spriteHeight];
    }

    clone() {
        const spriteSheet = new SpriteSheet({
            source: this._source,
            spriteWidth: this.spriteWidth,
            spriteHeight: this.spriteHeight,
            spriteCount: this.spriteCount
        });
        spriteSheet.canvas.width = this.canvas.width;
        spriteSheet.canvas.height = this.canvas.height;
        spriteSheet.bufferContext.putImageData(this.bufferContext.getImageData(0, 0, this.width, this.height), 0, 0);
        return spriteSheet;
    }

}