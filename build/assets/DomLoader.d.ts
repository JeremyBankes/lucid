import ResourceLoader from './ResourceLoader';
export default class DomLoader extends ResourceLoader {
    private _parser;
    constructor();
    load(response: Response): Promise<any>;
}
