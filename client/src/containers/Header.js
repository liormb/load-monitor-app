import React from 'react';
import styles from './styles/Header.scss';

const Header = () => (
    <h1 className={styles.wrapper}>
        CPU Load Monitor
    </h1>
);

export default React.memo(Header);
