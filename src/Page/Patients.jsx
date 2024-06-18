import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import supabase from '../Services/Supabase';
import InPatients from './InPatients';
import OutPatients from './OutPatients';
import WaitingList from './WaitingList';
import NextOfKin from './NextOfKin';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [view, setView] = useState('patients');
  const [openNextOfKinDialog, setOpenNextOfKinDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

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

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleNextOfKinClick = () => {
    setOpenNextOfKinDialog(true);
  };

  const handleNextOfKinClose = () => {
    setOpenNextOfKinDialog(false);
    setSelectedPatient(null);
  };

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
          <tr
            key={patient.patient_num}
            style={{
              backgroundColor: selectedPatient?.patient_num === patient.patient_num ? '#f0f0f0' : 'transparent'
            }}
            onClick={() => handleRowClick(patient)}
          >
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', ml: '60px', gap: '10px' }}>
      <Box sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
          <Button variant="contained" onClick={() => setView('patients')}>All Patients</Button>
          <Button variant="contained" onClick={() => setView('inPatients')}>In-Patients</Button>
          <Button variant="contained" onClick={() => setView('outPatients')}>Out-Patients</Button>
        </Box>

        {view === 'patients' && (
          <>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mb: 2 }}
              onClick={handleNextOfKinClick}
              disabled={!selectedPatient}
            >
              View Next of Kin
            </Button>
            {renderPatientsTable()}
          </>
        )}
        {view === 'inPatients' && <InPatients />}
        {view === 'outPatients' && <OutPatients />}
      </Box>

      <Dialog open={openNextOfKinDialog} onClose={handleNextOfKinClose} fullWidth maxWidth="sm">
        <DialogTitle>Next of Kin</DialogTitle>
        <DialogContent>
          {selectedPatient && <NextOfKin patientNum={selectedPatient.patient_num} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNextOfKinClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Patients;
