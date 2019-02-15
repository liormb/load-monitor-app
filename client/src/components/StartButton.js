import React from 'react';
import { connect } from 'react-redux';
import { startMonitor } from '@actions';

// components
import Button from '@common/Button';

const StartButton = ({ onClick }) => (
    <Button label="Start" onClick={onClick} />
);

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(startMonitor()),
});

export default connect(null, mapDispatchToProps)(StartButton);
