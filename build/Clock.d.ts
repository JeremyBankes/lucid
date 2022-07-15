export default class Clock {
    private lastTimeCheck;
    private timerMap;
    constructor();
    get now(): number;
    get deltaTime(): number;
    createTimer(label: string, duration: number): void;
    removeTimer(label: string): void;
    hasTimerElapsed(label: string): boolean;
}
