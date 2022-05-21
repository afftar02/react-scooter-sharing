import React from 'react';
import styles from "./UserScooterCard.module.scss";
import { AppContext } from "../../App";
import axios from 'axios';

export const UserScooterCard = ({ id, imageUrl, battery, model,setUserItems }) => {

  const { userId } = React.useContext(AppContext);

  const onStopClick = async () => {
    try{
      axios.put('http://localhost:8080/scooter-sharing/api/scooters',{ id, "booked":false });
      const userResponse = await axios.get(`http://localhost:8080/scooter-sharing/api/user/${userId}`);
      const updatedUserScooters = userResponse.data.scooters.filter(scooter => scooter.id !== id);
      axios.put('http://localhost:8080/scooter-sharing/api/user',{ "id": userId, "scooters":updatedUserScooters });
      setUserItems(updatedUserScooters);
    } catch (error) {
      alert('Ошибка при удалении самоката!');
    }
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
