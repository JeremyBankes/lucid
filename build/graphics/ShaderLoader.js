import TextLoader from '../assets/TextLoader.js';
import Shader from './Shader.js';
export default class ShaderLoader extends TextLoader {
    _renderer;
    constructor(renderer) {
        super();
        this._contentTypes = ['text/shader'];
        this._renderer = renderer;
    }
    async load(response) {
        const source = await super.load(response);
        const extensionMatch = response.url.toLowerCase().match(/(?<=\.)[a-z0-9]+(?=\s*$)/gi);
        if (extensionMatch === null) {
            throw new Error(`Unable to determine shader type from ${response.url}.`);
        }
        const extension = extensionMatch.pop();
        let type;
        if (extension === 'vert') {
            type = 'vertex';
        }
        else if (extension === 'frag') {
            type = 'fragment';
        }
        else {
            throw new Error(`Unable to determine shader type from the .${extension} file extension.`);
        }
        return new Shader(this._renderer, type, source);
    }
}
