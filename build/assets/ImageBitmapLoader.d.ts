import ResourceLoader from './ResourceLoader';
export default class ImageBitmapLoader extends ResourceLoader {
    constructor();
    load(response: Response): Promise<any>;
}
