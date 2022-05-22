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

  const onEmailInputChanged = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordInputChanged = (event) => {
    setPassword(event.target.value);
  }

  const logInClick = () => {
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
    isRightAuthorization();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.block}>
        <h2>Log in to scooter-sharing</h2>
        <div className={styles.inputContainer}>
          {
            errorMessage && 
            <p className={styles.errorMessage}>
              {errorMessage}
            </p>
          }
          <input type="email" placeholder="Email address" onChange={onEmailInputChanged} />
          <input type="password" placeholder="Password" onChange={onPasswordInputChanged} />
          <button className={styles.logInButton} onClick={logInClick}>Log In</button>
          <div className={styles.orBlock}>or</div>
          <Link to="/registration">
            <button className={styles.registerButton}>Create New Account</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
