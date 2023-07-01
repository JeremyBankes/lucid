import { Renderer } from "./Renderer";
import { Buffer } from "./Buffer";

export class DescribedBuffer extends Buffer {

    public constructor(renderer: Renderer, usage: number) {
        super(renderer, usage, 0);
    }

}