import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Registration.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, setAccess_token, setRefresh_token } from '../../redux/slices/tokenSlice';
import { setUsername, setPassword, setFirstName, setSecondName } from '../../redux/slices/registrationSlice';
import axios from 'axios';
import qs from 'qs';

export const Registration = () => {
    const dispatch = useDispatch();

    const { username, password, firstName, secondName } = useSelector((state) => state.registration);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = React.useState();

    async function Register() {
        try {
            const response = await axios.post("http://localhost:8080/scooter-sharing/api/user", { firstName, secondName, username, password, "roles": [{ "name": "User" }] });
            dispatch(setUserId(response.data.id));
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
            dispatch(setAccess_token("Bearer " + loginResponse.data.access_token));
            dispatch(setRefresh_token("Bearer " + loginResponse.data.refresh_token));
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
                    <input type="text" placeholder="First name" onChange={(event) => dispatch(setFirstName(event.target.value))} />
                    <input type="text" placeholder="Second name" onChange={(event) => dispatch(setSecondName(event.target.value))} />
                    <input type="email" placeholder="Email address" onChange={(event) => dispatch(setUsername(event.target.value))} />
                    <input type="password" placeholder="Password" onChange={(event) => dispatch(setPassword(event.target.value))} />
                    <button onClick={Register}>Register</button>
                </div>
            </div>
        </div>
    )
}
