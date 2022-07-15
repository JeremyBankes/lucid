interface Timer {
    duration: number,
    lastTriggerTime: number
}

interface TimerMap {
    [key: string]: Timer
}

export default class Clock {

    private lastTimeCheck: number;
    private timerMap: TimerMap;

    public constructor() {
        this.lastTimeCheck = this.now;
        this.timerMap = {};
    }

    public get now() {
        return performance.now() / 1000;
    }

    public get deltaTime() {
        const deltaTime = this.now - this.lastTimeCheck;
        this.lastTimeCheck = this.now;
        return deltaTime;
    }

    public createTimer(label: string, duration: number) {
        this.timerMap[label] = { duration, lastTriggerTime: this.now };
    }

    public removeTimer(label: string) {
        delete this.timerMap[label];
    }

    public hasTimerElapsed(label: string) {
        if (label in this.timerMap) {
            const timer = this.timerMap[label];
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