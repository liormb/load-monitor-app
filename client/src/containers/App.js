import React from 'react';
import styles from './styles/App.scss';

// components
import Header from './Header';
import ControllerBoard from './ControllerBoard';
import IntervalBoard from './IntervalBoard';
import NotificationBoard from './NotificationBoard';
import ChartBoard from './ChartBoard';

const App = () => (
    <div className={styles.wrapper}>
        <Header />
        <div className={styles.sections}>
            <div className={styles.topSection}>
                <ControllerBoard />
                <IntervalBoard />
                <NotificationBoard />
            </div>
            <div className={styles.bottomSection}>
                <ChartBoard />
            </div>
        </div>
    </div>
);

export default App;
