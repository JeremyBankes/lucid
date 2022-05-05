
/**
 * @typedef {'texture'|'sheet'|'font'} LoadRequestType
 */

/**
 * @typedef {object} AssetStore
 * @property {Object.<string, Texture>} textures
 * @property {Object.<string, SpriteSheet>} sheets
 * @property {Object.<string, BitmapFont>} fonts
 */

export default class Assets {

    constructor() {
        /** @type {AssetStore} */ this.data = { textures: {}, sheets: {}, fonts: {} };
    }

    /**
     * @param {string} name
     * @param {string} source
     */
    addTexture(name, source) {
        this.data.textures[name] = new Texture({ source });
    }

    /**
     * @param {string} name
     */
    getTexture(name) {
        return this.data.textures[name];
    }

    /**
     * @param {string} name
     */
    getFont(name) {
        return this.data.fonts[name];
    }

    /**
     * @param {string} name
     * @param {string} source
     * @param {number} spriteWidth
     * @param {number} spriteHeight
     * @param {number} spriteCount
     */
    addSheet(name, source, spriteWidth, spriteHeight, spriteCount = spriteWidth * spriteHeight) {
        this.data.sheets[name] = new SpriteSheet({
            source,
            spriteWidth,
            spriteHeight,
            spriteCount
        });
    }

    /**
     * @param {string} name
     */
    getSheet(name) {
        return this.data.sheets[name];
    }

    /**
     * @param {string} name
     * @param {string} source
     */
    addFont(name, source) {
        this.data.fonts[name] = new BitmapFont({ source });
    }

    async load() {
        const tasks = [];
        for (const texture in this.data.textures) {
            tasks.push(this.data.textures[texture].load());
        }
        for (const sheet in this.data.sheets) {
            tasks.push(this.data.sheets[sheet].load());
        }
        for (const font in this.data.fonts) {
            tasks.push(this.data.fonts[font].load());
        }
        await Promise.all(tasks);
    }

}