/**
 * Represents a manipulable raster of pixels that can be drawn to a given canvas rendering context
 */
class Texture {

    /**
     * Creates a texture. The width and height can be left undefined if the texture data is planned to come from load()
     * @param {number} width The width of the texture to create
     * @param {number} height The height of the texture to create
     */
    constructor(width = 0, height = 0, pixelated = true) {
        const canvas = document.createElement('canvas');
        this.workingContext = canvas.getContext('2d');

        canvas.style.imageRendering = 'pixelated';
        this.workingContext.imageSmoothingEnabled = false;

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            this.imageData = this.workingContext.getImageData(0, 0, width, height);
        } else {
            this.imageData = null;
        }
    }

    get width() { return this.imageData ? this.imageData.width : 0; }

    get height() { return this.imageData ? this.imageData.height : 0; }

    /**
     * Loads the texture.
     * @param {string} source The address or URL of the texture to be loaded.
     * @returns {Promise} A promise that resolves if loading is successful, rejects otherwise.
     */
    load(source) {
        if (!source) throw 'invalid texture source';
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                this.workingContext.canvas.width = image.naturalWidth;
                this.workingContext.canvas.height = image.naturalHeight;
                this.workingContext.drawImage(image, 0, 0);
                this.imageData = this.workingContext.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
                resolve();
            };
            image.onerror = () => reject('failed to load image');
            image.src = source;
        });
    }

    clone() {
        const texture = new Texture(this.width, this.height, this.pixelated);
        texture.workingContext.drawImage(this.workingContext.canvas, 0, 0);
        texture.imageData = texture.workingContext.getImageData(0, 0, this.width, this.height);
        return texture;
    }

    /**
     * Retrieves a pixel's color
     * @param {number} x The x coordinate of the pixel (from the left edge)
     * @param {number} y The y coordinate of the pixel (from the top edge)
     * @returns {array} Color data in the format of [red, green, blue, alpha]
     */
    getColor(x, y) {
        if (!this.imageData) throw 'texture not loaded';
        if (x < 0 || y < 0 || x >= this.imageData.width || y >= this.imageData.height) throw `${x}, ${y} outside image bounds`;
        return [
            this.imageData.data[y * 4 * this.imageData.width + x * 4 + 0],
            this.imageData.data[y * 4 * this.imageData.width + x * 4 + 1],
            this.imageData.data[y * 4 * this.imageData.width + x * 4 + 2],
            this.imageData.data[y * 4 * this.imageData.width + x * 4 + 3]
        ];
    }

    /**
     * Changes a pixel's color without updating the texture context
     * @param {number} x The x coordinate of the pixel (from the left edge) 
     * @param {number} y The y coordinate of the pixel (from the top edge)
     * @param {array} color An array of color data in the format of [red, green, blue, alpha]
     */
    setColorDirty(x, y, color) {
        this.imageData.data[y * 4 * this.imageData.width + x * 4 + 0] = color[0];
        this.imageData.data[y * 4 * this.imageData.width + x * 4 + 1] = color[1];
        this.imageData.data[y * 4 * this.imageData.width + x * 4 + 2] = color[2];
        this.imageData.data[y * 4 * this.imageData.width + x * 4 + 3] = color[3];
    }

    /**
     * Changes a pixel's color
     * @param {number} x The x coordinate of the pixel (from the left edge) 
     * @param {number} y The y coordinate of the pixel (from the top edge)
     * @param {array} color An array of color data in the format of [red, green, blue, alpha]
     */
    setColor(x, y, color) {
        if (!this.imageData) throw 'texture not loaded';
        if (x < 0 || y < 0 || x >= this.imageData.width || y >= this.imageData.height) throw `${x}, ${y} outside image bounds`;
        this.setColorDirty(x, y, color);
        this.workingContext.putImageData(this.imageData, 0, 0, x, y, 1, 1);
    }

    /**
     * Fills a rectangular area within the texture with a given color
     * @param {number} x The x coordinate of the area to fill (from the left edge)
     * @param {number} y The y cooridnate of the area to fill (from the top edge)
     * @param {number} width The width of the area to fill
     * @param {number} height The height of the area to fill
     * @param {array} color An array of color data in the format of [red, green, blue, alpha]
     */
    fillColor(x, y, width, height, color) {
        if (!this.imageData) throw 'texture not loaded';
        if (x < 0 || y < 0 || x >= this.imageData.width + width || y >= this.imageData.height + height) throw `${x}, ${y} outside image bounds`;
        for (let i = y; i < y + height; i++) {
            for (let j = x; j < x + width; j++) {
                this.setColorDirty(j, i, color);
            }
        }
        this.updateTextureContext(x, y, width, height);
    }

    /**
     * Updates the texture's context, This context is used to actually perform renders.
     * It is efficient to alter the image data, but applying the image data to the texture can
     * be expensive. Thus these calls should be infrequent as possible.
     * @param {number} subX The x coordinate of the area to update (from the left edge)
     * @param {number} subY The y coordinate of the area to update (from the top edge)
     * @param {number} subWidth The width of the area to update
     * @param {number} subHeight The height of the area to update
     */
    updateTextureContext(subX, subY, subWidth, subHeight) {
        this.workingContext.putImageData(this.imageData, 0, 0, subX, subY, subWidth, subHeight);
    }

    /**
     * Replaces all occurrences of a certain color with a different one.
     * @param {array} oldColor An array of color data in the format of [red, green, blue, alpha] representing the color to replace 
     * @param {array} newColor An array of color data in the format of [red, green, blue, alpha] representing the replacement color
     */
    replaceColor(oldColor, newColor) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.imageData.data[i * 4 * this.imageData.width + j * 4 + 0] === oldColor[0] &&
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 1] === oldColor[1] &&
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 2] === oldColor[2] &&
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 3] === oldColor[3]) {
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 0] = newColor[0];
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 1] = newColor[1];
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 2] = newColor[2];
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 3] = newColor[3];
                }
            }
        }
        this.workingContext.putImageData(this.imageData, 0, 0, 0, 0, this.width, this.height);
    }

    /**
     * Floods all existing colors (colors with a non-zero opacity) with a given color
     * @param {array} newColor An array of color data in the format of [red, green, blue, alpha] representing the replacement color
     * @param {number} x The x coordinate of the area to flood (from the left edge)
     * @param {number} y The y cooridnate of the area to fill (from the top edge)
     * @param {number} width The width of the area to flood
     * @param {number} height The height of the area to flood
     */
    floodColor(newColor, x = 0, y = 0, width = this.width, height = this.height) {
        for (let i = y; i < y + height; i++) {
            for (let j = x; j < x + width; j++) {
                if (this.imageData.data[i * 4 * this.imageData.width + j * 4 + 3] !== 0) {
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 0] = newColor[0];
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 1] = newColor[1];
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 2] = newColor[2];
                    this.imageData.data[i * 4 * this.imageData.width + j * 4 + 3] = newColor[3];
                }
            }
        }
        this.workingContext.putImageData(this.imageData, 0, 0, x, y, width, height);
    }

    /**
     * Converts the texture into a data url
     * @param {string} type
     * @param {string} quality 
     * @returns {string} Data url
     */
    toDataURL(type = null, quality = null) {
        return this.workingContext.canvas.toDataURL(type, quality);
    }

    /**
     * Draws the texture into the given canvas rendering context
     * @param {CanvasRenderingContext2D} context The context to draw the texture to
     * @param {number} x The x coordinate of which to draw the texture (from the left edge)
     * @param {number} y The y coordinate of which to the texture (from the top edge)
     * @param {number} width The width of which to draw the texture
     * @param {number} height The height of which to draw the texture
     * @param {number} subX The x coordinate of the area within the texture which to draw (from the left)
     * @param {number} subY The y cooridnate of the area within the texture which to draw (from the top)
     * @param {number} subWidth The width of the area within the texture which to draw
     * @param {number} subHeight The height of the area within the texture which to draw
     */
    draw(context, x, y, width = this.width, height = this.height, subX = 0, subY = 0, subWidth = this.width, subHeight = this.height) {
        context.drawImage(this.workingContext.canvas, subX, subY, subWidth, subHeight, x, y, width, height);
    }

}

export default Texture;