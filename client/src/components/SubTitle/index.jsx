import React from 'react';
import Styles from './subTitle.module.css';

function SubTitle({ children }) {
    return (
        <div className={Styles.subTitle}>
            {children}
        </div>
    )
}

export default SubTitle;