import Container from './Container.js';
import Layout from './Layout.js';

/**
 * @typedef {"row"|"column"|"row-inverse"|"column-inverse"} FlexDirection
 */

/**
 * @typedef {"start"|"center"|"end"} Alignment
 */

export default class FlexLayout extends Layout {

    /**
     * @param {object} options
     * @param {Container} options.container
     */
    constructor(options) {
        super(options);
        /** @type {FlexDirection} */ this.direction = 'row';
        /** @type {Object.<number, number>} */ this.mainAxisWeights = {};
        /** @type {Object.<number, number>} */ this.crossAxisWeights = {};
        /** @type {Alignment} */ this.justifiy = 'start';
        /** @type {Alignment} */ this.align = 'start';
    }

    /**
     * @param {number} index
     */
    getMainAxisWeight(index) {
        return index in this.mainAxisWeights ? this.mainAxisWeights[index] : 1;
    }

    /**
     * @param {number} index
     */
    getCrossAxisWeight(index) {
        return index in this.crossAxisWeights ? this.crossAxisWeights[index] : 1;
    }

    // getChildBounds(index) {
    //     const allChildBounds = [];
    //     let totalMainAxisWeight = 0;
    //     let totalCrossAxisWeight = 0;
    //     for (let i = 0; i < this.container.getChildCount(); i++) {
    //         totalMainAxisWeight += this.getMainAxisWeight(i);
    //         totalCrossAxisWeight += this.getCrossAxisWeight(i);
    //     }
    //     if (this.direction === 'row') {
    //         for (let i = 0; i < this.container.getChildCount(); i++) {
    //             const child = this.container.getChild(i);
    //             const mainAxisWeight = this.getMainAxisWeight(i);
    //             const crossAxisWeight = this.getCrossAxisWeight(i);
    //             const widthPercentage = mainAxisWeight / totalMainAxisWeight;
    //             const heightPercentage = crossAxisWeight / totalCrossAxisWeight;

    //             const childWidth = this.container.screenWidth * widthPercentage;
    //             const childHeight = this.container.screenHeight * heightPercentage;
    //         }
    //     }
        
    //     return allChildBounds;
    // }

}