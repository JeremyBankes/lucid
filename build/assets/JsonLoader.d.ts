import ResourceLoader from './ResourceLoader.js';
export default class JsonLoader extends ResourceLoader {
    constructor();
    load(response: Response): Promise<any>;
}
