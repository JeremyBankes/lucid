import Animation from '/scripts/engine/graphics/Animation.js';
import BitmapFont from '/scripts/engine/graphics/BitmapFont.js';
import Camera from '/scripts/engine/graphics/Camera.js';
import GlyphSheet from '/scripts/engine/graphics/GlyphSheet.js';
import SpriteSheet from '/scripts/engine/graphics/SpriteSheet.js';
import Texture from '/scripts/engine/graphics/Texture.js';
import Anchor from '/scripts/engine/utilities/Anchor.js';

export default class Renderer {

    /**
     * @param {object} options
     * @param {CanvasRenderingContext2D} options.context
     */
    constructor(options) {
        this.context = options.context;
        this.context.imageSmoothingEnabled = false;
        this.deltaTime = 0;

        /** @type {Camera} */ this.camera = null;
    }

    get width() {
        return this.context.canvas.width;
    }

    get height() {
        return this.context.canvas.height;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Anchor} anchor
     * @param {number} scale
     */
    _transform(x, y, width, height, anchor = Anchor.TOP_LEFT, scale = 1) {
        let bounds = anchor.apply(x, y, width * scale, height * scale);
        if (this.camera !== null) {
            bounds = this.camera.toScreen(...bounds);
        }
        return bounds;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Anchor} anchor
     * @param {number} scale 
     */
    clearRectangle(x = 0, y = 0, width = this.context.canvas.width, height = this.context.canvas.height, anchor = Anchor.TOP_LEFT, scale = 1) {
        [x, y, width, height] = this._transform(x, y, width, height, anchor, scale);
        this.context.clearRect(x, y, width, height);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Anchor} anchor
     * @param {number} scale 
     */
    drawRectangle(x = 0, y = 0, width = this.context.canvas.width, height = this.context.canvas.height, anchor = Anchor.TOP_LEFT, scale = 1) {
        [x, y, width, height] = this._transform(x, y, width, height, anchor, scale);
        this.context.fillRect(x, y, width, height);
    }

    /**
     * @param {Texture} texture
     * @param {number} x
     * @param {number} y
     * @param {number} [width]
     * @param {number} [height]
     * @param {number} [sampleX]
     * @param {number} [sampleY]
     * @param {number} [sampleWidth]
     * @param {number} [sampleHeight]
     * @param {Anchor} [anchor]
     * @param {number} [scale]
     */
    drawPartialTexture(texture, x, y, width, height, sampleX = 0, sampleY = 0, sampleWidth = texture.width, sampleHeight = texture.height, anchor = Anchor.TOP_LEFT, scale = 1) {
        [x, y, width, height] = this._transform(x, y, width, height, anchor, scale);
        this.context.drawImage(texture.canvas, sampleX, sampleY, sampleWidth, sampleHeight, x, y, width, height);
    }

    /**
     * @param {Texture} texture
     * @param {number} x
     * @param {number} y
     * @param {number} [width]
     * @param {number} [height]
     * @param {Anchor} [anchor]
     * @param {number} [scale]
     */
    drawTexture(texture, x, y, width = texture.width, height = texture.height, anchor = Anchor.TOP_LEFT, scale = 1) {
        this.drawPartialTexture(texture, x, y, width, height, 0, 0, texture.width, texture.height, anchor, scale);
    }

    /**
     * @param {SpriteSheet} spriteSheet
     * @param {number} spriteIndex
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Anchor} anchor
     * @param {number} scale
     */
    drawSprite(spriteSheet, spriteIndex, x, y, width = spriteSheet.spriteWidth, height = spriteSheet.spriteHeight, anchor = Anchor.TOP_LEFT, scale = 1) {
        const [sampleX, sampleY, sampleWidth, sampleHeight] = spriteSheet.getSpriteBounds(spriteIndex);
        this.drawPartialTexture(spriteSheet, x, y, width, height, sampleX, sampleY, sampleWidth, sampleHeight, anchor, scale);
    }

    /**
     * @param {Animation} animation
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Anchor} anchor
     * @param {number} scale
     */
    drawAnimation(animation, x, y, width = animation.spriteSheet.spriteWidth, height = animation.spriteSheet.spriteHeight, anchor = Anchor.TOP_LEFT, scale = 1) {
        this.drawSprite(animation.spriteSheet, animation.currentIndex, x, y, width, height, anchor, scale);
    }

    /**
     * @param {GlyphSheet} glyphSheet
     * @param {string|number} glyphName
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Anchor} anchor
     * @param {number} scale
     */
    drawGlyph(glyphSheet, glyphName, x, y, width, height, anchor = Anchor.TOP_LEFT, scale = 1) {
        const glyph = glyphSheet.getGlyph(glyphName);
        this.drawPartialTexture(glyphSheet, x, y, width, height, glyph.x, glyph.y, glyph.width, glyph.height, anchor, scale);
    }

    /**
     * @param {string} string
     * @param {BitmapFont} bitmapFont
     * @param {number} x
     * @param {number} y
     * @param {number} maximumWidth
     */
    drawBitmapFont(string, bitmapFont, x, y, maximumWidth, anchor = Anchor.TOP_LEFT, scale = 1) {
        const lines = string.split('\n');
        let lineNumber = 0;
        let longestLineWidth = 0;
        while (lineNumber < lines.length) {
            const line = lines[lineNumber];
            let width = 0;

            let characterWrapIndex = 0;
            for (let i = 0; i < line.length; i++) {
                const characterMeta = bitmapFont.getCharacterMeta(line.charCodeAt(characterWrapIndex));
                width += characterMeta.xAdvance;
                if (maximumWidth === null || width < maximumWidth) {
                    characterWrapIndex++;
                }
            }

            if (characterWrapIndex < line.length) {
                let breakAt = characterWrapIndex;
                while (breakAt > 0 && line[breakAt - 1] !== ' ') {
                    breakAt--;
                }
                if (breakAt === 0) {
                    breakAt = characterWrapIndex - 1;
                }
                lines[lineNumber] = line.substring(0, breakAt);
                lines.splice(lineNumber + 1, 0, line.substring(breakAt, line.length));
            }
            if (width > longestLineWidth) {
                longestLineWidth = width;
            }
            lineNumber++;
        }

        let blockWidth = maximumWidth === null ? longestLineWidth : longestLineWidth;
        let blockHeight = lines.length * bitmapFont.lineHeight;
        if (this.camera !== null) {
            [, , blockWidth, blockHeight] = this.camera.fromScreen(x, y, blockWidth, blockHeight);
        }
        const [blockX, blockY, ,] = this._transform(x, y, blockWidth, blockHeight, anchor, scale);

        const camera = this.camera;
        this.camera = null;
        let characterY = blockY;
        for (const line of lines) {
            let characterX = blockX;
            for (let i = 0; i < line.length; i++) {
                const characterCode = line.charCodeAt(i);
                const characterMeta = bitmapFont.getCharacterMeta(characterCode);
                const glyphSheet = bitmapFont.getGlyphSheet(characterMeta.glyphSheetId);
                const glyph = glyphSheet.getGlyph(characterCode);
                const finalCharacterX = characterX + characterMeta.xOffset * scale;
                const finalCharacterY = characterY + characterMeta.yOffset * scale;
                this.drawGlyph(glyphSheet, characterCode, finalCharacterX, finalCharacterY, glyph.width, glyph.height, Anchor.TOP_LEFT, scale);
                characterX += characterMeta.xAdvance * scale;
            }
            characterY += bitmapFont.lineHeight * scale;
        }
        this.camera = camera;
    }

}