import React from 'react';
import styles from './styles/IntervalBoard.scss';

// components
import Board from '../components/common/Board';
import RangeSlider from '../components/RangeSlider';

const IntervalBoard = () => (
    <Board
        title="Intervals"
        theme={{
            wrapper: styles.wrapper,
            title: styles.title,
        }}
    >
        <RangeSlider />
    </Board>
);

export default IntervalBoard;
