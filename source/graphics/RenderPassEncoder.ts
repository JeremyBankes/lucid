import { BindGroup, Pipeline } from "..";
import { Model } from "./Model";

export class RenderPassEncoder {

    private _handle: GPURenderPassEncoder;

    private constructor(renderPassEncoder: GPURenderPassEncoder) {
        this._handle = renderPassEncoder;
    }

    public render(pipeline: Pipeline, bindGroup: BindGroup, model: Model) {
        this._handle.setPipeline(pipeline["_handle"]);
        this._handle.setBindGroup(0, bindGroup["_handle"]);
        this._handle.setVertexBuffer(0, model.vertexBuffer["_handle"]);
        if (model.indexBuffer === undefined) {
            this._handle.draw(model.vertexBuffer.size);
        } else {
            this._handle.setIndexBuffer(model.indexBuffer["_handle"], "uint16");
            this._handle.drawIndexed(model.indexBuffer.size);
        }
    }

    private static create(renderPassEncoder: GPURenderPassEncoder) {
        return new RenderPassEncoder(renderPassEncoder);
    }

}