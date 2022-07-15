import ResourceLoader from './ResourceLoader.js';
export default class JsonResourceLoader extends ResourceLoader {
    constructor() {
        super('application/json');
    }
    async load(response) {
        return await response.json();
    }
}
