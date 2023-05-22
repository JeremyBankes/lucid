import { ResourceLoader } from "./ResourceLoader";

export class ImageBitmapLoader extends ResourceLoader<ImageBitmap> {

    public constructor() {
        super(
            "image/avif",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp"
        );
    }

    public async load(response: Response) {
        const blob = await response.blob();
        return await window.createImageBitmap(blob);
    }

}