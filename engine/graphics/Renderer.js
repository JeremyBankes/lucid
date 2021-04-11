import Anchor from '../utilities/Anchor.js';
import Font from './Font.js';
import SpriteAnimation from './SpriteAnimation.js';
import SpriteAnimationSet from './SpriteAnimationSet.js';
import SpriteSheet from './SpriteSheet.js';
import Texture from './Texture.js';

class Renderer {

    /**
     * Creates a renderer
     * @param {HTMLCanvasElement} canvas The canvas element to render to
     * @param {number} width The display resolution width in pixels
     * @param {number} height The display resolution height in pixels
     * @param {Font} font The font to use when calling drawText()
     */
    constructor(canvas, width, height, font = null) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;
        this.font = font;
    }

    get width() { return this.canvas.width; }

    get height() { return this.canvas.height; }

    /**
     * Draws a texture the renderer's context
     * @param {Texture} texture The texture to be drawn
     * @param {number} x The x coordinate of which to draw the texture (from the left edge)
     * @param {number} y The y coordinate of which to draw the texture (from the top edge)
     * @param {number} width The width of which to draw the texture
     * @param {number} height The height of which to draw the texture
     * @param {number} anchor The Anchor to use for drawing
     * @param {number} subX The x coordinate of the area within the texture which to draw (from the left)
     * @param {number} subY The y cooridnate of the area within the texture which to draw (from the top)
     * @param {number} subWidth The width of the area within the texture which to draw
     * @param {number} subHeight The height of the area within the texture which to draw
     */
    drawTexture(texture, x = 0, y = 0, width = texture.width, height = texture.height, anchor = Anchor.TOP_LEFT, subX = 0, subY = 0, subWidth = texture.width, subHeight = texture.height) {
        [x, y] = Anchor.apply(anchor, x, y, width, height);
        texture.draw(this.context, x, y, width, height, subX, subY, subWidth, subHeight);
    }

    /**
     * Draws a texture the renderer's context
     * @param {SpriteSheet} spriteSheet The source sheet of the sprite to be drawn
     * @param {number} spriteIndex The index of the sprite to be drawn within its sheet
     * @param {number} x The x coordinate of which to draw the texture (from the left edge)
     * @param {number} y The y coordinate of which to draw the texture (from the top edge)
     * @param {number} width The width of which to draw the texture
     * @param {number} height The height of which to draw the texture
     * @param {number} anchor The Anchor to use for drawing
     */
    drawSprite(spriteSheet, spriteIndex = 0, x = 0, y = 0, width = spriteSheet.spriteWidth, height = spriteSheet.spriteHeight, anchor = Anchor.TOP_LEFT) {
        [x, y] = Anchor.apply(anchor, x, y, width, height);
        spriteSheet.drawSprite(this.context, spriteIndex, x, y, width, height);
    }

    /**
     * 
     * @param {SpriteAnimation} animation The animation to be drawn
     * @param {number} x The x coordinate of which to draw the animation (from the left edge)
     * @param {number} y The y coordinate of which to draw the animation (from the top edge)
     * @param {*} scale The scale at which to draw the animation
     * @param {number} anchor The Anchor to use for drawing
     */
    drawAnimation(animation, x, y, scale = 1, anchor = Anchor.TOP_LEFT) {
        [x, y] = Anchor.apply(anchor, x, y, animation.spriteSheet.spriteWidth * scale, animation.spriteSheet.spriteHeight * scale);
        animation.draw(this.context, x, y, scale);
    }


    /**
     * 
     * @param {SpriteAnimationSet} animationSet The animation to be drawn
     * @param {number} x The x coordinate of which to draw the animation (from the left edge)
     * @param {number} y The y coordinate of which to draw the animation (from the top edge)
     * @param {*} scale The scale at which to draw the animation
     * @param {number} anchor The Anchor to use for drawing
     */
    drawAnimationSet(animationSet, x, y, scale = 1, anchor = Anchor.TOP_LEFT) {
        [x, y] = Anchor.apply(anchor, x, y, animationSet.current.spriteSheet.spriteWidth * scale, animationSet.current.spriteSheet.spriteHeight * scale);
        animationSet.draw(this.context, x, y, scale);
    }

    /**
     * Fills a rectangle with the given style
     * @param {number} x The x coordinate of which to fill the rectangle (from the left edge)
     * @param {number} y The y coordinate of which to fill the rectangle (from the top edge)
     * @param {number} width The width of which to fill the rectangle
     * @param {number} height The height of which to fill the rectangle
     * @param {number} style The (Canvas 2D API) color, gradient, or pattern to fill the rectangle
     * @param {number} anchor The Anchor to use for drawing
     */
    fillRectangle(x, y, width, height, style = '#FFFFFFFF', anchor = Anchor.TOP_LEFT) {
        [x, y] = Anchor.apply(anchor, x, y, width, height);
        this.context.fillStyle = style;
        this.context.fillRect(x, y, width, height);
    }

    /**
     * Draws the given text at the given location
     * @param {string} text The text to be drawn
     * @param {number} x The x coordinate of which to draw the text (from the left edge)
     * @param {number} y The y coordinate of which to draw the text (from the top edge)
     * @param {number} scale The scale at which to draw the text (whole numbers look the best)
     * @param {number} letterSpacing The space in pixels between each character
     * @param {number} anchor The Anchor to use for drawing
     */
    drawText(text, x, y, scale = 1, letterSpacing = 0, anchor = Anchor.CENTER) {
        if (!this.font) throw 'attempted to draw text without a valid font';
        const lines = text.split('\n');
        const textHeight = this.font.getTextHeight(scale);
        y = Anchor.apply(anchor, 0, y, 0, textHeight * lines.length)[1];
        for (const line of lines) {
            const [lineX, lineY] = Anchor.apply(anchor, x, y, this.font.getTextWidth(line, scale, letterSpacing), textHeight);
            this.font.draw(this.context, line, lineX, lineY, scale, letterSpacing);
            y += textHeight;
        }
    }

}

export default Renderer;