import ResourceLoader from './ResourceLoader';
export default class JsonLoader extends ResourceLoader {
    constructor() {
        super('application/json');
    }
    async load(response) {
        return await response.json();
    }
}
