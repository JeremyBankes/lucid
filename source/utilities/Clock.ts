interface Timer {
    duration: number,
    lastTriggerTime: number
}

interface TimerMap {
    [key: string]: Timer
}

export class Clock {

    private _creationTime: number;
    private _lastTimeCheck: number;
    private _timerMap: TimerMap;

    public constructor() {
        this._creationTime = this.now;
        this._lastTimeCheck = this._creationTime;
        this._timerMap = {};
    }

    public get now() {
        return performance.now() / 1000;
    }

    public get deltaTime() {
        const deltaTime = this.now - this._lastTimeCheck;
        this._lastTimeCheck = this.now;
        return deltaTime;
    }

    public get age() {
        return this.now - this._creationTime;
    }

    public createTimer(label: string, duration: number) {
        this._timerMap[label] = { duration, lastTriggerTime: this.now };
    }

    public removeTimer(label: string) {
        delete this._timerMap[label];
    }

    public hasTimerElapsed(label: string) {
        if (label in this._timerMap) {
            const timer = this._timerMap[label];
            if (this.now - timer.lastTriggerTime > timer.duration) {
                timer.lastTriggerTime = this.now;
                return true;
            }
            return false;
        } else {
            throw new Error(`No timer exists with label ${label}. Make sure to create one first with Clock.createTimer().`);
        }
    }

}