import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as VARS from '../utils/constants';
import styles from './styles/Notifications.scss';

const Notifications = ({ notifications }) => (
    <div className={styles.wrapper}>
        {notifications.map(({ type, message }, key) => (
            <div
                key={key}
                className={classNames({
                    [styles.message]: true,
                    [styles.lowLoad]: type === VARS.LOW_LOAD,
                    [styles.highLoad]: type === VARS.HIGH_LOAD,
                })}
            >
                {message}
            </div>
        ))}
    </div>
);

const mapStateToProps = state => ({
    notifications: state.notifications,
});

export default connect(
    mapStateToProps,
)(React.memo(Notifications));
