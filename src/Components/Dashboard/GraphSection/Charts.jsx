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

const Charts = () => {
  const [selectionRange, setSelectionRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  });
  const [sensorData, setSensorData] = useState([]);
  const [filter, setFilter] = useState('day'); // Estado para el tipo de filtro seleccionado

  const handleSelect = async (ranges) => {
      setSelectionRange(ranges.selection);
      const startDate = ranges.selection.startDate.toISOString();
      const endDate = ranges.selection.endDate.toISOString();
      try {
          const response = await axios.get(`${import.meta.env.VITE_API}/api/sensors`, { 
              params: {
                  startDate,
                  endDate
              }
          });
          setSensorData(response.data);
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
          case 'minute':
              intervals = eachMinuteOfInterval({ start: startDate, end: endDate });
              break;
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
                  case 'minute':
                      nextInterval.setMinutes(interval.getMinutes() + 1);
                      break;
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

          const avgTemp = entriesForInterval.reduce((acc, entry) => acc + entry.temp, 0) / entriesForInterval.length;
          const avgHum = entriesForInterval.reduce((acc, entry) => acc + entry.hum, 0) / entriesForInterval.length;

          return {
              date: interval,
              avgTemp,
              avgHum
          };
      }).filter(Boolean);

      return aggregatedData;
  };

  const filteredData = aggregateData(sensorData, selectionRange.startDate, selectionRange.endDate, filter);

  const chartData = {
      labels: filteredData.map(entry => format(entry.date, filter === 'minute' || filter === 'hour' ? 'MM/dd/yyyy HH:mm' : 'MM/dd/yyyy')),
      datasets: [
          {
              label: 'Temperatura',
              data: filteredData.map(entry => entry.avgTemp),
              fill: false,
              backgroundColor: 'red',
              borderColor: 'red',
          },
          {
              label: 'Humedad',
              data: filteredData.map(entry => entry.avgHum),
              fill: false,
              backgroundColor: 'blue',
              borderColor: 'blue',
          },
      ],
  };

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
        <DateRange
            locale={es}
            className="date-range-picker"
            ranges={[selectionRange]}
            onChange={handleSelect}
        />
        <div className="filter-buttons">
            <button onClick={() => handleFilterChange('minute')}>Por Minuto</button>
            <button onClick={() => handleFilterChange('hour')}>Por Hora</button>
            <button onClick={() => handleFilterChange('day')}>Por Día</button>
            <button onClick={() => handleFilterChange('week')}>Por Semana</button>
            <button onClick={() => handleFilterChange('month')}>Por Mes</button>
        </div>
        <Line data={chartData} />
    </div>
);
};

export default Charts;