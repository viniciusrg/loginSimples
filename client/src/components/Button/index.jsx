import React from 'react';
import Styles from './button.module.css';

function Button({ children, type }) {
    return (
        <button className={Styles.button} type={type}>{children}</button>
    )
}

export default Button;