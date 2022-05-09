import React from 'react';
import Header from "../components/Header";
import Card from "../components/Card/Card";
import DetailedCard from "../components/DetailedCard/DetailedCard";

function Home() {
    const [itemChosen, setItemChosen] = React.useState();

    const items = [
        { "scooterId": "d3b171b2-3298-4ec1-8e3c-559399baf402", "location": { "name": "Grodno", "description": "GRSU building" }, "battery": 100.0, "imageURL": "img/xiaomi-scooter-1.png", "modelName": "Xiaomi model 228", "booked": false },
        { "scooterId": "5336aa4a-355e-4e59-a001-59a7f7ce3199", "location": { "name": "LA", "description": "Venice beach" }, "battery": 85.0, "imageURL": "img/xiaomi-scooter-1.png", "modelName": "Xiaomi model 123", "booked": false },
        { "scooterId": "fc23ede4-c153-4dad-9ea9-914ddb4d2847", "location": { "name": "Sydney", "description": "Sydney bridge" }, "battery": 30.0, "imageURL": "img/xiaomi-scooter-1.png", "modelName": "Xiaomi model 337", "booked": false }
    ];

    const onCardClick = (item) => {
        setItemChosen(item.scooterId);
    };

    const onDetailedCardCross = () => {
        setItemChosen();
    };

    return (
        <div className="wrapper">
            <Header />
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
        </div>
    );
}

export default Home;