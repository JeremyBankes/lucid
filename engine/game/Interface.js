class Interface {

    /**
     * Creates an interface
     * @param {Element} element The element (typically a canvas) to overlay the interface on
     */
    constructor(element) {
        this.overlaying = element;
        this.overlay = document.createElement('iframe');
        this.overlay.id = 'interface-overlay';
        this.overlay.style.position = 'absolute';
        this.overlay.style.top = '0px';
        this.overlay.style.left = '0px';
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.border = 'none';

        this.overlayContainer = document.createElement('section');
        this.overlayContainer.id = 'interface-overlay-container';
        this.overlayContainer.style.position = 'relative';
        this.overlayContainer.style.display = 'inline-block';

        this.overlaying.parentElement;
        this.overlaying.before(this.overlayContainer);
        this.overlaying.remove();
        this.overlayContainer.appendChild(this.overlay);
        this.overlayContainer.appendChild(element);
    }

    get document() {
        return this.overlay.contentDocument;
    }

    get path() {
        return this.overlay.contentWindow.location.pathname;
    }

    async load(source) {
        this.overlay.src = source;
        await this.waitForFrameLoad();
    }

    async waitForFrameLoad() {
        await new Promise(resolve => {
            const listener = () => {
                this.overlay.removeEventListener('load', listener);
                resolve();
            };
            this.overlay.addEventListener('load', listener);
        });
    }

    clear() {
        this.overlay.removeAttribute('src');
    }

}

export default Interface;