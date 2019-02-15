import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { restartMonitor } from '@actions';
import * as VARS from '../utils/constants';
import styles from './styles/RangeSlider.scss';

// components
import { Range, Direction, getTrackBackground } from 'react-range';

const track = {
    display: 'flex',
    height: '90%',
    marginTop: '16px',
    marginBottom: '40px',
};

const innerTrack = values => ({
    width: '5px',
    borderRadius: '4px',
    background: getTrackBackground({
        values,
        min: VARS.MIN_INTERVAL,
        max: VARS.MAX_INTERVAL,
        direction: Direction.Down,
        colors: ['#CCC', '#548BF4'],
    }),
});
const thumb = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '32px',
    width: '32px',
    borderRadius: '4px',
    backgroundColor: '#FFF',
    boxShadow: '0 2px 6px #AAA',
};
const innerThumb = isDragged => ({
    width: '16px',
    height: '5px',
    backgroundColor: isDragged ? '#548BF4' : '#CCC',
});

const outside = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    backgroundColor: '#4C5A64',
    color: 'white',
};

function RangeSlider({ onChange }) {
    const [values, setValues] = useState([VARS.MAX_INTERVAL]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseEvent = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            onChange(values[0]);
        }
    };

    useEffect(() => {
        // mouseup event can be triggered when the user drag the slider but
        // release the mouse outside the thumb element (somewhere in the page).
        // In that case, we need to capture it in the document.
        window.addEventListener('mouseup', handleMouseEvent);

        return () => {
            window.removeEventListener('mouseup', handleMouseEvent);
        };
    });

    return (
        <div className={styles.wrapper}>
            <Range
                min={VARS.MIN_INTERVAL}
                max={VARS.MAX_INTERVAL}
                step={VARS.STEP_INTERVAL}
                direction={Direction.Down}
                values={values}
                onChange={setValues}
                renderTrack={({ props, children }) => (
                    <div style={{ ...props.style, ...track }}>
                        <div ref={props.ref} style={innerTrack(values)}>
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{ ...props.style, ...thumb }}
                        onMouseDown={() => setIsMouseDown(true)}
                    >
                        <div style={innerThumb(isDragged)} />
                    </div>
                )}
            />
            <div id="output" style={outside}>
                {`${values[0] / 1000} Sec`}
            </div>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
    onChange: interval => dispatch(restartMonitor(interval)),
});

export default connect(
    null,
    mapDispatchToProps,
)(React.memo(RangeSlider));
