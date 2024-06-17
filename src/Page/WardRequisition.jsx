import { useEffect, useState } from "react";
import supabase from '../Services/Supabase';
import { Box, TextField, Button } from '@mui/material';

const WardRequisition = () => {
  const [requisitionNum, setRequisitionNum] = useState('');
  const [requisitionData, setRequisitionData] = useState([]);

  useEffect(() => {
    if (requisitionNum) {
      fetchRequisitionData(requisitionNum);
    }
  }, [requisitionNum]);

  async function fetchRequisitionData(requisitionNum) {
    try {
      const { data, error } = await supabase
        .rpc('requisition_form', { requisition_num_param: parseInt(requisitionNum) });

      if (error) {
        console.error('Error fetching requisition data:', error.message);
        return;
      }

      setRequisitionData(data);
    } catch (error) {
      console.error('Error fetching requisition data:', error.message);
    }
  }

  const handleSearch = () => {
    if (requisitionNum) {
      fetchRequisitionData(requisitionNum);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className="table-container">
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Requisition Number"
          variant="outlined"
          value={requisitionNum}
          onChange={(e) => setRequisitionNum(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <table className="table">
        <thead>
          <tr>
            <th>Ward ID</th>
            <th>Requisitioned By</th>
            <th>Ward Name</th>
            <th>Requisitioned Date</th>
            <th>Drug Number</th>
            <th>Drug Name</th>
            <th>Description</th>
            <th>Dosage</th>
            <th>Method of Administration</th>
            <th>Cost Per Unit</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {requisitionData.map((item, index) => (
            <tr key={index}>
              <td>{item.ward_id}</td>
              <td>{item.requisitioned_by}</td>
              <td>{item.ward_name}</td>
              <td>{item.requisitioned_date}</td>
              <td>{item.drug_num}</td>
              <td>{item.drug_name}</td>
              <td>{item.description}</td>
              <td>{item.dosage}</td>
              <td>{item.method_of_admin}</td>
              <td>{item.cost_per_unit}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default WardRequisition;
