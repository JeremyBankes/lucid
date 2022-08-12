export default class ResourceLoader {
    protected _contentTypes: string[];
    constructor(...contentTypes: string[]);
    get contentTypes(): string[];
    load(response: Response): Promise<any>;
}
