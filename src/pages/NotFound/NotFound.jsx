import React from 'react';
import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.message}>
            <span>😕</span>
            Not Found
        </h1>
    </div>
  )
}
