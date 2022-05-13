import React from 'react';
import { UserScooterCard } from '../../components/UserScooterCard/UserScooterCard';
import styles from "./User.module.scss";
import { AppContext } from "../../App";


export const User = () => {

  const { scooterChosenId } = React.useContext(AppContext);

  return (
    <div className={styles.userContent}>
        <div className={styles.userInfoContainer}>
            <h3>User info</h3>
            <ul className={styles.infoList}>
                <li className={styles.infoItem}>Name:</li>
                <li className={styles.infoItem}>Email:</li>
            </ul>
        </div>
        <div className={styles.userScootersContainer}>
          {
            scooterChosenId && 
            <UserScooterCard
              id = {scooterChosenId}
              imageUrl="img/xiaomi-scooter-1.png"
              battery={70}
              model="Xiaomi model 337"/>
          }
        </div>
    </div>
  )
}
