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

    async function Register() {
        try {
            const response = await axios.post("http://localhost:8080/scooter-sharing/api/user/create", { firstName, secondName, email, password });
            setUserId(response.data.id);
            navigate('/home');
        } catch (error) {
            setErrorMessage("Registration error!");
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.block}>
                <h2>Registration scooter-sharing</h2>
                <div className={styles.inputContainer}>
                    <p className={styles.errorMessage}>{errorMessage}</p>
                    <input type="text" placeholder="First name" onChange={(event) => setFirstName(event.target.value)} />
                    <input type="text" placeholder="Second name" onChange={(event) => setSecondName(event.target.value)} />
                    <input type="email" placeholder="Email address" onChange={(event) => setEmail(event.target.value)} />
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <button onClick={Register}>Register</button>
                </div>
            </div>
        </div>
    )
}
