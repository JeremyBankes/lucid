import ResourceLoader from './ResourceLoader.js';
export default class TextLoader extends ResourceLoader {
    constructor();
    load(response: Response): Promise<any>;
}
