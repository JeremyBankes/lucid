import { FilterMode } from "./Texture";
import { Renderer } from "./Renderer";

export class TextureSampler {

    private readonly _handle;

    public constructor(renderer: Renderer, minificationFilter: FilterMode, magnificationFilter: FilterMode) {
        this._handle = renderer.underlying.device.createSampler({
            minFilter: minificationFilter,
            magFilter: magnificationFilter
        });
    }

}