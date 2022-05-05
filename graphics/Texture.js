import Color from '../utilities/Color.js';

/**
 * @callback FilterAction
 * @param {number} color
 * @returns {number}
 */

export default class Texture {

    /**
     * @param {object} options
     * @param {ImageBitmapSource|string} [options.source]
     */
    constructor(options) {
        this._source = 'source' in options ? options.source : null;
        this.bufferContext = document.createElement('canvas').getContext('2d');
    }

    get source() {
        return this._source;
    }

    get canvas() {
        return this.bufferContext.canvas;
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    async load() {
        let source = this._source;
        if (typeof (source) === 'string') {
            const response = await fetch(source);
            source = await response.blob();
        }
        const bitmap = await window.createImageBitmap(source);
        this.canvas.width = bitmap.width;
        this.canvas.height = bitmap.height;
        this.bufferContext.drawImage(bitmap, 0, 0);
    }

    clone() {
        const texture = new Texture({ source: this.source });
        texture.canvas.width = this.canvas.width;
        texture.canvas.height = this.canvas.height;
        texture.bufferContext.putImageData(this.bufferContext.getImageData(0, 0, this.width, this.height), 0, 0);
        return texture;
    }

    /**
     * @param {FilterAction} action
     */
    async filter(action) {
        const imageData = this.bufferContext.getImageData(0, 0, this.width, this.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const inputColor = /** @type {number} */ (Color.toHex(imageData.data[i + 0], imageData.data[i + 1], imageData.data[i + 2], imageData.data[i + 3]));
            const rgba = Color.fromHex(action(inputColor), true);
            imageData.data[i + 0] = rgba[0];
            imageData.data[i + 1] = rgba[1];
            imageData.data[i + 2] = rgba[2];
            imageData.data[i + 3] = rgba[3];
        }
        this.bufferContext.putImageData(imageData, 0, 0);
        return this;
    }

}