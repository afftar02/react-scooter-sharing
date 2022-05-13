import React from 'react';
import Card from "../components/Card/Card";
import DetailedCard from "../components/DetailedCard/DetailedCard";

function Home() {
    const [itemChosen, setItemChosen] = React.useState();

    const items = [
        { "scooterId": "1", "location": { "name": "Grodno", "description": "GRSU building" }, "battery": 100.0, "imageURL": "img/xiaomi-scooter-1.png", "modelName": "Xiaomi model 228", "booked": false },
        { "scooterId": "2", "location": { "name": "LA", "description": "Venice beach" }, "battery": 85.0, "imageURL": "img/xiaomi-scooter-1.png", "modelName": "Xiaomi model 123", "booked": false },
        { "scooterId": "3", "location": { "name": "Sydney", "description": "Sydney bridge" }, "battery": 30.0, "imageURL": "img/xiaomi-scooter-1.png", "modelName": "Xiaomi model 337", "booked": false }
    ];

    const onCardClick = (item) => {
        setItemChosen(item.scooterId);
    };

    const onDetailedCardCross = () => {
        setItemChosen();
    };

    return (
        <div className="content">
            <h1>Available scooters:</h1>
            <div className="items-block">
                {items.map((item) => (
                    <div key={item.scooterId}>
                        <Card
                            imageUrl={item.imageURL}
                            locationName={item.location.name}
                            battery={item.battery}
                            model={item.modelName}
                            onClick={() => onCardClick(item)}
                        />
                        {
                            itemChosen === item.scooterId &&
                            <DetailedCard
                                id={item.scooterId}
                                imageUrl={item.imageURL}
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