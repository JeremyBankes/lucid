import SpriteAnimation from "./SpriteAnimation.js";

class SpriteAnimationSet {

    constructor() {
        this._currentAnimationName = null;
        this.animations = {};
    }

    get current() {
        return this.animations[this._currentAnimationName];
    }

    /**
     * Adds a named SpriteAnimation to the set
     * @param {string} name The name of the animation
     * @param {SpriteAnimation} animation The sprite animation
     */
    add(name, animation) {
        this.animations[name] = animation;
        if (!this._currentAnimationName) this._currentAnimationName = name;
    }

    /**
     * Update the current animation, this method must be called frequently for accurate frame rates (from the game loop)
     * @param {number} deltaTime The time in seconds since the last update
     */
    update(deltaTime) {
        if (!this.animations[this._currentAnimationName]) return;
        this.animations[this._currentAnimationName].update(deltaTime);
    }

    /**
     * Draws the current frame of the current animation
     * @param {CanvasRenderingContext2D} context The context to draw the current frame to
     * @param {number} x The x coordinate of which to draw the current frame (from the left edge)
     * @param {number} y The y coordinate of which to the current frame (from the top edge)
     * @param {number} scale The scale of which to draw the current frame
     */
    draw(context, x, y, scale = 1) {
        const animation = this.animations[this._currentAnimationName];
        if (!animation) return;
        animation.draw(context, x, y, scale);
    }

}

export default SpriteAnimationSet;