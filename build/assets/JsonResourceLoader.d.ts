import ResourceLoader from './ResourceLoader.js';
export default class JsonResourceLoader extends ResourceLoader {
    constructor();
    load(response: Response): Promise<any>;
}
