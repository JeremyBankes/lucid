import ResourceLoader from './ResourceLoader.js';
interface ResourceDescriptor {
    name: string;
    source: string;
    contentType?: string;
}
interface ResourceLoadedCallback {
    (resource: any, resourceDescriptor: ResourceDescriptor): void;
}
export default class AssetManager {
    private _queue;
    private _resourceLoaders;
    private _resourceMap;
    constructor();
    register(resourceLoader: ResourceLoader): void;
    add(name: string, source: string, contentType?: string): void;
    load(resourceLoadedCallback?: ResourceLoadedCallback): Promise<any[]>;
    get(name: string): any;
}
export {};
