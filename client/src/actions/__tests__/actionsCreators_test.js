import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as types from '../types';
import * as actions from '../index';

describe('Actions', () => {
    it('should create an action to set the timer id', () => {
        const timerId = 1;
        const expectedAction = {
            type: types.SET_TIMER_ID,
            payload: { timerId },
        };
        expect(actions.setTimerId(timerId)).toEqual(expectedAction);
    });
    it('should create an action to unset the timer id', () => {
        const expectedAction = {
            type: types.UNSET_TIMER_ID,
        };
        expect(actions.unsetTimerId()).toEqual(expectedAction);
    });
    it('should create an action to add the load payload', () => {
        const load = { maxSize: 10 };
        const expectedAction = {
            type: types.ADD_LOAD,
            payload: { load },
        };
        expect(actions.addLoad(load)).toEqual(expectedAction);
    });
    it('should create an action to check if current load is high', () => {
        const expectedAction = {
            type: types.CHECK_HIGH_LOAD,
        };
        expect(actions.checkHighLoad()).toEqual(expectedAction);
    });
    it('should create an action to reset the interval value', () => {
        const interval = 10;
        const expectedAction = {
            type: types.RESET_INTERVAL,
            payload: { interval },
        };
        expect(actions.resetInterval(interval)).toEqual(expectedAction);
    });
    it('should create an action to set the error message', () => {
        const error = { message: 'Error' };
        const expectedAction = {
            type: types.MONITOR_ERROR,
            payload: { error },
        };
        expect(actions.monitorError(error)).toEqual(expectedAction);
    });
});
