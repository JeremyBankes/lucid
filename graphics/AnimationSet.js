import Animation from '/scripts/engine/graphics/Animation.js';

export default class AnimationSet {

    /**
     * @param {object} options
     * @param {Object.<string, Animation>} options.animationMap
     */
    constructor(options) {
        this._animationMap = options.animationMap;

        /** @type {Animation} */ this._activeAnimation = null;
        this.active = Object.keys(options.animationMap)[0];
    }

    get animationNames() {
        return Object.keys(this._animationMap);
    }

    /**
     * @param {string} animationName
     */
    set active(animationName) {
        if (!(animationName in this._animationMap)) {
            throw new Error(`No animation named "${animationName}" in animation set.`);
        }
        this._activeAnimation = this._animationMap[animationName];
    }

    get activeAnimation() {
        return this._activeAnimation;
    }

    /**
     * @param {number} value
     */
    set frameRate(value) {
        for (const animationName in this._animationMap) {
            this._animationMap[animationName].frameRate = value;
        }
    }


}