import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import supabase from '../Services/Supabase';
import InPatients from './InPatients';
import OutPatients from './OutPatients';
import NextOfKin from './NextOfKin';  // Import the new component

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [view, setView] = useState('patients'); // New state to manage view

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const { data, error } = await supabase
        .from('patient')
        .select('*');
      
      if (error) {
        console.error('Error fetching patients:', error);
      } else {
        setPatients(data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    }
  }

  const renderPatientsTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Patient Number</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Telephone Number</th>
          <th>Date of Birth</th>
          <th>Sex</th>
          <th>Marital Status</th>
          <th>Date Registered</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.patient_num}>
            <td>{patient.patient_num}</td>
            <td>{patient.f_name}</td>
            <td>{patient.l_name}</td>
            <td>{patient.address}</td>
            <td>{patient.tel_number}</td>
            <td>{patient.date_of_birth}</td>
            <td>{patient.sex}</td>
            <td>{patient.marital_status}</td>
            <td>{patient.hospital_date_registered}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', ml: '60px' }}>
      <Box sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Button variant="contained" onClick={() => setView('inPatients')}>In Patients</Button>
        <Button variant="contained" onClick={() => setView('outPatients')}>Out Patients</Button>
        <Button variant="contained" onClick={() => setView('patients')}>All Patients</Button>
        <Button variant="contained" onClick={() => setView('next_of_kin')}>Kin Details</Button>
        
        {view === 'patients' && renderPatientsTable()}
        {view === 'inPatients' && <InPatients />}
        {view === 'outPatients' && <OutPatients />}
        {view === 'next_of_kin' && <NextOfKin />}  
      </Box>
    </Box>
  );
}

export default Patients;
