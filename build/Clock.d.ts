export default class Clock {
    private _creationTime;
    private _lastTimeCheck;
    private _timerMap;
    constructor();
    get now(): number;
    get deltaTime(): number;
    get age(): number;
    createTimer(label: string, duration: number): void;
    removeTimer(label: string): void;
    hasTimerElapsed(label: string): boolean;
}
