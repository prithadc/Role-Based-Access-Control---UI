import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/users').then((res) => setUserCount(res.data.length));
    axios.get('http://localhost:3001/roles').then((res) => setRoleCount(res.data.length));
  }, []);

  const data = {
    labels: ['Users', 'Roles'],
    datasets: [
      {
        label: 'Counts',
        data: [userCount, roleCount],
        backgroundColor: ['#3f51b5', '#f50057'],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h3" color="primary">{userCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5">Total Roles</Typography>
            <Typography variant="h3" color="secondary">{roleCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Bar data={data} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
