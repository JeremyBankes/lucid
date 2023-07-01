import { Buffer } from "./Buffer";

export class Model {

    public vertexBuffer: Buffer;
    public indexBuffer?: Buffer;

    public constructor(vertexBuffer: Buffer, indexBuffer?: Buffer) {
        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
    }

}