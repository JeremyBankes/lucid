import GlyphSheet from '/scripts/engine/graphics/GlyphSheet.js';

/**
 * @typedef {object} CharacterGlyphMeta
 * @property {number} id
 * @property {number} glyphSheetId
 * @property {number} xAdvance
 * @property {number} xOffset
 * @property {number} yOffset
 */

export default class BitmapFont {

    /**
     * @param {object} options
     * @param {string} options.source
     */
    constructor(options) {
        this._source = options.source;
        this._lineHeight = 0;
        this._face = '';

        /** @type {Object.<number, GlyphSheet>} */ this._glyphSheets = {};
        /** @type {Object.<number, CharacterGlyphMeta>} */ this._characterMeta = {};
    }

    get face() {
        return this._face;
    }

    get source() {
        return this._source;
    }

    get lineHeight() {
        return this._lineHeight;
    }

    /**
     * @param {string | CanvasGradient | CanvasPattern} color
     */
    set color(color) {
        for (const glyphSheetId in this._glyphSheets) {
            const glyphSheet = this._glyphSheets[glyphSheetId];
            glyphSheet.bufferContext.fillStyle = color;
            glyphSheet.bufferContext.globalCompositeOperation = 'source-atop'
            glyphSheet.bufferContext.fillRect(0, 0, glyphSheet.width, glyphSheet.height);
        }
    }

    /**
     * @param {number} glyphSheetId
     */
    getGlyphSheet(glyphSheetId) {
        return this._glyphSheets[glyphSheetId];
    }

    /**
     * @param {number} characterCode
     */
    hasCharacterMeta(characterCode) {
        return characterCode in this._characterMeta;
    }

    /**
     * @param {number} characterCode 
     */
    getCharacterMeta(characterCode) {
        return this._characterMeta[characterCode];
    }

    async load() {
        const response = await fetch(this.source);
        const meta = await response.text();
        const lines = meta.split(/\n/g);
        for (const line of lines) {
            const commandPieces = line.split(/\s+/);
            const command = commandPieces.shift();
            const attributes = {};
            for (const attributeString of commandPieces) {
                const attributePieces = attributeString.split('=');
                if (attributePieces.length === 2) {
                    const key = attributePieces[0];
                    const valueString = attributePieces[1];
                    let value;
                    if (valueString.startsWith('"') && valueString.endsWith('"')) {
                        value = valueString.slice(1, valueString.length - 1);
                    } else if (valueString.includes(',')) {
                        value = /** @type {any[]} */ (valueString.split(','));
                        for (let i = 0; i < value.length; i++) {
                            const number = parseInt(value[i]);
                            if (!isNaN(number)) {
                                value[i] = number;
                            }
                        }
                    } else {
                        const number = parseInt(valueString);
                        value = isNaN(number) ? valueString : number;
                    }
                    attributes[key] = value;
                }
            }
            switch (command) {
                case 'info':
                    this._face = attributes.face;
                    break;
                case 'common':
                    this._lineHeight = attributes.lineHeight;
                    break;
                case 'page':
                    this._glyphSheets[attributes.id] = new GlyphSheet({ source: attributes.file });
                    break;
                case 'char':
                    const id = attributes.id;
                    const glyphSheetId = attributes.page;
                    const glyphSheet = this._glyphSheets[glyphSheetId];
                    glyphSheet.addGlyph(id, attributes.x, attributes.y, attributes.width, attributes.height);
                    this._characterMeta[id] = { id, glyphSheetId, xAdvance: attributes.xadvance, xOffset: attributes.xoffset, yOffset: attributes.yoffset };
                default:
                    break;
            }
        }

        await Promise.all(Object.values(this._glyphSheets).map(glyphSheet => glyphSheet.load()));
    }

}