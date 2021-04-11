import SpriteSheet from "./SpriteSheet.js";

/**
 * Represents the controller for a sprite sheet to allow for the progressional changing of frames. Aka, animation.
 */
 class SpriteAnimation {

    /**
     * Create an animation
     * @param {SpriteSheet} spriteSheet The sprite sheet for the animation
     * @param {number} fps The number of frames per second
     * @param {number} startIndex The sprite sheet index at which the animation should start
     * @param {number} endIndex The sprite sheet index at which the animation should end
     * @param {bool} loop True if the animation should loop, false if it should only play once
     */
    constructor(spriteSheet, fps, startIndex = 0, endIndex = spriteSheet.spriteCount, loop = true) {
        this.spriteSheet = spriteSheet;
        this.frameTime = 1.0 / fps;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.loop = loop;
        this.currentIndex = startIndex;
        this.timer = 0;
    }

    /**
     * Update the animation, this method must be called frequently for accurate frame rates (from the game loop)
     * @param {number} deltaTime The time in seconds since the last update
     */
    update(deltaTime) {
        if (this.timer > this.frameTime) {
            if (this.currentIndex < this.endIndex) this.currentIndex++;
            else if (this.loop) this.currentIndex = this.startIndex;
            this.timer -= this.frameTime;
        }
        this.timer += deltaTime;
    }

    /**
     * Resets the animation back to the starting frame
     */
    reset() {
        this.currentIndex = this.startIndex;
        this.timer = 0;
    }

    /**
     * Draws the current frame of the animation
     * @param {CanvasRenderingContext2D} context The context to draw the current frame to
     * @param {number} x The x coordinate of which to draw the current frame (from the left edge)
     * @param {number} y The y coordinate of which to the current frame (from the top edge)
     * @param {number} width The width of which to draw the current frame
     * @param {number} height The height of which to draw the current frame
     */
    draw(context, x, y, scale = 1) {
        this.spriteSheet.drawSprite(context, this.currentIndex, x, y, this.spriteSheet.spriteWidth * scale, this.spriteSheet.spriteHeight * scale);
    }

}

export default SpriteAnimation;