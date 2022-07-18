export default class Vector {

    private _size: number;
    public components: number[];

    public constructor(...components: number[]) {
        this.components = components;
        this._size = this.components.length;
    }

    public get size() {
        return this._size;
    }

    private componentWiseOperation(operation: (componentA: number, componentB: number) => number, vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        if (!(vectorOrFirstComponent instanceof Vector)) {
            if (otherComponents.length === 0) {
                for (let i = 0; i < this.size - 1; i++) {
                    otherComponents.push(vectorOrFirstComponent);
                }
            }
            vectorOrFirstComponent = new Vector(vectorOrFirstComponent, ...otherComponents);
        }
        if (this.size !== vectorOrFirstComponent.size) {
            throw new Error(`Unsure how to complete component-wise operation with ${vectorOrFirstComponent.size}-component and ${this.size}-component vector.`);
        }
        for (let i = 0; i < this.size; i++) {
            this.components[i] = operation(this.components[i], vectorOrFirstComponent.components[i]);
        }
        return this;
    }

    public set(...values: number[]) {
        if (this.components.length !== values.length) {
            throw new Error(`${this.size}-component vector cannot be set with ${values.length} values.`);
        }
        for (let i = 0; i < values.length; i++) {
            this.components[i] = values[i];
        }
    }

    public add(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.componentWiseOperation((a, b) => a + b, vectorOrFirstComponent, ...otherComponents);
    }

    public subtract(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.componentWiseOperation((a, b) => a - b, vectorOrFirstComponent, ...otherComponents);
    }

    public multiply(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.componentWiseOperation((a, b) => a * b, vectorOrFirstComponent, ...otherComponents);
    }

    public divide(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.componentWiseOperation((a, b) => a / b, vectorOrFirstComponent, ...otherComponents);
    }

    public modulate(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.componentWiseOperation((a, b) => a % b, vectorOrFirstComponent, ...otherComponents);
    }

    public getSum(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.clone().add(vectorOrFirstComponent, ...otherComponents);
    }

    public getDifference(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.clone().subtract(vectorOrFirstComponent, ...otherComponents);
    }

    public getProduct(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.clone().multiply(vectorOrFirstComponent, ...otherComponents);
    }

    public getQuotient(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.clone().divide(vectorOrFirstComponent, ...otherComponents);
    }

    public getRemainder(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        return this.clone().modulate(vectorOrFirstComponent, ...otherComponents);
    }

    public getDotProduct(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        const product = this.clone().multiply(vectorOrFirstComponent, ...otherComponents);
        return product.components.reduce((sum, component) => sum + component, 0);
    }

    public getDistance(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]) {
        const intermediary = this.clone().componentWiseOperation((a, b) => (b - a) * (b - a), vectorOrFirstComponent, ...otherComponents);
        return Math.sqrt(intermediary.components.reduce((sum, component) => sum + component, 0));
    }

    public getMagnitude() {
        return this.getDistance(new Vector(this.size));
    }

    public isZero() {
        return this.components.every((component) => component === 0);
    }

    public clone() {
        return new Vector(this.components[0], ...this.components.slice(1));
    }

    public toString() {
        return `(${this.components.join(', ')})`;
    }

}