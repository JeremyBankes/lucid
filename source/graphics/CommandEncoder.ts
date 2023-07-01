import { Color } from "@jeremy-bankes/toolbox/shared";
import { RenderPassEncoder } from "./RenderPassEncoder";
import { Renderer } from "./Renderer";
import { Texture } from "./Texture";

export class CommandEncoder {

    public readonly renderer: Renderer;

    private _handle: GPUCommandEncoder;

    public constructor(renderer: Renderer) {
        this.renderer = renderer;
        this._handle = renderer.underlying.device.createCommandEncoder();
    }

    public beginRenderPass(clearColor: Color, texture?: Texture) {
        const gpuTexture = texture === undefined ? this.renderer.underlying.context.getCurrentTexture() : texture["_handle"];
        const view = gpuTexture.createView();
        return RenderPassEncoder["create"](this._handle.beginRenderPass({
            colorAttachments: [{
                clearValue: {
                    r: clearColor.red,
                    g: clearColor.green,
                    b: clearColor.blue,
                    a: clearColor.alpha
                },
                loadOp: "clear",
                storeOp: "store",
                view
            }]
        }));
    }

    public endRenderPass(renderPassEncoder: RenderPassEncoder) {
        renderPassEncoder["_handle"].end();
    }

    public submit() {
        this.renderer.underlying.device.queue.submit([this._handle.finish()]);
    }

}