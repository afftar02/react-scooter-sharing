import React from 'react';
import axios from 'axios';
import qs from 'qs';
import styles from "./Authorization.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId, setAccess_token, setRefresh_token } from '../../redux/slices/tokenSlice';

export const Authorization = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();

  async function isRightAuthorization() {
    try {
      const loginResponse = await axios({
        method: 'post',
        url: 'http://localhost:8080/scooter-sharing/api/login',
        data: qs.stringify({
          username: username,
          password: password
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
      const userResponse = await axios({
        method: 'get',
        url: `http://localhost:8080/scooter-sharing/api/user/username?username=${username}`,
        headers: {
          Authorization: "Bearer " + loginResponse.data.access_token
        }
      });
      dispatch(setAccess_token("Bearer " + loginResponse.data.access_token));
      dispatch(setRefresh_token("Bearer " + loginResponse.data.refresh_token));
      dispatch(setUserId(userResponse.data.id));
      navigate('/home');
    } catch (error) {
      setErrorMessage("Authorization Error!");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.block}>
        <h2>Log in to scooter-sharing</h2>
        <div className={styles.inputContainer}>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <input type="email" placeholder="Email address" onChange={(event) => setUsername(event.target.value)} />
          <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
          <button className={styles.logInButton} onClick={isRightAuthorization}>Log In</button>
          <div className={styles.orBlock}>or</div>
          <Link to="/registration">
            <button className={styles.registerButton}>Create New Account</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
