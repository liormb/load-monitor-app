import React from 'react';
import styles from './styles/NotificationBoard.scss';

// components
import Board from '../components/common/Board';
import Notifications from '../components/Notifications';

const NotificationBoard = () => (
    <Board
        title="Notifications"
        theme={{ wrapper: styles.wrapper }}
    >
        <Notifications />
    </Board>
);

export default NotificationBoard;
