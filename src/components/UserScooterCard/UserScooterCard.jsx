import React from 'react';
import styles from "./UserScooterCard.module.scss";
import { CountDown } from '../CountDown/CountDown';
import { useDispatch, useSelector } from 'react-redux';
import { setUserItems } from '../../redux/slices/userSlice';
import { refreshTokens } from '../../redux/slices/tokenSlice';
import { setLocationName, setLocationDescription, stop } from '../../redux/slices/userScooterCardSlice';

export const UserScooterCard = ({ id, imageUrl, battery, modelName, timeLeft }) => {
  const dispatch = useDispatch();

  const { locationName, locationDescription } = useSelector((state) => state.userScooterCard);

  const [isHiddenInputOpened, setIsHiddenInputOpened] = React.useState(false);
  const [isWarning, setIsWarning] = React.useState(false);

  const onStopClick = async () => {
    if (isHiddenInputOpened) {
      if (locationName && locationDescription) {
        try {
          const info = { id, locationName, locationDescription };
          const updatedUserScooters = await dispatch(stop(info));
          dispatch(setUserItems(updatedUserScooters.payload));
        } catch (error) {
          if (error.response.status === 403) {
            await dispatch(refreshTokens());
          }
          else {
            alert('Error when deleting scooter!');
          }
        }
      }
      else {
        setIsWarning(true);
      }
    }
    else {
      setIsHiddenInputOpened(true);
    }
  }

  return (
    <div className={isHiddenInputOpened ? `${styles.cardContainer__opened} ${styles.cardContainer}` : styles.cardContainer}>
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
          <CountDown hours={timeLeft / 60 >= 1 ? Math.trunc(timeLeft / 60) : 0} minutes={timeLeft / 60 < 1 ? timeLeft : Math.round(((timeLeft / 60 - Math.trunc(timeLeft / 60)) * 60))} />
          <button className={isHiddenInputOpened ? `${styles.stopButton} ${styles.moveButton}` : `${styles.stopButton}`} onClick={onStopClick}>Stop</button>
        </div>
      </div>
      <div className={styles.locationHiddenContainer}>
        <h4>Enter new location for scooter:</h4>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Location name" onChange={(event) => dispatch(setLocationName(event.target.value))} className={isWarning ? styles.warning : ' '} />
          <textarea placeholder="Location description" onChange={(event) => dispatch(setLocationDescription(event.target.value))} className={isWarning ? styles.warning : ' '} />
        </div>
      </div>
    </div>
  )
}
