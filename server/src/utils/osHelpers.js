import os from 'os';

export function getPlatform() {
    return process.platform;
}
export function getUptime() {
    return os.uptime();
}
export function getCPUs() {
    return os.cpus();
}
export function getModel() {
    return getCPUs()[0].model;
}
export function getCPUCount() {
    return getCPUs().length;
}
export function getLoadAvg() {
    return os.loadavg();
}
export function getCPULoadAvg() {
    // CPU's load avarage in the last minute
    return getLoadAvg()[0] / getCPUCount();
}
