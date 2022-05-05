import Container from '/scripts/engine/interface/Container.js';

export default class Layout {

    /**
     * @param {object} options
     * @param {Container} options.container
     */
    constructor(options) {
        this.container = options.container;
    }

    /**
     * @param {number} index
     * @returns {[[number,number,number,number]]}
     */
    getChildBounds(index) {
        throw new Error('Function not implemented.');
    }

}