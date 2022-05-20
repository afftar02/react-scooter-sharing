import React from 'react';
import { UserScooterCard } from '../../components/UserScooterCard/UserScooterCard';
import styles from "./User.module.scss";
import axios from 'axios';
import { AppContext } from "../../App";


export const User = () => {

  const [userItems, setUserItems] = React.useState();
  const [userName,setUserName] = React.useState();
  const [userEmail,setUserEmail] = React.useState();

  const { userId } = React.useContext(AppContext);

  React.useEffect(() => {
    async function getUserScooters() {
      try {
        const { data } = await axios.get(`http://localhost:8080/scooter-sharing/api/user/${userId}`);
        setUserName(data.firstName + " " + data.secondName);
        setUserEmail(data.email);
        if (data.scooters.length > 0) {
          setUserItems(data.scooters);
        }
      } catch (error) {
        alert('Ошибка загрузки данных!');
      }
    }
    getUserScooters();
  }, []);

  return (
    <div className={styles.userContent}>
      <div className={styles.userInfoContainer}>
        <h3>User info</h3>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>Name: {userName}</li>
          <li className={styles.infoItem}>Email: {userEmail}</li>
        </ul>
      </div>
      <div className={styles.userScootersContainer}>
        {userItems && userItems.map((item) => (
          <UserScooterCard
            imageUrl={item.imageUrl}
            battery={item.battery}
            model={item.modelName} />
        ))}
      </div>
    </div>
  )
}
