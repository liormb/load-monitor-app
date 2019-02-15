import React from 'react';
import { connect } from 'react-redux';
import { stopMonitor } from '@actions';

// components
import Button from '@common/Button';

const StopButton = ({ onClick }) => (
    <Button label="Stop" onClick={onClick} />
);

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(stopMonitor()),
});

export default connect(
    null,
    mapDispatchToProps,
)(StopButton);
