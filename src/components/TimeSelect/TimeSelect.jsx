import React from 'react';
import styles from "./TimeSelect.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTimeUnit } from '../../redux/slices/detailedCardSlice';

export const TimeSelect = () => {
    const dispatch = useDispatch();

    const { selectedTimeUnit, timeUnitList } = useSelector((state) => state.detailedCard);

    const [open, setOpen] = React.useState(false);

    const selectListItem = (index) => {
        dispatch(setSelectedTimeUnit(index));
        setOpen(false);
    }

    return (
        <div className={styles.timeSelect}>
            <div className={styles.timeSelect__Button} onClick={() => setOpen(!open)}>
                <span>{timeUnitList[selectedTimeUnit]}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.625C0 0.455729 0.0618486 0.309245 0.185547 0.185547C0.309245 0.0618491 0.455729 0 0.625 0L9.375 0C9.54427 0 9.69076 0.0618491 9.81445 0.185547C9.93815 0.309245 10 0.455729 10 0.625C10 0.794271 9.93815 0.940755 9.81445 1.06445L5.43945 5.43945C5.31576 5.56315 5.16927 5.625 5 5.625C4.83073 5.625 4.68424 5.56315 4.56055 5.43945L0.185547 1.06445C0.0618486 0.940755 0 0.794271 0 0.625Z" fill="#2C2C2C" />
                </svg>
            </div>
            {open && (
                <div className={styles.timeSelect__popup}>
                    <ul>
                        {timeUnitList.map((value, index) => (
                            <li key={index} className={selectedTimeUnit === index ? styles.active : ' '}
                                onClick={() => selectListItem(index)}>
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
