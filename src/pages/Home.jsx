import axios from 'axios';
import React from 'react';
import Card from "../components/Card/Card";
import DetailedCard from "../components/DetailedCard/DetailedCard";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

function Home() {
    const [itemChosen, setItemChosen] = React.useState();
    const [items, setItems] = React.useState();

    const navigate = useNavigate();

    const { userId } = React.useContext(AppContext);

    async function getItemsFromServer() {
        try {
            const { data } = await axios.get('http://localhost:8080/scooter-sharing/api/scooters');
            setItems(data);
        } catch (error) {
            alert('Data loading error!');
        }
    }

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
        <div className="content">
            <h1>Available scooters:</h1>
            <div className="items-block">
                {items && items.map((item) => (
                    !item.booked &&
                    <div key={item.id}>
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
                                items={items}
                                setItems={setItems}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;