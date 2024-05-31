import React, { useState, useEffect } from 'react';
import '../../App.css';

const Dashboard = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [beeCount, setBeeCount] = useState(null);

    useEffect(() => {
        // Simulate data fetching
        setTemperature(22.5); // Replace with actual data fetching
        setHumidity(55); // Replace with actual data fetching
        setBeeCount(150); // Replace with actual data fetching
    }, []);

    return (
        <div className="dashboard flex">
            <div className="dashboardContainer flex">
                <div className="dataCard">
                    <h2>Temperature</h2>
                    <p>{temperature} °C</p>
                </div>
                <div className="dataCard">
                    <h2>Humidity</h2>
                    <p>{humidity} %</p>
                </div>
                <div className="dataCard">
                    <h2>Bee Count</h2>
                    <p>{beeCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

