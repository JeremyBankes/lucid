import Renderer from '../graphics/Renderer.js';
import Component from './Component.js';

export default class Container extends Component {

    /**
     * @param {object} options
     * @param {[number, number, number, number]} [options.bounds]
     * @param {[number, number, number, number]} [options.margin]
     * @param {[number, number, number, number]} [options.padding]
     * @param {string | CanvasGradient | CanvasPattern} [options.background]
     */
    constructor(options) {
        super(options);
        /** @type {Component[]} */ this._children = [];
    }

    /**
     * @param {Component} component
     */
    addChild(component) {
        this._children.push(component);
        component._parent = this;
    }

    /**
     * @param {number} index
     */
    getChild(index) {
        this._children[index];
    }

    getChildCount() {
        return this._children.length;
    }

    /**
     * @param {Renderer} renderer
     */
    onUpdate(renderer) {
        super.onUpdate(renderer);
        for (const child of this._children) {
            child.onUpdate(renderer);
        }
    }

}