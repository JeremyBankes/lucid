export default class Clock {
    _creationTime;
    _lastTimeCheck;
    _timerMap;
    constructor() {
        this._creationTime = this.now;
        this._lastTimeCheck = this._creationTime;
        this._timerMap = {};
    }
    get now() {
        return performance.now() / 1000;
    }
    get deltaTime() {
        const deltaTime = this.now - this._lastTimeCheck;
        this._lastTimeCheck = this.now;
        return deltaTime;
    }
    get age() {
        return this.now - this._creationTime;
    }
    createTimer(label, duration) {
        this._timerMap[label] = { duration, lastTriggerTime: this.now };
    }
    removeTimer(label) {
        delete this._timerMap[label];
    }
    hasTimerElapsed(label) {
        if (label in this._timerMap) {
            const timer = this._timerMap[label];
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
