import React from "react";
import styles from "./DetailedCard.module.scss";
import axios from "axios";
import { AppContext } from "../../App";
import { TimeSelect } from "../TimeSelect/TimeSelect";
import { useSelector } from 'react-redux';

function DetailedCard({ id, imageUrl, modelName, location, battery, onClose, items, setItems }) {
    const { userId, access_token } = useSelector((state) => state.token);

    const [rentalTime, setRentalTime] = React.useState(0);
    const [selectedTimeUnit, setSelectedTimeUnit] = React.useState(0);
    const [isWarning, setIsWarning] = React.useState(false);

    const { refreshTokens } = React.useContext(AppContext);

    const timeUnitList = ["min", "h"];

    const onStartClick = async () => {
        try {
            if (rentalTime && Number.isInteger(parseInt(rentalTime)) && rentalTime >= 1) {
                const scooterResponse = await axios({
                    method: 'get',
                    url: `http://localhost:8080/scooter-sharing/api/scooters/${id}`,
                    headers: {
                        Authorization: access_token
                    }
                });
                let countedRentalTime = timeUnitList[selectedTimeUnit] === "min" ? rentalTime : (rentalTime * 60);//time in min
                await axios({
                    method: 'put',
                    url: `http://localhost:8080/scooter-sharing/api/scooters`,
                    headers: {
                        Authorization: access_token
                    },
                    data: {
                        id, "location": { "id": scooterResponse.data.location.id, "name": location.name, "description": location.description }, battery, imageUrl, modelName, "booked": true, "timeLeft": countedRentalTime
                    }
                });
                const userResponse = await axios({
                    method: 'get',
                    url: `http://localhost:8080/scooter-sharing/api/user/${userId}`,
                    headers: {
                        Authorization: access_token
                    }
                });
                axios({
                    method: 'put',
                    url: `http://localhost:8080/scooter-sharing/api/user`,
                    headers: {
                        Authorization: access_token
                    },
                    data: {
                        "id": userId, "scooters": [...userResponse.data.scooters, scooterResponse.data]
                    }
                });
                setItems(items.filter(item => item.id !== id));
            }
            else {
                setIsWarning(true);
            }
        } catch (error) {
            if (error.response.status === 403) {
                await refreshTokens();
            }
            else {
                alert('Data sending error!');
            }
        }
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
                        <p>{location.name}</p>
                        <p>{location.description}</p>
                        <p>{battery}%</p>
                    </div>
                    <div className={styles.inputBlock}>
                        <div className={styles.input}>
                            <input onChange={(event) => setRentalTime(event.target.value)} type="text" placeholder="Enter rental time" className={isWarning ? styles.warning : ' '}/>
                            <TimeSelect
                                selectedTimeUnit={selectedTimeUnit}
                                setSelectedTimeUnit={setSelectedTimeUnit}
                                timeUnitList={timeUnitList} />
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