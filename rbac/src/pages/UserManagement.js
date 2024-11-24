import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); 
      });
  }, []);

  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  
  const handleCloseDialog = () => {
    setSelectedUser(null);
  };

  
  const handleUpdateUser = () => {
    if (selectedUser) {
      axios.put(`http://localhost:3001/users/${selectedUser.id}`, selectedUser)
        .then(() => {
          setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
          setFilteredUsers(filteredUsers.map(user => (user.id === selectedUser.id ? selectedUser : user)));
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">User Management</Typography>
      </Grid>
      
      
      <Grid item xs={12}>
        <TextField 
          label="Search Users" 
          value={searchTerm} 
          onChange={handleSearch} 
          variant="outlined" 
          fullWidth
        />
      </Grid>

      
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditUser(user)} variant="contained" color="primary">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

    
      <Dialog open={selectedUser !== null} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField 
                label="Name" 
                value={selectedUser.name} 
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} 
                fullWidth 
                margin="normal"
              />
              <TextField 
                label="Role" 
                value={selectedUser.role} 
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} 
                fullWidth 
                margin="normal"
              />
              <TextField 
                label="Status" 
                value={selectedUser.status} 
                onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })} 
                fullWidth 
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UserManagement;
