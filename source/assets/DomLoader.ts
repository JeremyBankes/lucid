import { RegularExpression } from "../utilities/RegularExpression";
import { ResourceLoader } from "./ResourceLoader";

export class DomLoader extends ResourceLoader<Document> {

    private _parser: DOMParser;

    public constructor() {
        super(
            "text/html",
            "text/xml",
            "application/xml",
            "application/xhtml+xml",
            "image/svg+xml"
        );
        this._parser = new DOMParser();
    }

    public async load(response: Response) {
        const text = await response.text();
        const contentType = response.headers.get("Content-Type");
        let mimeType: DOMParserSupportedType;
        if (contentType === null) {
            mimeType = "text/html";
        } else {
            [mimeType] = contentType.match(RegularExpression.mimeType);
        }
        return this._parser.parseFromString(text, mimeType);
    }

}