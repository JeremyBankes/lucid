import Texture from './Texture.js';

/**
 * Represents a texture holding a collection of sub-textures where each sub-texture can be individually drawn to a canvas rendering context
 */
 class SpriteSheet extends Texture {

    /**
     * Creates a texture. The width and height can be left undefined if the texture data is planned to come from load()
     * @param {number} spriteWidth The width of an individual sprite (sub-texture)
     * @param {number} spriteHeight The height of an individual sprite (sub-texture)
     * @param {number} spriteCount The number of sprites contained in the sheet
     * @param {number} width The width of the texture to create
     * @param {number} height The height of the texture to create
     */
    constructor(spriteWidth, spriteHeight, spriteCount) {
        super();
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteCount = spriteCount;
        this.gridWidth = 0;
        this.gridHeight = 0;
    }

    /**
     * Loads the sprite sheet.
     * @param {string} source The address or URL of the sprite sheet to be loaded.
     * @returns {Promise} A promise that resolves if loading is successful, rejects otherwise.
     */
    async load(source) {
        if (!source) throw 'invalid sprite sheet source';
        await super.load(source);
        this.gridWidth = Math.floor(this.width / this.spriteWidth);
        this.gridHeight = Math.floor(this.height / this.spriteHeight);
    }

    clone() {
        const spriteSheet = new SpriteSheet(this.spriteWidth, this.spriteHeight, this.spriteCount);
        spriteSheet.gridWidth = this.gridWidth;
        spriteSheet.gridHeight = this.gridHeight;
        spriteSheet.workingContext.drawImage(this.workingContext.canvas, 0, 0);
        spriteSheet.imageData = spriteSheet.workingContext.getImageData(0, 0, this.width, this.height);
        return spriteSheet;
    }

    /**
     * Draws a given sprite into the given canvas rendering context
     * width and/or height can be left undefined to use the sprite dimensions
     * @param {CanvasRenderingContext2D} context The context to draw the sprite to
     * @param {number} spriteIndex The index of the sprite to be drawn
     * @param {number} x The x coordinate of which to draw the sprite (from the left edge)
     * @param {number} y The y coordinate of which to the sprite (from the top edge)
     * @param {number} width The width of which to draw the sprite
     * @param {number} height The height of which to draw the sprite
     */
    drawSprite(context, spriteIndex, x, y, width, height) {
        if (!width) width = this.spriteWidth;
        if (!height) height = this.spriteHeight;
        let spriteX = (spriteIndex % this.gridWidth) * this.spriteWidth;
        let spriteY = Math.floor(spriteIndex / this.gridWidth) * this.spriteWidth;
        super.draw(context, x, y, width, height, spriteX, spriteY, this.spriteWidth, this.spriteHeight);
    }

}

export default SpriteSheet;