import ResourceLoader from './ResourceLoader';
export default class TextLoader extends ResourceLoader {
    constructor();
    load(response: Response): Promise<any>;
}
