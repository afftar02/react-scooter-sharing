import React from 'react';
import axios from 'axios';
import styles from "./Authorization.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../../App";

export const Authorization = () => {

  const navigate = useNavigate();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState();

  const { setUserId } = React.useContext(AppContext);

  async function isRightAuthorization() {
    try {
      const { data } = await axios.get("http://localhost:8080/scooter-sharing/api/user");
      if (data.find(user => user.email === email && user.password === password)) {
        setUserId(data.find(user => user.email === email && user.password === password).id);
        navigate('/home');
      }
      else {
        setErrorMessage("Data entered incorrectly!");
      }
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
          <input type="email" placeholder="Email address" onChange={(event) => setEmail(event.target.value)} />
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
