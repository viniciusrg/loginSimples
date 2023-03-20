import React from 'react';
import Styles from './containerForm.module.css';

function ContainerForm({ children }) {
    return (
        <div className={Styles.containerForm}>
            {children}
        </div>
    )
}

export default ContainerForm;