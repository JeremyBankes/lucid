export default class Anchor {

    static TOP = new Anchor('TOP');
    static TOP_RIGHT = new Anchor('TOP_RIGHT');
    static RIGHT = new Anchor('RIGHT');
    static BOTTOM_RIGHT = new Anchor('BOTTOM_RIGHT');
    static BOTTOM = new Anchor('BOTTOM');
    static BOTTOM_LEFT = new Anchor('BOTTOM_LEFT');
    static LEFT = new Anchor('LEFT');
    static TOP_LEFT = new Anchor('TOP_LEFT');
    static CENTER = new Anchor('CENTER');

    /**
     * @param {'TOP'| 'TOP_RIGHT'| 'RIGHT'| 'BOTTOM_RIGHT'| 'BOTTOM'| 'BOTTOM_LEFT'| 'LEFT'| 'TOP_LEFT'| 'CENTER'} type
     */
    constructor(type) {
        this.type = type;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {[number, number, number, number]}
     */
    apply(x, y, width, height) {
        switch (this.type) {
            case 'TOP': return [x - width / 2, y, width, height];
            case 'TOP_RIGHT': return [x - width, y, width, height];
            case 'RIGHT': return [x - width, y - height / 2, width, height];
            case 'BOTTOM_RIGHT': return [x - width, y - height, width, height];
            case 'BOTTOM': return [x - width / 2, y - height, width, height];
            case 'BOTTOM_LEFT': return [x, y - height, width, height];
            case 'LEFT': return [x, y - height / 2, width, height];
            case 'TOP_LEFT': return [x, y, width, height];
            case 'CENTER': return [x - width / 2, y - height / 2, width, height];
            default: throw new Error(`Invalid anchor ${this.type}.`);
        }
    }

}