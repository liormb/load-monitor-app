import React from 'react';
import styles from './styles/ControllerBoard.scss';

// components
import Board from '../components/common/Board';
import StartButton from '../components/StartButton';
import StopButton from '../components/StopButton';

const ControllerBoard = () => (
    <Board
        title="Controllers"
        theme={{
            wrapper: styles.wrapper,
            title: styles.title,
        }}
    >
        <StartButton />
        <StopButton />
    </Board>
);

export default React.memo(ControllerBoard);
