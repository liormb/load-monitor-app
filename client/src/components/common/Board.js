import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles/Board.scss';

function Board ({ title, theme = {}, children }) {
    const wrapperClass = classNames(styles.wrapper, theme.wrapper);
    const titleClass = classNames(styles.title, theme.title);

    return (
        <section className={wrapperClass}>
            <h3 className={titleClass}>
                {title}
            </h3>
            {children}
        </section>
    );
}

Board.propTypes = {
    title: PropTypes.string.isRequired,
    theme: PropTypes.shape({
        wrapper: PropTypes.any,
    }),
    children: PropTypes.node.isRequired,
};

export default Board;
