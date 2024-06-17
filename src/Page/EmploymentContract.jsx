import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import supabase from '../Services/Supabase';

const EmploymentContract = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  async function fetchContracts() {
    try {
      const { data, error } = await supabase
        .from('employment_contract')
        .select('*');
      
      if (error) {
        console.error('Error fetching contracts:', error);
      } else {
        setContracts(data);
      }
    } catch (error) {
      console.error('Error fetching contracts:', error.message);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', ml: '60px' }}>
      <Box sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contract Number</TableCell>
                <TableCell>Number of Hours Worked</TableCell>
                <TableCell>Contract Type</TableCell>
                <TableCell>Type of Salary Payment</TableCell>
                <TableCell>Staff Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.contract_num}>
                  <TableCell>{contract.contract_num}</TableCell>
                  <TableCell>{contract.num_hours_worked}</TableCell>
                  <TableCell>{contract.contract_type}</TableCell>
                  <TableCell>{contract.type_salary_payment}</TableCell>
                  <TableCell>{contract.staff_num}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default EmploymentContract;
