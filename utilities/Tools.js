export default class Tools {

    constructor() {

    }

    get SECOND() { return 1000; }
    get MINUTE() { return this.SECOND * 60; }
    get HOUR() { return this.MINUTE * 60; }
    get DAY() { return this.HOUR * 24; }
    get WEEK() { return this.DAY * 7; }

    /**
     * @param {string} text
     */
    toSlug(text) {
        return text.replaceAll(/[^A-Za-z0-9]+/g, '-').replaceAll(/^-|-$/, '').toLowerCase();
    }

    generateId() {
        return [...crypto.getRandomValues(new Uint8Array(8))].map(number => number.toString(16).padStart(2, '0')).join('');
    }

}