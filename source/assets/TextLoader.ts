import { ResourceLoader } from "./ResourceLoader";

export class TextLoader extends ResourceLoader<string> {

    public constructor() {
        super(
            "text/css",
            "text/csv",
            "text/plain"
        );
    }

    public async load(response: Response) {
        return await response.text();
    }

}