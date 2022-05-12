import React from 'react';
import styles from "./Authorization.module.scss";
import { Link } from 'react-router-dom';

export const Authorization = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.block}>
        <h2>Log in to scooter-sharing</h2>
        <div className={styles.inputContainer}>
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <Link to="/home">
            <button className={styles.logInButton}>Log In</button>
          </Link>
          <div className={styles.orBlock}>or</div>
          <Link to="/registration">
            <button className={styles.registerButton}>Create New Account</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
