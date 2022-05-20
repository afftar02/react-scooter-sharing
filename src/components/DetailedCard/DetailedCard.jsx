import { Link } from "react-router-dom";
import React from "react";
import styles from "./DetailedCard.module.scss";
import axios from "axios";
import { AppContext } from "../../App";

function DetailedCard({ id, imageUrl, modelName, locationName, locationDescription, battery, onClose }) {

    const [rentalTime, setRentalTime] = React.useState(0);
    const [isMinTimeUnit, setIsMinTimeUnit] = React.useState(true);

    const { userId } = React.useContext(AppContext);

    const onStartClick = async () => {
        try {
            const scooterResponse = await axios.get(`http://localhost:8080/scooter-sharing/api/scooters/${id}`);
            axios.put('http://localhost:8080/scooter-sharing/api/scooters',
                { id, "location": { "id": scooterResponse.data.location.id, "name": locationName, "description": locationDescription }, battery, imageUrl, modelName, "booked": true });
            const userResponse = await axios.get(`http://localhost:8080/scooter-sharing/api/user/${userId}`);
            axios.put('http://localhost:8080/scooter-sharing/api/user',
                { "id": userId, "scooters": [...userResponse.data.scooters,scooterResponse.data] });
        } catch (error) {
            alert('Ошибка отправки данных!');
        }
    }

    const onTimeEntered = (event) => {
        setRentalTime(event.target.value);
    }

    const onTimeUnitSwitched = () => {
        setIsMinTimeUnit(!isMinTimeUnit);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.detailedCard}>
                <img width={150} src={imageUrl} alt="scooter" />
                <div className={styles.container}>
                    <div className={styles.info}>
                        <div className={styles.detailedCardHeader}>
                            <h3>Info</h3>
                            <svg className={styles.cross} onClick={onClose} width={15} height={15} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z" fill="#B5B5B5" />
                            </svg>
                        </div>
                        <p>{modelName}</p>
                        <p>{locationName}</p>
                        <p>{locationDescription}</p>
                        <p>{battery}%</p>
                    </div>
                    <div className={styles.inputBlock}>
                        <div className={styles.input}>
                            <input onChange={onTimeEntered} type="text" placeholder="Enter rental time" />
                            <span>min</span>
                            <div className={styles.select}>
                                <label className={styles.switch}>
                                    <input type="checkbox" onChange={onTimeUnitSwitched} />
                                    <span className={styles.slider} />
                                </label>
                            </div>
                            <span>h</span>
                        </div>
                        <div className={styles.buttonStartContainer}>
                            <button onClick={onStartClick}>Start<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedCard;