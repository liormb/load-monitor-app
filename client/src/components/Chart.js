import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as VARS from '../utils/constants';
import styles from './styles/Chart.scss';

// components
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    Tooltip,
} from 'recharts';

function getTimeLabel(val) {
    const total = val * (VARS.INTERVAL / 1000);

    if (total >= 60 * 60) {
        return `${(total / 60 / 60).toFixed(2)} hour`;
    } else if (total >= 60) {
        return `${(total / 60).toFixed(1)} min`;
    }
    return `${Math.round(total)} sec`;
}

function getData(loads) {
    return loads.print()
        .reduce((data, item, index) => ([
            ...data,
            {
                time: getTimeLabel(index),
                loadAvg: item.loadAvg[0],
            },
        ]), []);
}

let width;
let height;

function Chart({ loads, hasHighLoad }) {
    const data = getData(loads).reverse();

    useEffect(() => {
        const chart = document.getElementById('chart');
        const positions = chart.getBoundingClientRect();
        width = positions.width;
        height = positions.height;
    });

    return (
        <div id="chart" className={styles.wrapper}>
            <AreaChart
                width={width}
                height={height}
                data={data}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
                <CartesianGrid
                    animationEasing="ease"
                    animationDuration={0}
                    strokeDasharray="3 3"
                    vertical={false}
                    isAnimationActive={false}
                />
                <XAxis
                    hide
                    dataKey="time"
                    allowDecimals
                    minTickGap={100}
                    allowDuplicatedCategory={false}
                />
                <YAxis />
                <Tooltip />
                <ReferenceLine
                    label="CRITICAL"
                    isFront
                    y={VARS.HIGH_LOAD_VALUE}
                    stroke="red"
                    strokeDasharray="3 3"
                />
                <Area
                    type="monotoneX"
                    dataKey="loadAvg"
                    animationDuration={0}
                    stroke="#333"
                    fill={hasHighLoad ? 'red' : 'green'}
                    opacity={0.8}
                />
            </AreaChart>
      </div>
    );
}

const mapStateToProps = state => ({
    loads: state.loads,
    hasHighLoad: state.hasHighLoad,
});

export default connect(mapStateToProps)(Chart);
