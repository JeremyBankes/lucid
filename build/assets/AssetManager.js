export default class AssetManager {
    _queue;
    _resourceLoaders;
    _resourceMap;
    constructor() {
        this._queue = [];
        this._resourceLoaders = [];
        this._resourceMap = {};
    }
    register(resourceLoader) {
        this._resourceLoaders.push(resourceLoader);
    }
    add(name, source, contentType = null) {
        this._queue.push({ name, source, contentType });
    }
    async load(resourceLoadedCallback = null) {
        const tasks = [];
        for (const resourceDescriptor of this._queue) {
            tasks.push(new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(resourceDescriptor.source);
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }
                    let contentType = resourceDescriptor.contentType;
                    if (contentType === null) {
                        contentType = response.headers.get('content-type').split(';').shift();
                    }
                    const loader = this._resourceLoaders.find((loader) => loader.contentTypes.includes(contentType));
                    if (loader === undefined) {
                        throw new Error(`No loaders found for content type "${contentType}".`);
                    }
                    let resource = null;
                    try {
                        resource = await loader.load(response);
                    }
                    catch (error) {
                        console.warn(new Error(`Failed to load resource "${resourceDescriptor.name}" of type "${resourceDescriptor.contentType}". (Source: ${resourceDescriptor.source})`, { cause: error }));
                        console.warn(error);
                    }
                    if (resourceLoadedCallback !== null) {
                        resourceLoadedCallback(resource, resourceDescriptor);
                    }
                    this._resourceMap[resourceDescriptor.name] = resource;
                    resolve(resource);
                }
                catch (error) {
                    reject(error);
                }
            }));
        }
        return await Promise.all(tasks);
    }
    get(name) {
        if (name in this._resourceMap) {
            return this._resourceMap[name];
        }
        else {
            return null;
        }
    }
}
