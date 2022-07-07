class ResourceDescriptor {

    /**
     * @param {RequestInfo | URL} source 
     */
    constructor(source) {
        this.source = source;
    }

}

/**
 * @readonly
 * @enum {string}
 */
export const ResourceType = {
    JSON: 'JSON',
    BITMAP: 'BITMAP'
};

export default class AssetManager {

    constructor() {
        this._queue = /** @type {ResourceDescriptor[]} */ ([]);
    }

    /**
     * Adds a resource to be loaded into the queue.
     * @see {@link load} to actually load the queued resources.
     * @param {RequestInfo | URL} source
     */
    queue(source) {
        this._queue.push(new ResourceDescriptor(source));
    }

    /**
     * @callback ResourceLoadedCallback
     * @param {any} resource
     * @param {ResourceType} type
     * @param {ResourceDescriptor} descriptor
     */

    /**
     * Loads all resources added to the {@link queue}.
     * @param {ResourceLoadedCallback?} resourceLoadedCallback
     */
    async load(resourceLoadedCallback = null) {
        const tasks = /** @type {Promise[]} */ ([]);
        for (const resourceDescriptor of this._queue) {
            tasks.push(new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(resourceDescriptor.source);
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }
                    const contentType = response.headers.get('content-type').split(';').shift();
                    let resource = null;
                    switch (contentType) {
                        case 'application/json':
                            resource = await this.retrieveJson(response);
                            if (resourceLoadedCallback !== null) {
                                resourceLoadedCallback(resource, ResourceType.JSON, resourceDescriptor);
                            }
                            break;
                        case 'image/png':
                            resource = await this.retrieveBitmapImage(response);
                            if (resourceLoadedCallback !== null) {
                                resourceLoadedCallback(resource, ResourceType.BITMAP, resourceDescriptor);
                            }
                            break;
                        default:
                            throw new Error(`Unsure how to handle content type of "${contentType}".`);
                    }
                    resolve(resource);
                } catch (error) {
                    reject(error);
                }
            }));
        }
        return await Promise.all(tasks);
    }

    /**
     * Retrieves an object from the {@link source} of a given JSON file
     * @param {Response} response
     * @returns {Promise<object>}
     */
    async retrieveJson(response) {
        return await response.json();
    }

    /**
     * Retrieves a bitmap image from a given {@link response}
     * @param {Response} response
     * @returns {Promise<ImageBitmap>}
     */
    async retrieveBitmapImage(response) {
        const bitmapImageBlob = await response.blob();
        const bitmapImage = await window.createImageBitmap(bitmapImageBlob);
        return bitmapImage;
    }

}