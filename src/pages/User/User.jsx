import React from 'react';
import { UserScooterCard } from '../../components/UserScooterCard/UserScooterCard';
import styles from "./User.module.scss";
import axios from 'axios';
import { AppContext } from "../../App";
import { useNavigate } from 'react-router-dom';

export const User = () => {

  const [userItems, setUserItems] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userEmail, setUserEmail] = React.useState();

  const { userId, setUserId } = React.useContext(AppContext);

  const navigate = useNavigate();

  async function getUserScooters() {
    try {
      const { data } = await axios.get(`http://localhost:8080/scooter-sharing/api/user/${userId}`);
      setUserName(data.firstName + " " + data.secondName);
      setUserEmail(data.email);
      if (data.scooters.length > 0) {
        setUserItems(data.scooters);
      }
    } catch (error) {
      alert('Data loading error!');
    }
  }

  React.useEffect(() => {
    if (userId) {
      getUserScooters();
    }
    else {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogOffClick = () => {
    setUserId();
    navigate('/');
  }

  return (
    <div className={styles.userContent}>
      <div className={styles.userInfoContainer}>
        <h3>User info</h3>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>Name: {userName}</li>
          <li className={styles.infoItem}>Email: {userEmail}</li>
        </ul>
        <button className={styles.logOffButton} onClick={onLogOffClick}>Log off</button>
      </div>
      <div className={styles.userScootersContainer}>
        {userItems && userItems.map((item) => (
          <UserScooterCard
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            battery={item.battery}
            model={item.modelName}
            setUserItems={setUserItems} />
        ))}
      </div>
    </div>
  )
}
