import styles from "./Card.module.scss";

function Card({imageUrl, locationName, battery, model, onClick}){
    return(
        <div className={styles.card} >
            <div className={styles.cardTitle} onClick={onClick}>
                <img src={imageUrl} alt="scooter"/>
                <h5>{model}</h5>
            </div>
            <div className={styles.cardInfo}>
                <div>
                    <p className={styles.location}>{locationName}</p>
                </div>
                <div className={styles.batteryBlock}>
                    <img height={25} src="img/half-green-battery.png" alt="battery"/>
                    <span>{battery}%</span>
                </div>
            </div>
            <button>Choose</button>
        </div>
    );
}

export default Card;