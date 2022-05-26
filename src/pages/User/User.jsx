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

  const { userId, setUserId , access_token, setAccess_token, setRefresh_token, refreshTokens } = React.useContext(AppContext);

  const navigate = useNavigate();

  async function getUserScooters() {
    try {
      const userResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/user/${userId}`,
        headers: {
          Authorization: access_token
        }
      });
      setUserName(userResponse.data.firstName + " " + userResponse.data.secondName);
      setUserEmail(userResponse.data.username);
      if (userResponse.data.scooters.length > 0) {
        setUserItems(userResponse.data.scooters);
      }
    } catch (error) {
      if (error.response.status === 403) {
        refreshTokens();
      }
      else {
        alert('Data loading error!');
      }
    }
  }

  React.useEffect(() => {
    getUserScooters();
  }, []);

  const onLogOffClick = () => {
    setUserId();
    setAccess_token();
    setRefresh_token();
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
            {...item}
            setUserItems={setUserItems} />
        ))}
      </div>
    </div>
  )
}
