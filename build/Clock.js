export default class Clock {
    lastTimeCheck;
    timerMap;
    constructor() {
        this.lastTimeCheck = this.now;
        this.timerMap = {};
    }
    get now() {
        return performance.now() / 1000;
    }
    get deltaTime() {
        const deltaTime = this.now - this.lastTimeCheck;
        this.lastTimeCheck = this.now;
        return deltaTime;
    }
    createTimer(label, duration) {
        this.timerMap[label] = { duration, lastTriggerTime: this.now };
    }
    removeTimer(label) {
        delete this.timerMap[label];
    }
    hasTimerElapsed(label) {
        if (label in this.timerMap) {
            const timer = this.timerMap[label];
            if (this.now - timer.lastTriggerTime > timer.duration) {
                timer.lastTriggerTime = this.now;
                return true;
            }
            return false;
        }
        else {
            throw new Error(`No timer exists with label ${label}. Make sure to create one first with Clock.createTimer().`);
        }
    }
}
