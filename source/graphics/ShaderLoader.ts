import TextLoader from '../assets/TextLoader.js';
import Renderer from './Renderer.js';
import Shader, { ShaderType } from './Shader.js';

export default class ShaderLoader extends TextLoader {

    protected _renderer: Renderer;

    public constructor(renderer: Renderer) {
        super();
        this._contentTypes = ['text/shader'];
        this._renderer = renderer;
    }

    public async load(response: Response): Promise<any> {
        const source = await super.load(response);
        const extensionMatch = response.url.toLowerCase().match(/(?<=\.)[a-z0-9]+(?=\s*$)/gi);
        if (extensionMatch === null) {
            throw new Error(`Unable to determine shader type from ${response.url}.`);
        }
        const extension = extensionMatch.pop();
        let type: ShaderType;
        if (extension === 'vert') {
            type = 'vertex';
        } else if (extension === 'frag') {
            type = 'fragment';
        } else {
            throw new Error(`Unable to determine shader type from the .${extension} file extension.`);
        }
        return new Shader(this._renderer, type, source);
    }

}