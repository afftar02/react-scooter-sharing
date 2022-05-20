import axios from 'axios';
import React from 'react';
import Card from "../components/Card/Card";
import DetailedCard from "../components/DetailedCard/DetailedCard";

function Home() {
    const [itemChosen, setItemChosen] = React.useState();
    const [items, setItems] = React.useState();

    const onCardClick = (item) => {
        setItemChosen(item.id);
    };

    const onDetailedCardCross = () => {
        setItemChosen();
    };

    React.useEffect(() => {
        async function getItemsFromServer() {
            try {
                const { data } = await axios.get('http://localhost:8080/scooter-sharing/api/scooters');
                setItems(data);
            } catch (error) {
                alert('Ошибка загрузки данных!');
            }
        }
        getItemsFromServer();
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
                            onClick={() => onCardClick(item)}
                        />
                        { 
                            itemChosen === item.id &&
                            <DetailedCard
                                id={item.id}
                                imageUrl={item.imageUrl}
                                modelName={item.modelName}
                                locationName={item.location.name}
                                locationDescription={item.location.description}
                                battery={item.battery}
                                onClose={onDetailedCardCross}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;