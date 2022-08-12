export default class Vector {
    _size;
    components;
    constructor(...components) {
        this.components = components;
        this._size = this.components.length;
    }
    get size() {
        return this._size;
    }
    componentWiseOperation(operation, vectorOrFirstComponent, ...otherComponents) {
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
    set(...values) {
        if (this.components.length !== values.length) {
            throw new Error(`${this.size}-component vector cannot be set with ${values.length} values.`);
        }
        for (let i = 0; i < values.length; i++) {
            this.components[i] = values[i];
        }
    }
    add(vectorOrFirstComponent, ...otherComponents) {
        return this.componentWiseOperation((a, b) => a + b, vectorOrFirstComponent, ...otherComponents);
    }
    subtract(vectorOrFirstComponent, ...otherComponents) {
        return this.componentWiseOperation((a, b) => a - b, vectorOrFirstComponent, ...otherComponents);
    }
    multiply(vectorOrFirstComponent, ...otherComponents) {
        return this.componentWiseOperation((a, b) => a * b, vectorOrFirstComponent, ...otherComponents);
    }
    divide(vectorOrFirstComponent, ...otherComponents) {
        return this.componentWiseOperation((a, b) => a / b, vectorOrFirstComponent, ...otherComponents);
    }
    modulate(vectorOrFirstComponent, ...otherComponents) {
        return this.componentWiseOperation((a, b) => a % b, vectorOrFirstComponent, ...otherComponents);
    }
    getSum(vectorOrFirstComponent, ...otherComponents) {
        return this.clone().add(vectorOrFirstComponent, ...otherComponents);
    }
    getDifference(vectorOrFirstComponent, ...otherComponents) {
        return this.clone().subtract(vectorOrFirstComponent, ...otherComponents);
    }
    getProduct(vectorOrFirstComponent, ...otherComponents) {
        return this.clone().multiply(vectorOrFirstComponent, ...otherComponents);
    }
    getQuotient(vectorOrFirstComponent, ...otherComponents) {
        return this.clone().divide(vectorOrFirstComponent, ...otherComponents);
    }
    getRemainder(vectorOrFirstComponent, ...otherComponents) {
        return this.clone().modulate(vectorOrFirstComponent, ...otherComponents);
    }
    getDotProduct(vectorOrFirstComponent, ...otherComponents) {
        const product = this.clone().multiply(vectorOrFirstComponent, ...otherComponents);
        return product.components.reduce((sum, component) => sum + component, 0);
    }
    getDistance(vectorOrFirstComponent, ...otherComponents) {
        const intermediary = this.clone().componentWiseOperation((a, b) => (b - a) * (b - a), vectorOrFirstComponent, ...otherComponents);
        return Math.sqrt(intermediary.components.reduce((sum, component) => sum + component, 0));
    }
    getMagnitude() {
        return this.getDistance(new Vector(this.size));
    }
    isZero() {
        return this.components.every((component) => component === 0);
    }
    clone() {
        return new Vector(this.components[0], ...this.components.slice(1));
    }
    toString() {
        return `(${this.components.join(', ')})`;
    }
}
