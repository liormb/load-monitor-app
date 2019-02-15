import React from 'react';
import styles from './styles/ChartBoard.scss';

// components
import Board from '../components/common/Board';
import Chart from '../components/Chart';

const ChartBoard = () => (
    <Board
        title="Load Chart"
        theme={{ wrapper: styles.wrapper }}
    >
        <Chart />
    </Board>
);

export default ChartBoard;
