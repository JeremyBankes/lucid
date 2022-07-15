export default class VertexAttribute {
    index: number;
    size: number;
    type: number;
    normalized: boolean;
    stride: number;
    offset: number;
    enabled: boolean;
    constructor(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number);
}
