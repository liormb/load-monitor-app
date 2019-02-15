import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Button.scss';

function Button({ label, onClick }) {
    return (
        <button
            className={styles.wrapper}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
