import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import AnalyticsChart from '../chart/analyticsChart';

const Home = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getCount');
                setAnalyticsData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div style={{ padding: '20px' }}>
                <h1 className="text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white text-center">Overview of System</h1>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    analyticsData ? (
                        <AnalyticsChart data={analyticsData} />
                    ) : (
                        <Typography variant="h6" align="center">No data found</Typography>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
