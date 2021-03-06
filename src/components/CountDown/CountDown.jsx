import React from 'react';

export const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
    const [over, setOver] = React.useState(false);
    const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

    const tick = () => {
        if (over) return;

        if (h === 0 && m === 0 && s === 0) {
            setOver(true);
        } else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
        } else if (s === 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, s - 1]);
        }
    };

    React.useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <div style={over ? { display: 'inline-block', height:20 } : {}}>
            {over ? <img height={20} src='./img/red-circle.png' alt="time is over" /> :
                <p>{`${h.toString().padStart(2, '0')}:${m
                    .toString()
                    .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>}
        </div>
    );
};