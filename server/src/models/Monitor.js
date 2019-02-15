import { setInterval, clearInterval } from 'timers';
import * as osHelpers from '../utils/osHelpers';

const DURATION = 10 * 60 * 1000;
const INTERVAL = 10 * 1000;

export default class Monitor {
    constructor(props = {}) {
        this.duration = props.duration || DURATION;
        this.interval = props.interval || INTERVAL;
        this.resetLoad();
    }
    resetLoad() {
        this.load = null;
    }
    getLoad() {
        return this.load;
    }
    addLoad() {
        const avarage = osHelpers.getCPULoadAvg();

        console.log(`CPU avarage: ${avarage}`);

        this.load = {
            model: osHelpers.getModel(),
            platform: osHelpers.getPlatform(),
            uptime: osHelpers.getUptime(),
            cpus: osHelpers.getCPUs(),
            cpuCount: osHelpers.getCPUCount(),
            loadAvg: osHelpers.getLoadAvg(),
            avarage,
            createdAt: new Date().getTime(),
            elapsedTime: (new Date()).getTime() - this.startTime.getTime(),
        };
    }
    startTimer() {
        if (!this.timerId) {
            this.addLoad();
            this.timerId = setInterval(this.addLoad.bind(this), this.interval);
        }
    }
    stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    start() {
        console.log('Monitor started');
        this.startTime = new Date();
        this.resetLoad();
        this.startTimer();
    }
    stop() {
        console.log('Monitor stopped');
        this.stopTimer();
    }
}
