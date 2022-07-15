export default class ResourceLoader {

    protected _contentTypes: string[];

    public constructor(...contentTypes: string[]) {
        this._contentTypes = contentTypes;
    }

    public get contentTypes() {
        return this._contentTypes;
    }

    public async load(response: Response): Promise<any> {
        throw new Error('Unimplemented.');
    }

}