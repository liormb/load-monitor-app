export const DURATION = 1000 * 60 * 10;   // 10 min
export const INTERVAL = 1000 * 10;        // 10 sec
export const MIN_INTERVAL = 1000;
export const MAX_INTERVAL = 10000;
export const STEP_INTERVAL = 1000;

export const MAX_UPTIME = 1000 * 60 * 2;  // 2 min
export const HIGH_LOAD_VALUE = 1;
export const LOAD_CAPACITY = DURATION / INTERVAL;
export const MAX_UPTIME_LOADS = MAX_UPTIME / INTERVAL;

export const LOW_LOAD = 'LOW_LOAD';
export const HIGH_LOAD = 'HIGH_LOAD';
