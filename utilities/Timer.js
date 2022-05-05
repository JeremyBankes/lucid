export default class Timer {

    constructor() {
        this.timers = {};
    }

    /**
     * @param {string} name
     * @param {number} duration
     * @param {number} deltaTime
     */
    elapsed(name, duration, deltaTime) {
        if (!(name in this.timers)) {
            this.timers[name] = 0;
        }
        let elapsed = this.timers[name] > duration;
        if (elapsed) {
            this.timers[name] -= duration;
        } 
        this.timers[name] += deltaTime;
        return elapsed;
    }

}