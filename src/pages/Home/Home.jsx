import axios from 'axios';
import React from 'react';
import styles from "./Home.module.scss";
import Card from "../../components/Card/Card";
import DetailedCard from "../../components/DetailedCard/DetailedCard";
import { useNavigate } from 'react-router-dom';
import CardSkeleton from '../../components/Card/CardSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../redux/slices/homeSlice';
import { refreshTokens } from '../../redux/slices/tokenSlice';

function Home() {
    const dispatch = useDispatch();

    const { userId, access_token } = useSelector((state) => state.token);
    const { items } = useSelector((state) => state.home);

    const [itemChosen, setItemChosen] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    const navigate = useNavigate();

    async function getItemsFromServer() {
        try {
            const scootersResponse = await axios({
                method: 'get',
                url: `http://localhost:8080/scooter-sharing/api/scooters`,
                headers: {
                    Authorization: access_token
                }
            });
            setIsLoading(false);
            dispatch(setItems(scootersResponse.data));
        } catch (error) {
            if (error.response.status === 403) {
                await dispatch(refreshTokens());
            }
            else {
                alert('Data loading error!');
            }
        }
    };

    React.useEffect(() => {
        if (userId) {
            getItemsFromServer();
        }
        else {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.content__header}>
                <h1>Available scooters:</h1>
                {/* <Sort /> */}
            </div>
            <div className={styles.items__block}>
                {isLoading ? [...new Array(5)].map(() => <CardSkeleton />)
                    : items.map((item) => (
                        !item.booked &&
                        <div key={item.id} className={styles.cardContainer}>
                            <Card
                                imageUrl={item.imageUrl}
                                locationName={item.location.name}
                                battery={item.battery}
                                model={item.modelName}
                                onClick={() => setItemChosen(item.id)}
                            />
                            {
                                itemChosen === item.id &&
                                <DetailedCard
                                    {...item}
                                    onClose={() => setItemChosen()}
                                />
                            }
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;