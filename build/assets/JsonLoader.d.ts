import ResourceLoader from './ResourceLoader';
export default class JsonLoader extends ResourceLoader {
    constructor();
    load(response: Response): Promise<any>;
}
