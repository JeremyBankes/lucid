import ResourceLoader from './ResourceLoader';
export default class TextLoader extends ResourceLoader {
    constructor() {
        super('text/css', 'text/csv', 'text/plain');
    }
    async load(response) {
        return await response.text();
    }
}
