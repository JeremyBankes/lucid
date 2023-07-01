import { Error } from "@jeremy-bankes/toolbox/shared";
import { Texture } from "./Texture";
import { Buffer } from "./Buffer";
import { Pipeline } from "./Pipeline";
import { TextureSampler } from "./TextureSampler";

type BindableResource = TextureSampler | Texture | Buffer;

export class BindGroup {

    public readonly label: string;
    public readonly index: number;
    public readonly pipeline: Pipeline;

    private readonly _handle: GPUBindGroup;

    public constructor(pipeline: Pipeline, label: string, index: number, resources: BindableResource[]) {
        this.pipeline = pipeline;
        this.label = label;
        this.index = index;
        this._handle = pipeline.renderer.underlying.device.createBindGroup({
            label: label,
            layout: pipeline["_handle"].getBindGroupLayout(index),
            entries: resources.map((resource, index) => ({
                binding: index,
                resource: this.getUnderlyingResource(resource)
            }))
        });
    }

    private getUnderlyingResource(resource: BindableResource): GPUBindingResource {
        if (resource instanceof TextureSampler) {
            return resource["_handle"];
        } else if (resource instanceof Texture) {
            return resource["_handle"].createView();
        } else if (resource instanceof Buffer) {
            return { label: "Buffer", buffer: resource["_handle"] };
        } else {
            throw new Error.Fatal("Unable to get underlying resource while attempting to bind.");
        }
    }

}