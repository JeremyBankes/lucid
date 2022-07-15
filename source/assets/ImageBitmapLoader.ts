import ResourceLoader from './ResourceLoader.js';

export default class ImageBitmapLoader extends ResourceLoader {

    public constructor() {
        super(
            'image/avif',
            'image/bmp',
            'image/gif',
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/tiff',
            'image/webp'
        );
    }

    public async load(response: Response): Promise<any> {
        const blob = await response.blob();
        return await window.createImageBitmap(blob);
    }

}