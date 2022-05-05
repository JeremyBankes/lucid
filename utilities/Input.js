export default class Input {

    /**
     * @param {object} [options]
     * @param {HTMLElement} options.root
     */
    constructor(options) {
        this._root = options.root;
        this._pressedButtons = new Set();
        this._pressedKeys = new Set();

        this._root.addEventListener('mousedown', (event) => {
            this._pressedButtons.add(event.button);
        });

        this._root.addEventListener('mouseup', (event) => {
            this._pressedButtons.delete(event.button);
        });

        this._root.addEventListener('keydown', (event) => {
            this._pressedKeys.add(event.key);
        });

        this._root.addEventListener('keyup', (event) => {
            this._pressedKeys.delete(event.key);
        });

        window.addEventListener('blur', () => {
            this._pressedButtons.clear();
            this._pressedKeys.clear();
        });
    }

    /**
     * @param {number} button
     */
    isButtonPressed(button) {
        return this._pressedButtons.has(button);
    }

    /**
     * @param {string} key
     */
    isKeyPressed(key) {
        return this._pressedKeys.has(key);
    }

}