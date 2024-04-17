import React, { useState, useEffect } from 'react';
import ActivityChart from './ActivityChart';
import SleepChart from './SleepChart';
import '../assets/css/data-importer.css';

const DataImporter = () => {
  const [activityData, setActivityData] = useState([]);
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await fetch('/data/activity_data.json');
        const data = await response.json();
        setActivityData(data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    const fetchSleepData = async () => {
      try {
        const response = await fetch('/data/sleep_data.json');
        const data = await response.json();
        setSleepData(data);
      } catch (error) {
        console.error('Error fetching sleep data:', error);
      }
    };

    fetchActivityData();
    fetchSleepData();
  }, []);

  return (
    <div className="data-importer">
      <h1>FitBit Activity and Sleep Explorer</h1>
      <div className="charts-container">
        <ActivityChart data={activityData} />
        <SleepChart data={sleepData} />
      </div>
    </div>
  );
}

export default DataImporter;
