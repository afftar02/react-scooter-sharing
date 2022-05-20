import React from 'react';
import styles from "./UserScooterCard.module.scss";

export const UserScooterCard = ({ id, imageUrl, battery, model }) => {

  const onStopClick = () => {
    
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.leftPartContainer}>
        <img className={styles.scooterImage} src={imageUrl} alt="scooter" />
        <p>{model}</p>
      </div>
      <div className={styles.rightPartContainer}>
        <div className={styles.batteryBlock}>
          <img height={25} src="img/half-green-battery.png" alt="battery" />
          <span>{battery}%</span>
        </div>
        <span>20:45</span>
        <button className={styles.stopButton} onClick={onStopClick}>Stop</button>
      </div>
    </div>
  )
}
