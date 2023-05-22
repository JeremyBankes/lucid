import { ResourceLoader } from "./ResourceLoader";

export class JsonLoader extends ResourceLoader<any> {

    public constructor() {
        super("application/json");
    }

    public async load(response: Response) {
        return await response.json();
    }

}