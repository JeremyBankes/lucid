class LabeledDurationMeasurement {

    /**
     * @param {string} label
     * @param {number} sinceTime
     */
    constructor(label, sinceTime) {
        this.label = label;
        this.sinceTime = sinceTime;
    }

}

/**
 * Used for measuring time.
 */
export default class Clock {

    constructor() {
        this.startTime = this.now;
        this.lastCallTime = this.startTime;

        this._durationMeasurments = /** @type {Object.<string, LabeledDurationMeasurement>} */ ({});
    }

    get now() {
        return performance.now() / 1000;
    }

    /**
     * Gets the amount of time that has passed since the last call to {@link deltaTime}.
     * Returns the amount of time that has passed since this clock was created on the first call.
     */
    get deltaTime() {
        const now = this.now;
        const deltaTime = now - this.lastCallTime;
        this.lastCallTime = now;
        return deltaTime;
    }

    /**
     * Gets the amount of time that has elapsed since this clock was created.
     */
    get time() {
        return this.now - this.startTime;
    }

    /**
     * Determines if {@link duration} has passed since the last call with the same {@link label}.
     * Typically uses to ensure things happen at a fixed rate within an update loop.
     * @param {string} label
     * @param {number} duration
     */
    hasElapsed(label, duration) {
        if (label in this._durationMeasurments) {
            const measurement = this._durationMeasurments[label];
            if (this.now - measurement.sinceTime > duration) {
                delete this._durationMeasurments[label];
                return true;
            }
        } else {
            this._durationMeasurments[label] = new LabeledDurationMeasurement(label, this.now);
        }
        return false;
    }

}