import Texture from './Texture.js';

/**
 * @typedef {object} Glyph
 * @property {string|number} name
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

export default class GlyphSheet extends Texture {

    /**
     * @param {object} options
     * @param {ImageBitmapSource|string} options.source
     */
    constructor(options) {
        super(options);

        /** @type {Object.<string|number, Glyph>} */ this._glyphs = {};
    }

    /**
     * @param {string|number} name
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    addGlyph(name, x, y, width, height) {
        this._glyphs[name] = ({ name, x, y, width, height });
    }

    /**
     * @param {string|number} name
     * @returns {Glyph}
     */
    getGlyph(name) {
        return this._glyphs[name];
    }

}