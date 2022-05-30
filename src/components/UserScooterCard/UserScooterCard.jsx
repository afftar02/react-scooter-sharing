import React from 'react';
import styles from "./UserScooterCard.module.scss";
import { AppContext } from "../../App";
import axios from 'axios';
import { CountDown } from '../CountDown/CountDown';

export const UserScooterCard = ({ id, imageUrl, battery, modelName, setUserItems, timeLeft }) => {

  const [isHiddenInputOpened, setIsHiddenInputOpened] = React.useState(false);
  const [height, setHeight] = React.useState();
  const [stopButtonTranslateY, setStopButtonTranslateY] = React.useState();
  const [warningMessage, setWarningMessage] = React.useState();
  const [locationName, setLocationName] = React.useState();
  const [locationDescription, setLocationDescription] = React.useState();

  const { userId, access_token, refreshTokens } = React.useContext(AppContext);

  const onStopClick = async () => {
    if (isHiddenInputOpened) {
      if (locationName && locationDescription) {
        try {
          await axios({
            method: 'put',
            url: `http://localhost:8080/scooter-sharing/api/scooters`,
            headers: {
              Authorization: access_token
            },
            data: {
              id, "location": { "name": locationName, "description": locationDescription }, "booked": false, "timeLeft": 0
            }
          });
          const userResponse = await axios({
            method: 'get',
            url: `http://localhost:8080/scooter-sharing/api/user/${userId}`,
            headers: {
              Authorization: access_token
            }
          });
          const updatedUserScooters = userResponse.data.scooters.filter(scooter => scooter.id !== id);
          await axios({
            method: 'put',
            url: `http://localhost:8080/scooter-sharing/api/user`,
            headers: {
              Authorization: access_token
            },
            data: {
              "id": userId, "scooters": updatedUserScooters
            }
          });
          setUserItems(updatedUserScooters);
        } catch (error) {
          if (error.response.status === 403) {
            await refreshTokens();
          }
          else {
            alert('Error when deleting scooter!');
          }
        }
      }
      else {
        setWarningMessage('Please, enter new location for scooter!');
      }
    }
    else {
      setIsHiddenInputOpened(true);
      setHeight('210px');
      setStopButtonTranslateY('140px');
    }
  }

  return (
    <div className={styles.cardContainer} style={{ height: height }}>
      <div className={styles.shortCardContainer}>
        <div className={styles.leftPartContainer}>
          <img className={styles.scooterImage} src={imageUrl} alt="scooter" />
          <p>{modelName}</p>
        </div>
        <div className={styles.rightPartContainer}>
          <div className={styles.batteryBlock}>
            <img height={25} src="img/half-green-battery.png" alt="battery" />
            <span>{battery}%</span>
          </div>
          <CountDown hours={timeLeft / 60 >= 1 ? Math.trunc(timeLeft/60) : 0 } minutes={timeLeft / 60 < 1 ? timeLeft : Math.round(((timeLeft/60 - Math.trunc(timeLeft/60))*60))} />
          <button className={styles.stopButton} onClick={onStopClick} style={{ transform: `translateY(${stopButtonTranslateY})` }}>Stop</button>
        </div>
      </div>
      <div className={styles.locationHiddenContainer}>
        <h4>Enter new location for scooter:</h4>
        <p>{warningMessage}</p>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Location name" onChange={(event) => setLocationName(event.target.value)} />
          <textarea placeholder="Location description" onChange={(event) => setLocationDescription(event.target.value)} />
        </div>
      </div>
    </div>
  )
}
