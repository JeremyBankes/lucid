import ResourceLoader from './ResourceLoader';

export default class TextLoader extends ResourceLoader {

    public constructor() {
        super(
            'text/css',
            'text/csv',
            'text/plain'
        );
    }

    public async load(response: Response): Promise<any> {
        return await response.text();
    }

}