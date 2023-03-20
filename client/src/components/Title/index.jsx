import React from 'react';
import Styles from './title.module.css';

function Title({ children }) {
    return (
        <div className={Styles.title}>
            {children}
        </div>
    )
}

export default Title;