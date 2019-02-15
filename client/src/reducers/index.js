import * as VARS from '../utils/constants';
import * as TYPES from '../actions/types';
import Queue from '../utils/Queue';

const initialState = {
    duration: VARS.DURATION,
    interval: VARS.INTERVAL,
    timerId: null,
    hasHighLoad: false,
    loads: new Queue({ capacity: 60 || VARS.LOAD_CAPACITY }),
    notifications: [],
};

function rootReducers(state = initialState, action) {
    const { loads } = state;
    const { type, payload } = action;

    switch (type) {
        case TYPES.SET_TIMER_ID:
            return {
                ...state,
                timerId: payload.timerId,
            };
        case TYPES.UNSET_TIMER_ID:
            if (state.timerId) {
                clearInterval(state.timerId);
            }
            return {
                ...state,
                timerId: null,
            };
        case TYPES.ADD_LOAD:
            const newLoads = new Queue({
                capacity: loads.capacity,
                data: [...loads.print()],
            })

            newLoads.enqueue(payload.load);

            return {
                ...state,
                loads: newLoads,
            };
        case TYPES.CHECK_HIGH_LOAD:
            const uptimeLoads = loads.print()
                .slice(0, VARS.MAX_UPTIME_LOADS)
                .map(load => load.loadAvg[0])
                .reduce((sum, avg) => sum + avg, 0);

            const notifications = [...state.notifications];
            const uptimeAvgLoad = uptimeLoads / VARS.MAX_UPTIME_LOADS;

            const hasHighLoad =
                loads.size() >= VARS.MAX_UPTIME_LOADS &&
                uptimeAvgLoad > VARS.HIGH_LOAD_VALUE;

            if (state.hasHighLoad !== hasHighLoad) {
                const label = hasHighLoad ? 'High Load Generated an Alert' : 'Load Dropped to Normal State';
                const value = uptimeAvgLoad.toFixed(4);
                const time = new Date().toLocaleString();

                notifications.unshift({
                    type: hasHighLoad ? VARS.HIGH_LOAD : VARS.LOW_LOAD,
                    message: `${label} - load = ${value}, triggered at ${time}`,
                });
            }
            return {
                ...state,
                hasHighLoad,
                notifications,
            };
        case TYPES.RESET_INTERVAL:
            return {
                ...state,
                interval: payload.interval,
            };
        case TYPES.MONITOR_ERROR:
            return {
                ...state,
                error: payload.error,
            };
        default:
            return state;
    }
}

export default rootReducers;
