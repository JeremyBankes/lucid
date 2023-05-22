export type FixedArray<Size extends number, Accumulator extends number[] = []> = (
    Accumulator["length"] extends Size ? (
        Accumulator
    ) : (
        FixedArray<Size, [number, ...Accumulator]>
    )
);

type ComponentWiseOperation = (operandA: number, operandB: number) => number;
type VectorArgument<Size extends number> = GenericVector<Size> | FixedArray<Size> | number;

export class GenericVector<Size extends number> {

    public readonly components: FixedArray<Size>;

    public constructor(...components: FixedArray<Size>) {
        this.components = components;
    }

    public add(scalar: number): this;
    public add(vector: GenericVector<Size>): this;
    public add(array: FixedArray<Size>): this;
    public add(value: VectorArgument<Size>) { return this.operation(value, (a, b) => a + b); }

    public subtract(scalar: number): this;
    public subtract(vector: GenericVector<Size>): this;
    public subtract(array: FixedArray<Size>): this;
    public subtract(value: VectorArgument<Size>) { return this.operation(value, (a, b) => a - b); }

    public multiply(scalar: number): this;
    public multiply(vector: GenericVector<Size>): this;
    public multiply(array: FixedArray<Size>): this;
    public multiply(value: VectorArgument<Size>) { return this.operation(value, (a, b) => a * b); }

    public divide(scalar: number): this;
    public divide(vector: GenericVector<Size>): this;
    public divide(array: FixedArray<Size>): this;
    public divide(value: VectorArgument<Size>) { return this.operation(value, (a, b) => a / b); }

    public set(scalar: number): this;
    public set(vector: GenericVector<Size>): this;
    public set(array: FixedArray<Size>): this;
    public set(value: VectorArgument<Size>) { return this.operation(value, (_, b) => b); }

    public dot(value: GenericVector<Size>) { return this.clone().multiply(value).getSum(); }

    public distance(vector: GenericVector<Size>) {
        const difference = this.clone().subtract(vector);
        return Math.sqrt(difference.multiply(difference).getSum());
    }

    public clone(): GenericVector<Size> {
        return new GenericVector(...this._components as FixedArray<Size>);
    }

    public getSum() {
        return this._components.reduce((sum, value) => sum + value);
    }

    public getMaginitude() {
        return this.distance(this.clone().set(0));
    }

    public operation(value: VectorArgument<Size>, operation: ComponentWiseOperation) {
        if (typeof value === "number") {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value);
            }
        } else if (value instanceof GenericVector) {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value._components[i]);
            }
        } else {
            for (let i = 0; i < this._components.length; i++) {
                this._components[i] = operation(this._components[i], value[i as never]);
            }
        }
        return this;
    }

    public toString() {
        return `[ ${this._components.join(", ")} ]`;
    }

    private get _components(): number[] {
        return this.components;
    }

}