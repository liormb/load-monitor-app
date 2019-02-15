import request from '../utils/request';
import * as VARS from '../utils/constants';
import * as TYPES from './types';

export const pingMonitor = () => dispatch => {
    request('load')
        .then(data => dispatch(addLoad(data.monitor.load)))
        .catch(err => dispatch(monitorError(err.message)))
};

export const startMonitor = () => (dispatch, getState) => {
    const { duration, interval, timerId } = getState();

    if (timerId) {
        dispatch(unsetTimerId());
    }

    request('start', 'POST', { duration, interval })
        .then(() => {
            let startTime = new Date();

            const newTimerId = setInterval(() => {
                const elapsedTime = (new Date()).getTime() - startTime.getTime();

                if (elapsedTime >= VARS.MAX_UPTIME) {
                    startTime = new Date();
                    dispatch(checkHighLoad());
                }
                dispatch(pingMonitor());
            }, interval);
            
            dispatch(pingMonitor());
            dispatch(setTimerId(newTimerId));
        })
        .catch(err => dispatch(monitorError(err.message)))
};

export const stopMonitor = () => dispatch => {
    request('stop', 'POST')
        .then(() => dispatch(unsetTimerId()))
        .catch(err => dispatch(monitorError(err.message)))
};

export const restartMonitor = interval => (dispatch, getState) => {
    const { timerId } = getState();

    dispatch(resetInterval(interval));

    if (timerId) {
        dispatch(stopMonitor());
        dispatch(startMonitor());
    }
};

export const setTimerId = timerId => ({
    type: TYPES.SET_TIMER_ID,
    payload: { timerId },
});

export const unsetTimerId = () => ({
    type: TYPES.UNSET_TIMER_ID,
});

export const addLoad = load => ({
    type: TYPES.ADD_LOAD,
    payload: { load },
});

export const checkHighLoad = time => ({
    type: TYPES.CHECK_HIGH_LOAD,
});

export const resetInterval = interval => ({
    type: TYPES.RESET_INTERVAL,
    payload: { interval },
});

export const monitorError = error => ({
    type: TYPES.MONITOR_ERROR,
    payload: { error },
});
