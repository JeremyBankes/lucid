import { Renderer } from "./Renderer";

export class Shader {

    public readonly renderer: Renderer;
    public readonly entryPoint: string;
    
    private readonly _handle: GPUShaderModule;

    public constructor(renderer: Renderer, sourceCode: string, entryPoint: string) {
        this.renderer = renderer;
        this.entryPoint = entryPoint;
        this._handle = renderer.underlying.device.createShaderModule({ code: sourceCode });
    }

}