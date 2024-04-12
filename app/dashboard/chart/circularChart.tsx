import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CircularProgressBarProps {
  title: string;
  percentage: number;
}

const GREEN_COLOR = '#00C49F';

const CircularProgressBarCard: React.FC<CircularProgressBarProps> = ({ title, percentage }) => {
  const data = [
    { name: 'Enrolled', value: percentage }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              fill={GREEN_COLOR}
              animationDuration={1500}
            >
              <Cell fill={GREEN_COLOR} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Typography variant="subtitle1" align="center">
          Enrolled
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CircularProgressBarCard;
