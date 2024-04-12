import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

interface AnalyticsData {
  courseCount: number;
  userCount: number;
  commentCount: number;
  postCount: number;
}

interface AnalyticsChartProps {
  data: AnalyticsData;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const { courseCount, userCount, commentCount, postCount } = data;
  console.log(data);
  

  const chartData = [
    { name: 'Courses', value: courseCount },
    { name: 'Users', value: userCount },
    { name: 'Comments', value: commentCount },
    { name: 'Posts', value: postCount },
  ];

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" className='text-center' gutterBottom>
        Analytics Overview
      </Typography>
      {courseCount || userCount || commentCount || postCount ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" align="center">No data available</Typography>
      )}
    </Paper>
  );
};

export default AnalyticsChart;
