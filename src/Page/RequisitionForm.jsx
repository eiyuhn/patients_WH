import React, { useState } from 'react';
import supabase from '../Services/Supabase'; // Adjust path as per your project structure
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Grid } from '@mui/material';
import '../CSS/requisition_form.css'; // Import the CSS file

const Requisition_Form = ({ pharmaceuticalSupplies, setPharmaceuticalSupplies, surgical_and_nonsurgical, setSurgical_and_Nonsurgical }) => {
  const initialFormData = {
    new_ward_id: '',
    new_staff_num: '',
    new_date_ordered: '',
    new_quantity: '',
    new_drug_num: '',
    new_item_num: '',
    new_dosage: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [requisitionResult, setRequisitionResult] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.rpc('requisition_form', {
        new_ward_id: parseInt(formData.new_ward_id),
        new_staff_num: parseInt(formData.new_staff_num),
        new_date_ordered: formData.new_date_ordered,
        new_quantity: parseInt(formData.new_quantity),
        new_drug_num: parseInt(formData.new_drug_num),
        new_item_num: parseInt(formData.new_item_num),
        new_dosage: formData.new_dosage
      });

      if (error) {
        console.error('Error:', error.message);
        return;
      }

      console.log('Data:', data); // Log data received

      if (data && data.length > 0) {
        console.log('New Drug Number:', data[0].new_drug_num);
        console.log('New Item Number:', data[0].new_item_num);

        // Deduct quantity from pharmaceutical supplies
        if (data[0].new_drug_num) {
          const updatedPharmaceuticalSupplies = pharmaceuticalSupplies.map(supply => {
            if (supply.drug_num === data[0].new_drug_num) {
              const updatedSupply = { ...supply };
              updatedSupply.quantity_in_stock -= data[0].new_quantity;
              return updatedSupply;
            }
            return supply;
          });
          setPharmaceuticalSupplies(updatedPharmaceuticalSupplies);
        }

        // Deduct quantity from surgical/non-surgical supplies
        if (data[0].new_item_num) {
          const updatedSurgicalNonsurgicalSupplies = surgical_and_nonsurgical.map(supply => {
            if (supply.item_num === data[0].new_item_num) {
              const updatedSupply = { ...supply };
              updatedSupply.quantity_of_stocks -= data[0].new_quantity;
              return updatedSupply;
            }
            return supply;
          });
          setSurgical_and_Nonsurgical(updatedSurgicalNonsurgicalSupplies);
        }

        setRequisitionResult(data[0]); // Assuming only one result is expected
        setOpenDialog(true); // Open the dialog
      } else {
        console.warn('No data returned from requisition form RPC call.');
        setRequisitionResult(null);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormData); // Reset form inputs
    setRequisitionResult(null); // Clear requisition result
  };

  return (
    <Box sx={{ p: 3 }} className="form-container">
      <Typography variant="h4" gutterBottom>
        Requisition Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ward ID"
              name="new_ward_id"
              value={formData.new_ward_id}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Staff Number"
              name="new_staff_num"
              value={formData.new_staff_num}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date Ordered"
              name="new_date_ordered"
              type="date"
              value={formData.new_date_ordered}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              name="new_quantity"
              type="number"
              value={formData.new_quantity}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Drug Number (Optional)"
              name="new_drug_num"
              type="number"
              value={formData.new_drug_num}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Number (Optional)"
              name="new_item_num"
              type="number"
              value={formData.new_item_num}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dosage (Optional)"
              name="new_dosage"
              value={formData.new_dosage}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Requisition
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Requisition Receipt</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="receipt">
              <table className="receipt-table">
                <tbody>
                  <tr>
                    <td className="label">Requisition Number:</td>
                    <td>{requisitionResult?.requisition_num}</td>
                  </tr>
                  <tr>
                    <td className="label">Ward ID:</td>
                    <td>{requisitionResult?.ward_id}</td>
                  </tr>
                  <tr>
                    <td className="label">Requisitioned By:</td>
                    <td>{requisitionResult?.requisitioned_by}</td>
                  </tr>
                  <tr>
                    <td className="label">Ward Name:</td>
                    <td>{requisitionResult?.ward_name}</td>
                  </tr>
                  <tr>
                    <td className="label">Requisitioned Date:</td>
                    <td>{requisitionResult?.requisitioned_date}</td>
                  </tr>
                  <tr>
                    <td className="label">Supply Number:</td>
                    <td>{requisitionResult?.supply_num}</td>
                  </tr>
                  <tr>
                    <td className="label">Supply Name:</td>
                    <td>{requisitionResult?.supply_name}</td>
                  </tr>
                  <tr>
                    <td className="label">Description:</td>
                    <td>{requisitionResult?.description}</td>
                  </tr>
                  <tr>
                    <td className="label">Dosage:</td>
                    <td>{requisitionResult?.dosage}</td>
                  </tr>
                  <tr>
                    <td className="label">Method of Administration:</td>
                    <td>{requisitionResult?.method_of_admin}</td>
                  </tr>
                  <tr>
                    <td className="label">Cost per Unit:</td>
                    <td>{requisitionResult?.cost_per_unit}</td>
                  </tr>
                  <tr>
                    <td className="label">Quantity:</td>
                    <td>{requisitionResult?.quantity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Requisition_Form;
