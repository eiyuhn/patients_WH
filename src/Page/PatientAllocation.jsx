import React, { useState } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import supabase from '../Services/Supabase';

const PatientAllocation = () => {
  const [wardId, setWardId] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPatientAllocation() {
    setLoading(true);
    const { data, error } = await supabase
      .rpc('fetch_patient_allocation', { ward_id_params: wardId });

    if (error) {
      console.error('Error fetching patient allocation:', error);
    } else {
      setPatients(data);
    }
    setLoading(false);
  }

  function handleChange(event) {
    const { value } = event.target;
    setWardId(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchPatientAllocation();
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', ml: '60px' }}>
      <Box sx={{ width: '90%', mb: 2 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          <TextField
            type="text"
            placeholder="Ward ID"
            name='wardId'
            value={wardId}
            onChange={handleChange}
            variant="outlined"
            sx={{ m: 1 }}
          />
          <Button type='submit' variant='contained' color='primary' sx={{ m: 1 }} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </form>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Week</TableCell>
                <TableCell>Patient Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>On Waiting List</TableCell>
                <TableCell>Expected Stay</TableCell>
                <TableCell>Date Placed</TableCell>
                <TableCell>Date Leave</TableCell>
                <TableCell>Actual Leave</TableCell>
                <TableCell>Bed Number</TableCell>
                <TableCell>Ward ID</TableCell>
                <TableCell>Ward Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Tel Extension</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.week}</TableCell>
                  <TableCell>{patient.patient_num}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.on_waiting_list}</TableCell>
                  <TableCell>{patient.expected_stay}</TableCell>
                  <TableCell>{patient.date_placed}</TableCell>
                  <TableCell>{patient.date_leave}</TableCell>
                  <TableCell>{patient.actual_leave}</TableCell>
                  <TableCell>{patient.bed_number}</TableCell>
                  <TableCell>{patient.ward_id}</TableCell>
                  <TableCell>{patient.ward_name}</TableCell>
                  <TableCell>{patient.location}</TableCell>
                  <TableCell>{patient.tel_extn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default PatientAllocation;
