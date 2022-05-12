import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Registration.module.scss";

export const Registration = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.block}>
                <h2>Registration scooter-sharing</h2>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Second name" />
                    <input type="email" placeholder="Email address" />
                    <input type="password" placeholder="Password" />
                    <Link to="/home">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
