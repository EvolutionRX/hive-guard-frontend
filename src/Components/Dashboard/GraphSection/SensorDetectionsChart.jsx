import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, parseISO, eachDayOfInterval, startOfDay, endOfDay, eachHourOfInterval, eachWeekOfInterval, eachMonthOfInterval, eachMinuteOfInterval } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Charts.css';
import axios from 'axios';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SensorDetectionsChart = () => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [sensorDetections, setSensorDetections] = useState([]);
    const [filter, setFilter] = useState('day'); // Estado para el tipo de filtro seleccionado
    /*
    const mockData = [
        // Mayo
        { "sensorId": "esp32cam1", "varroa_score": 0.12, "pollen_score": 0.34, "wasps_score": 0.56, "cooling_score": 0.78, "timestamp": "2024-05-01T08:00:00.000Z" },
        { "sensorId": "esp32cam2", "varroa_score": 0.23, "pollen_score": 0.45, "wasps_score": 0.67, "cooling_score": 0.89, "timestamp": "2024-05-01T12:00:00.000Z" },
        { "sensorId": "esp32cam3", "varroa_score": 0.34, "pollen_score": 0.56, "wasps_score": 0.78, "cooling_score": 0.12, "timestamp": "2024-05-02T08:00:00.000Z" },
        { "sensorId": "esp32cam4", "varroa_score": 0.45, "pollen_score": 0.67, "wasps_score": 0.89, "cooling_score": 0.34, "timestamp": "2024-05-10T15:00:00.000Z" },
        { "sensorId": "esp32cam5", "varroa_score": 0.56, "pollen_score": 0.78, "wasps_score": 0.12, "cooling_score": 0.45, "timestamp": "2024-05-15T18:00:00.000Z" },
        { "sensorId": "esp32cam6", "varroa_score": 0.67, "pollen_score": 0.89, "wasps_score": 0.23, "cooling_score": 0.56, "timestamp": "2024-05-20T20:00:00.000Z" },
        { "sensorId": "esp32cam7", "varroa_score": 0.78, "pollen_score": 0.12, "wasps_score": 0.34, "cooling_score": 0.67, "timestamp": "2024-05-25T23:00:00.000Z" },
        // Junio
        { "sensorId": "esp32cam8", "varroa_score": 0.89, "pollen_score": 0.23, "wasps_score": 0.45, "cooling_score": 0.78, "timestamp": "2024-06-01T01:00:00.000Z" },
        { "sensorId": "esp32cam9", "varroa_score": 0.12, "pollen_score": 0.34, "wasps_score": 0.56, "cooling_score": 0.89, "timestamp": "2024-06-05T04:00:00.000Z" },
        { "sensorId": "esp32cam10", "varroa_score": 0.23, "pollen_score": 0.45, "wasps_score": 0.67, "cooling_score": 0.12, "timestamp": "2024-06-10T06:00:00.000Z" },
        { "sensorId": "esp32cam11", "varroa_score": 0.34, "pollen_score": 0.56, "wasps_score": 0.78, "cooling_score": 0.23, "timestamp": "2024-06-15T10:00:00.000Z" },
        { "sensorId": "esp32cam12", "varroa_score": 0.45, "pollen_score": 0.67, "wasps_score": 0.89, "cooling_score": 0.34, "timestamp": "2024-06-20T12:00:00.000Z" },
        { "sensorId": "esp32cam13", "varroa_score": 0.56, "pollen_score": 0.78, "wasps_score": 0.12, "cooling_score": 0.45, "timestamp": "2024-06-25T14:00:00.000Z" },
        { "sensorId": "esp32cam14", "varroa_score": 0.67, "pollen_score": 0.89, "wasps_score": 0.23, "cooling_score": 0.56, "timestamp": "2024-06-26T16:00:00.000Z" },
        { "sensorId": "esp32cam15", "varroa_score": 0.78, "pollen_score": 0.12, "wasps_score": 0.34, "cooling_score": 0.67, "timestamp": "2024-06-27T18:00:00.000Z" },
        { "sensorId": "esp32cam16", "varroa_score": 0.89, "pollen_score": 0.23, "wasps_score": 0.45, "cooling_score": 0.78, "timestamp": "2024-06-28T20:00:00.000Z" },
        { "sensorId": "esp32cam17", "varroa_score": 0.12, "pollen_score": 0.34, "wasps_score": 0.56, "cooling_score": 0.89, "timestamp": "2024-06-29T22:00:00.000Z" },
        // Julio
        { "sensorId": "esp32cam18", "varroa_score": 0.23, "pollen_score": 0.45, "wasps_score": 0.67, "cooling_score": 0.12, "timestamp": "2024-07-01T00:00:00.000Z" },
        { "sensorId": "esp32cam19", "varroa_score": 0.34, "pollen_score": 0.56, "wasps_score": 0.78, "cooling_score": 0.23, "timestamp": "2024-07-02T02:00:00.000Z" },
        { "sensorId": "esp32cam20", "varroa_score": 0.45, "pollen_score": 0.67, "wasps_score": 0.89, "cooling_score": 0.34, "timestamp": "2024-07-03T04:00:00.000Z" },
        { "sensorId": "esp32cam21", "varroa_score": 0.56, "pollen_score": 0.78, "wasps_score": 0.12, "cooling_score": 0.45, "timestamp": "2024-07-04T06:00:00.000Z" },
        { "sensorId": "esp32cam22", "varroa_score": 0.67, "pollen_score": 0.89, "wasps_score": 0.23, "cooling_score": 0.56, "timestamp": "2024-07-05T08:00:00.000Z" },
        { "sensorId": "esp32cam23", "varroa_score": 0.78, "pollen_score": 0.12, "wasps_score": 0.34, "cooling_score": 0.67, "timestamp": "2024-07-06T10:00:00.000Z" },
        { "sensorId": "esp32cam24", "varroa_score": 0.89, "pollen_score": 0.23, "wasps_score": 0.45, "cooling_score": 0.78, "timestamp": "2024-07-07T12:00:00.000Z" }
    ];
*/
    const handleSelect = async (ranges) => {
        setSelectionRange(ranges.selection);
        const startDate = ranges.selection.startDate.toISOString();
        const endDate = ranges.selection.endDate.toISOString();
        try {
            
            const response = await axios.get(`${import.meta.env.VITE_API}/api/sensordetections`, { 
                params: {
                    startDate,
                    endDate
                }
            });
            setSensorDetections(response.data);
            
            //setSensorDetections(mockData); // Use mock data for testing
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const aggregateData = (data, startDate, endDate, filter) => {
        let intervals;
        switch (filter) {
            case 'hour':
                intervals = eachHourOfInterval({ start: startDate, end: endDate });
                break;
            case 'week':
                intervals = eachWeekOfInterval({ start: startOfDay(startDate), end: endOfDay(endDate) });
                break;
            case 'month':
                intervals = eachMonthOfInterval({ start: startOfDay(startDate), end: endOfDay(endDate) });
                break;
            case 'day':
            default:
                intervals = eachDayOfInterval({ start: startOfDay(startDate), end: endOfDay(endDate) });
                break;
        }

        const aggregatedData = intervals.map(interval => {
            const entriesForInterval = data.filter(entry => {
                const entryDate = new Date(entry.timestamp);
                const nextInterval = new Date(interval);
                switch (filter) {
                    case 'hour':
                        nextInterval.setHours(interval.getHours() + 1);
                        break;
                    case 'week':
                        nextInterval.setDate(interval.getDate() + 7);
                        break;
                    case 'month':
                        nextInterval.setMonth(interval.getMonth() + 1);
                        break;
                    case 'day':
                    default:
                        nextInterval.setDate(interval.getDate() + 1);
                        break;
                }
                return entryDate >= interval && entryDate < nextInterval;
            });

            if (entriesForInterval.length === 0) return null;

            const avgVarroa = entriesForInterval.reduce((acc, entry) => acc + parseFloat(entry.varroa_score.$numberDecimal || entry.varroa_score), 0) / entriesForInterval.length;
            const avgPollen = entriesForInterval.reduce((acc, entry) => acc + parseFloat(entry.pollen_score.$numberDecimal || entry.pollen_score), 0) / entriesForInterval.length;
            const avgWasps = entriesForInterval.reduce((acc, entry) => acc + parseFloat(entry.wasps_score.$numberDecimal || entry.wasps_score), 0) / entriesForInterval.length;
            const avgCooling = entriesForInterval.reduce((acc, entry) => acc + parseFloat(entry.cooling_score.$numberDecimal || entry.cooling_score), 0) / entriesForInterval.length;
    
            return {
                date: interval,
                avgVarroa: isNaN(avgVarroa) ? 0 : avgVarroa,
                avgPollen: isNaN(avgPollen) ? 0 : avgPollen,
                avgWasps: isNaN(avgWasps) ? 0 : avgWasps,
                avgCooling: isNaN(avgCooling) ? 0 : avgCooling,
            };
        }).filter(Boolean);

        return aggregatedData;
    };

    const filterMap = {
        hour: 'Cada hora',
        day: 'Cada día',
        week: 'Cada semana',
        month: 'Cada mes'
    };

    const filteredData = aggregateData(sensorDetections, selectionRange.startDate, selectionRange.endDate, filter);

    const chartData = {
        labels: filteredData.map(entry => format(entry.date, filter === 'minute' || filter === 'hour' ? 'MM/dd/yyyy HH:mm' : 'MM/dd/yyyy')),
        datasets: [
            {
                label: 'Varroa',
                data: filteredData.map(entry => entry.avgVarroa),
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
            },
            {
                label: 'Polen ', 
                data: filteredData.map(entry => entry.avgPollen),
                fill: false,
                backgroundColor: 'orange',
                borderColor: 'orange',
            },
            {
                label: 'Avispas',
                data: filteredData.map(entry => entry.avgWasps),
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            },
            {
                label: 'Abejas Enfriadoras',
                data: filteredData.map(entry => entry.avgCooling),
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
            },
        ],
    };
    
    let avgVarroa = filteredData.reduce((acc, entry) => acc + entry.avgVarroa, 0) / filteredData.length;
    let avgPollen = filteredData.reduce((acc, entry) => acc + entry.avgPollen, 0) / filteredData.length;
    let avgWasps = filteredData.reduce((acc, entry) => acc + entry.avgWasps, 0) / filteredData.length;
    let avgCooling = filteredData.reduce((acc, entry) => acc + entry.avgCooling, 0) / filteredData.length;
   

    useEffect(() => {
        return () => {
            for (let id in Chart.instances) {
                if (Chart.instances[id]) {
                    Chart.instances[id].destroy();
                }
            }
        };
    }, []);


    return (
        <div className="chart-container">
            <div className="date-range-and-summary-section">
                <DateRange
                    locale={es}
                    className="date-range-picker"
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
                <div className="summary-card">
                    <h3>Probabilidades según las detecciones realizadas en el rango seleccionado:</h3>
                    <p style={{color: 'black'}}>Filtro seleccionado: <strong>{filterMap[filter]}</strong></p>
                    <p style={{color: 'black'}}>Varroa en la colmena: <strong>{avgVarroa ? `${(avgVarroa * 100).toFixed(2)}%` : '0%'}</strong></p>
                    <p style={{color: 'black'}}>Recolección de polen: <strong>{avgPollen ? `${(avgPollen * 100).toFixed(2)}%` : '0%'}</strong></p>
                    <p style={{color: 'black'}}>Presencia de avispas: <strong>{avgWasps ? `${(avgWasps * 100).toFixed(2)}%` : '0%'}</strong></p>
                    <p style={{color: 'black'}}>Enfriamiento de la colmena: <strong>{avgCooling ? `${(avgCooling * 100).toFixed(2)}%` : '0%'}</strong></p>
                </div>
            </div>
            <div className="filter-buttons">
                    <button onClick={() => handleFilterChange('hour')}>Por Hora</button>
                    <button onClick={() => handleFilterChange('day')}>Por Día</button>
                    <button onClick={() => handleFilterChange('week')}>Por Semana</button>
                    <button onClick={() => handleFilterChange('month')}>Por Mes</button>
                </div>
            <div className="chart-wrapper">
                <Line data={chartData} />
            </div>
        </div>
    );      
    };


export default SensorDetectionsChart;
