import React, { useEffect, useState } from "react";
import supabase from '../Services/Supabase';
import { Box, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import WaitingList from './WaitingList';
import PatientRegistrationForm from './PatientRegistrationForm';

const ListOfPa = () => {
  const [listOfPa, setListOfPa] = useState([]);
  const [openWaitingListDialog, setOpenWaitingListDialog] = useState(false);
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prefillData, setPrefillData] = useState(null);

  useEffect(() => {
    fetchListOfPa();
  }, []);

  async function fetchListOfPa() {
    try {
      const { data, error } = await supabase
        .from('patient_appointment')
        .select('*');

      if (error) {
        console.error('Error fetching patient appointments:', error.message);
        return;
      }

      setListOfPa(data);
    } catch (error) {
      console.error('Error fetching patient appointments:', error.message);
    }
  }

  const handleRecommendationChange = (appointmentId, newValue) => {
    setSelectedAppointment({ appointmentId, newValue });
    if (newValue === 'Out-patient') {
      setPrefillData(listOfPa.find(appt => appt.appointment_num === appointmentId));
      setOpenRegistrationDialog(true);
    }
  };

  const handleAddPatient = async () => {
    if (!selectedAppointment) return;

    const { appointmentId, newValue } = selectedAppointment;

    try {
      // Update recommendation in patient_appointment table
      const { error: updateError } = await supabase
        .from('patient_appointment')
        .update({ recommended_to: newValue })
        .eq('appointment_num', appointmentId);

      if (updateError) {
        console.error('Error updating recommendation:', updateError.message);
        throw updateError;
      }

      // Delete existing records in both in_patient and out_patient tables
      await supabase
        .from('in_patient')
        .delete()
        .eq('appointment_num', appointmentId);

      await supabase
        .from('out_patient')
        .delete()
        .eq('appointment_num', appointmentId);

      // Insert new record based on the updated recommendation
      if (newValue === 'Waiting List') {
        const { error: insertError } = await supabase
          .from('waiting_list')
          .insert({
            appointment_num: appointmentId,
            date_placed: new Date().toISOString().slice(0, 10), // Add the current date
            ward_id: 1 // Example ward_id, change it as necessary
          });

        if (insertError) {
          console.error('Error inserting into waiting_list:', insertError.message);
          throw insertError;
        }
      } else {
        const table = newValue === 'In-patient' ? 'in_patient' : 'out_patient';
        const { error: insertError } = await supabase
          .from(table)
          .insert({ appointment_num: appointmentId });

        if (insertError) {
          console.error(`Error inserting into ${table}:`, insertError.message);
          throw insertError;
        }
      }

      // Update the state to reflect the new recommendation value
      setListOfPa(prevList => prevList.map(item =>
        item.appointment_num === appointmentId ? { ...item, recommended_to: newValue } : item
      ));

      // Reset the selected appointment
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error handling recommendation change:', error.message);
    }
  };

  const handleWaitingListOpen = () => {
    setOpenWaitingListDialog(true);
  };

  const handleWaitingListClose = () => {
    setOpenWaitingListDialog(false);
  };

  const handleRegistrationClose = () => {
    setOpenRegistrationDialog(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const { error } = await supabase.rpc('patient_registration_form', formData);
      if (error) {
        console.error('Error registering patient:', error);
        return;
      }

      // After successful registration, insert into out_patient table
      const { appointment_num } = formData;
      const { error: insertError } = await supabase
        .from('out_patient')
        .insert({ appointment_num });

      if (insertError) {
        console.error('Error inserting into out_patient:', insertError.message);
        throw insertError;
      }

      // Update the list of patient appointments
      fetchListOfPa();

      // Close the dialog
      handleRegistrationClose();
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className="table-container">
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddPatient} disabled={!selectedAppointment}>
          Add Patient
        </Button>
        <Button variant="contained" color="primary" onClick={handleWaitingListOpen}>
          View Waiting List
        </Button>
      </Box>
      <table className="table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Date and Time</th>
            <th>Examination Room</th>
            <th>Staff ID</th>
            <th>Clinic ID</th>
            <th>Recommended to</th>
          </tr>
        </thead>
        <tbody>
          {listOfPa.map((appointment) => (
            <tr
              key={appointment.appointment_num}
              style={selectedAppointment?.appointmentId === appointment.appointment_num ? { backgroundColor: '#f0f0f0' } : {}}
            >
              <td>{appointment.appointment_num}</td>
              <td>{appointment.date_and_time}</td>
              <td>{appointment.exam_room}</td>
              <td>{appointment.staff_num}</td>
              <td>{appointment.clinic_num}</td>
              <td className="select-cell">
                <Select
                  value={appointment.recommended_to}
                  onChange={(e) => handleRecommendationChange(appointment.appointment_num, e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Waiting List">Waiting List</MenuItem>
                  <MenuItem value="Out-patient">Out-patient</MenuItem>  
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={openWaitingListDialog} onClose={handleWaitingListClose} fullWidth maxWidth="sm">
        <DialogTitle>Waiting List</DialogTitle>
        <DialogContent>
          <WaitingList />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWaitingListClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRegistrationDialog} onClose={handleRegistrationClose} fullWidth maxWidth="md">
        <DialogTitle>Patient Registration</DialogTitle>
        <DialogContent>
          <PatientRegistrationForm prefillData={prefillData} onClose={handleRegistrationClose} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegistrationClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ListOfPa;
