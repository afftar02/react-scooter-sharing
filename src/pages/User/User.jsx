import React from 'react';
import { UserScooterCard } from '../../components/UserScooterCard/UserScooterCard';
import styles from "./User.module.scss";
import axios from 'axios';
import { AppContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setAccess_token, setRefresh_token } from '../../redux/slices/tokenSlice';
import { setUserItems, setUserName, setUserEmail } from '../../redux/slices/userSlice';

export const User = () => {
  const dispatch = useDispatch();

  const { userId, access_token } = useSelector((state) => state.token);
  const { userItems, userName, userEmail } = useSelector((state) => state.user);

  const { refreshTokens } = React.useContext(AppContext);

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
      dispatch(setUserName(userResponse.data.firstName + " " + userResponse.data.secondName));
      dispatch(setUserEmail(userResponse.data.username));
      if (userResponse.data.scooters.length > 0) {
        dispatch(setUserItems(userResponse.data.scooters));
      }
    } catch (error) {
      if (error.response.status === 403) {
        await refreshTokens();
      }
      else {
        alert('Data loading error!');
      }
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
    dispatch(setUserId());
    dispatch(setAccess_token());
    dispatch(setRefresh_token());
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
            setUserItems={setUserItems} />//TODO: Remove
        ))}
      </div>
    </div>
  )
}
