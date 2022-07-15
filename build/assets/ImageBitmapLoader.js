import ResourceLoader from './ResourceLoader.js';
export default class ImageBitmapLoader extends ResourceLoader {
    constructor() {
        super('image/avif', 'image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/tiff', 'image/webp');
    }
    async load(response) {
        const blob = await response.blob();
        return await window.createImageBitmap(blob);
    }
}
