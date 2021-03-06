import ResourceLoader from './ResourceLoader.js';

export default class JsonLoader extends ResourceLoader {

    public constructor() {
        super('application/json');
    }

    public async load(response: Response): Promise<any> {
        return await response.json();
    }

}