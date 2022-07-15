import ResourceLoader from './ResourceLoader.js';
export default class DomLoader extends ResourceLoader {
    private _parser;
    constructor();
    load(response: Response): Promise<any>;
}
