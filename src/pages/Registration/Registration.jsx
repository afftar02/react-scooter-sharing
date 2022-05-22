import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Registration.module.scss";
import { AppContext } from "../../App";
import axios from 'axios';

export const Registration = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = React.useState();
    const [secondName, setSecondName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState();

    const { setUserId } = React.useContext(AppContext);

    const onFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const onSecondNameChange = (event) => {
        setSecondName(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onRegisterClick = () => {
        async function Register() {
            try {
                const response = await axios.post("http://localhost:8080/scooter-sharing/api/user", { firstName, secondName, email, password });
                setUserId(response.data.userId);
                navigate('/home');
            } catch (error) {
                setErrorMessage("Registration error!");
            }
        }
        Register();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.block}>
                <h2>Registration scooter-sharing</h2>
                {
                    errorMessage &&
                    <p className={styles.errorMessage}>
                        {errorMessage}
                    </p>
                }
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="First name" onChange={onFirstNameChange} />
                    <input type="text" placeholder="Second name" onChange={onSecondNameChange} />
                    <input type="email" placeholder="Email address" onChange={onEmailChange} />
                    <input type="password" placeholder="Password" onChange={onPasswordChange} />
                    <button onClick={onRegisterClick}>Register</button>
                </div>
            </div>
        </div>
    )
}
