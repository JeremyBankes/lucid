const Anchor = Object.freeze({
    TOP: 0,
    TOP_RIGHT: 1,
    RIGHT: 2,
    BOTTOM_RIGHT: 3,
    BOTTOM: 4,
    BOTTOM_LEFT: 5,
    LEFT: 6,
    TOP_LEFT: 7,
    CENTER: 8,
    /**
     * Returns the opposite of the given anchor
     * @param {number} anchor The anchor
     * @returns {number} The opposite of the anchor
     */
    opposite: function (anchor) {
        switch (anchor) {
            case this.TOP: return this.BOTTOM;
            case this.TOP_RIGHT: return this.BOTTOM_LEFT;
            case this.RIGHT: return this.LEFT;
            case this.BOTTOM_RIGHT: return this.TOP_LEFT;
            case this.BOTTOM: return this.TOP;
            case this.BOTTOM_LEFT: return this.TOP_RIGHT;
            case this.LEFT: return this.RIGHT;
            case this.TOP_LEFT: return this.BOTTOM_RIGHT;
            default: return this.CENTER;
        }
    },
    /**
     * Applies an anchor to the given bounds
     * @param {number} anchor The anchor to apply to the given bounds
     * @param {number} x The x coordinate of the bounds
     * @param {number} y The y cooridnate of the bounds
     * @param {number} width The width of the bounds
     * @param {number} height The height of the bounds
     * @returns {array} The new position of the bounds in [x, y] format
     */
    apply: function (anchor, x, y, width, height) {
        switch (anchor) {
            case this.TOP_LEFT: break;
            case this.TOP: x -= width / 2; break;
            case this.TOP_RIGHT: x -= width; break;
            case this.RIGHT: x -= width; y -= height / 2; break;
            case this.BOTTOM_RIGHT: x -= width; y -= height; break;
            case this.BOTTOM: x -= width / 2; y -= height; break;
            case this.BOTTOM_LEFT: y -= height; break;
            case this.LEFT: y -= height / 2; break;
            case this.CENTER: x -= width / 2; y -= height / 2; break;
        }
        return [x, y];
    }
});

export default Anchor;