import React, { useState, useEffect } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/roles')
      .then((response) => setRoles(response.data))
      .catch(() => toast.error('Failed to fetch roles'));
  }, []);

  const handleAddRole = () => {
    const role = { name: newRole, permissions: [] };
    axios.post('http://localhost:3001/roles', role)
      .then((response) => {
        setRoles([...roles, response.data]);
        toast.success('Role added successfully');
        setOpen(false);
      })
      .catch(() => toast.error('Failed to add role'));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(', ') || 'None'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container>
          <Typography variant="h5">Add New Role</Typography>
          <TextField
            label="Role Name"
            variant="outlined"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddRole}>
            Save
          </Button>
        </Container>
      </Modal>
    </Container>
  );
};

export default RoleManagement;

