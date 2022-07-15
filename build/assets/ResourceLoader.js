export default class ResourceLoader {
    _contentTypes;
    constructor(...contentTypes) {
        this._contentTypes = contentTypes;
    }
    get contentTypes() {
        return this._contentTypes;
    }
    async load(response) {
        throw new Error('Unimplemented.');
    }
}
