import styles from "./DetailedCard.module.scss";

function DetailedCard() {
    return (
        <div className={styles.overlay}>
            <div className={styles.detailedCard}>
                <img width={150} src="img/xiaomi-scooter-1.png" alt="scooter"/>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <h3>Info</h3>
                        <p>Model name text</p>
                        <p>Location text</p>
                        <p>Location description text</p>
                        <p>100%</p>
                    </div>
                    <div className={styles.inputBlock}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedCard;