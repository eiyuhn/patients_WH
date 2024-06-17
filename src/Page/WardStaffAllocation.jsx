// src/Page/WardStaffAllocation.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const staffData = [
  {
    staffNumber: 'S098',
    name: 'Carol Cummings',
    address: '15 High Street, Edinburgh',
    telNo: '0131-334-5677',
    position: 'Staff Nurse',
    shift: 'Late',
  },
  {
    staffNumber: 'S123',
    name: 'Morgan Russell',
    address: '23A George Street, Broxburn',
    telNo: '01506-67676',
    position: 'Nurse',
    shift: 'Late',
  },
  {
    staffNumber: 'S167',
    name: 'Robin Plevin',
    address: '7 Glen Terrace, Edinburgh',
    telNo: '0131-339-6123',
    position: 'Staff Nurse',
    shift: 'Early',
  },
  {
    staffNumber: 'S224',
    name: "Amy O'Donnell",
    address: '234 Prices Street, Edinburgh',
    telNo: '0131-334-9099',
    position: 'Nurse',
    shift: 'Night',
  },
  {
    staffNumber: 'S344',
    name: 'Laurence Burns',
    address: '1 Apple Drive, Edinburgh',
    telNo: '0131-344-9100',
    position: 'Consultant',
    shift: 'Early',
  },
];

function WardStaffAllocation() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '95vh', justifyContent: 'center' }}>
      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom component="div" sx={{ padding: 2 }}>
          Wellmeadows Hospital - Ward Staff Allocation (Week beginning 9-Jan-96)
        </Typography>
        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">Ward Number: Ward 11</Typography>
          <Typography variant="body1">Ward Name: Orthopedic</Typography>
          <Typography variant="body1">Location: Block E</Typography>
          <Typography variant="body1">Charge Nurse: Moira Samuel</Typography>
          <Typography variant="body1">Staff Number: S011</Typography>
          <Typography variant="body1">Tel Extn: 7711</Typography>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Staff No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Tel No</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Shift</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((row) => (
              <TableRow key={row.staffNumber}>
                <TableCell>{row.staffNumber}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.telNo}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.shift}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
          <Button variant="contained" color="primary" onClick={handleExit}>
            Exit
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}

export default WardStaffAllocation;
