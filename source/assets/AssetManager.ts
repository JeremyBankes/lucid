import { RegularExpression } from "../utilities/RegularExpression";
import { ResourceLoader } from "./ResourceLoader";

interface ResourceDescriptor {
    name: string,
    source: string,
    contentType?: string
}

interface ResourceLoadedCallback {
    (resource: any, resourceDescriptor: ResourceDescriptor): void;
}

export class AssetManager {

    private _queue: ResourceDescriptor[];
    private _resourceLoaders: ResourceLoader<any>[];
    private _resourceMap: { [Name: string]: any };

    public constructor() {
        this._queue = [];
        this._resourceLoaders = [];
        this._resourceMap = {};
    }

    public register(resourceLoader: ResourceLoader<any>) {
        this._resourceLoaders.push(resourceLoader);
    }

    public add(name: string, source: string, contentType?: string) {
        this._queue.push({ name, source, contentType });
    }

    public async load(resourceLoadedCallback?: ResourceLoadedCallback) {
        const tasks = [];
        for (const resourceDescriptor of this._queue) {
            tasks.push(new Promise(async (resolve, reject) => {
                try {
                    const response = await fetch(resourceDescriptor.source);
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }
                    let contentType = resourceDescriptor.contentType;
                    if (contentType === undefined && response.headers.has("Content-Type")) {
                        const headerContentType = response.headers.get("Content-Type") as string;
                        const match = headerContentType.match(RegularExpression.mimeType);
                        if (match !== null) {
                            [contentType] = match;
                        }
                    }
                    let loader = undefined;
                    if (contentType !== undefined) {
                        const definedContentType = contentType;
                        loader = this._resourceLoaders.find((loader) => loader.contentTypes.includes(definedContentType));
                    }
                    if (loader === undefined) {
                        throw new Error(`No loaders found for content type "${contentType}".`);
                    }
                    let resource = null;
                    try {
                        resource = await loader.load(response);
                    } catch (error) {
                        console.warn(new Error(`Failed to load resource "${resourceDescriptor.name}" of type "${resourceDescriptor.contentType}". (Source: ${resourceDescriptor.source})`, { cause: error }));
                        console.warn(error);
                    }
                    if (resourceLoadedCallback !== undefined) {
                        resourceLoadedCallback(resource, resourceDescriptor);
                    }
                    this._resourceMap[resourceDescriptor.name] = resource;
                    resolve(resource);
                } catch (error) {
                    reject(error);
                }
            }));
        }
        return await Promise.all(tasks);
    }

    public get(name: string) {
        if (name in this._resourceMap) {
            return this._resourceMap[name];
        } else {
            return null;
        }
    }

}