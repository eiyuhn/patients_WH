import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import supabase from '../Services/Supabase';

const Suppliers = () => {
  const [Suppliers, setSuppliers] = useState([]);
  const [Supplier, setSupplier] = useState({
    name: '', address: '', tel_number: '', fax_number: ''
  });
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showCreateButton, setShowCreateButton] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    const { data, error } = await supabase
      .from('suppliers')
      .select('*');
    
    if (error) {
      console.error('Error fetching suppliers:', error);
    } else {
      setSuppliers(data);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setSupplier(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (selectedSupplier) {
      // Update supplier
      const { data, error } = await supabase
        .from('suppliers')
        .update({
          name: Supplier.name,
          address: Supplier.address,
          tel_number: Supplier.tel_number,
          fax_number: Supplier.fax_number
        })
        .eq('supplier_num', selectedSupplier.supplier_num);

      if (error) {
        console.error('Error updating supplier:', error);
      } else {
        setSuppliers(prevSuppliers =>
          prevSuppliers.map(supplier => 
            supplier.supplier_num === selectedSupplier.supplier_num ? { ...supplier, ...Supplier } : supplier
          )
        );
      }
    } else {
      // Create new supplier
      const { data, error } = await supabase
        .from('suppliers')
        .insert({
          name: Supplier.name,
          address: Supplier.address,
          tel_number: Supplier.tel_number,
          fax_number: Supplier.fax_number
        })
        .select('*');
    
      if (error) {
        console.error('Error creating supplier:', error);
      } else if (Array.isArray(data)) {
        setSuppliers(prevSuppliers => [...prevSuppliers, ...data]);
      } else {
        console.error('Unexpected response data:', data);
      }
    }

    setSupplier({ name: '', address: '', tel_number: '', fax_number: '' });
    setSelectedSupplier(null);
    setShowCreateButton(true); // Show the create button after form submission
    fetchSuppliers();
  }

  async function handleDelete(supplier_num) {
    console.log('Deleting supplier:', supplier_num);
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .delete()
        .eq('supplier_num', supplier_num);

      if (error) {
        console.error('Error deleting supplier:', error);
      } else {
        // Update the suppliers list after successful deletion
        setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.supplier_num !== supplier_num));
      }
    } catch (error) {
      console.error('Error deleting supplier:', error.message);
    }

    // Reset form after deletion
    setSupplier({ name: '', address: '', tel_number: '', fax_number: '' });
    setSelectedSupplier(null);
    setShowCreateButton(true); // Show the create button after deletion
  }

  function handleSelectSupplier(supplier) {
    if (selectedSupplier && selectedSupplier.supplier_num === supplier.supplier_num) {
      // If the same supplier is clicked again, deselect it
      setSupplier({ name: '', address: '', tel_number: '', fax_number: '' });
      setSelectedSupplier(null);
      setShowCreateButton(true); // Show the create button after deselection
    } else {
      // Select the supplier
      setSelectedSupplier(supplier);
      setSupplier({
        name: supplier.name,
        address: supplier.address,
        tel_number: supplier.tel_number,
        fax_number: supplier.fax_number
      });
      setShowCreateButton(false); // Hide the create button when a supplier is selected
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', ml: '60px' }}>
      <Box sx={{ width: '90%', mb: 2 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          <TextField
            type="text"
            placeholder="Supplier Name"
            name='name'
            value={Supplier.name}
            onChange={handleChange}
            variant="outlined"
            sx={{ m: 1 }}
          />
          <TextField
            type="text"
            placeholder="Address"
            name='address'
            value={Supplier.address}
            onChange={handleChange}
            variant="outlined"
            sx={{ m: 1 }}
          />
          <TextField
            type="text"
            placeholder="Telephone Number"
            name='tel_number'
            value={Supplier.tel_number}
            onChange={handleChange}
            variant="outlined"
            sx={{ m: 1 }}
          />
          <TextField
            type="text"
            placeholder="Fax Number"
            name='fax_number'
            value={Supplier.fax_number}
            onChange={handleChange}
            variant="outlined"
            sx={{ m: 1 }}
          />
          {showCreateButton && ( // Render create button conditionally
            <Button type='submit' variant='contained' color='primary' sx={{ m: 1 }}>
              Create
            </Button>
          )}
          {selectedSupplier && (
            <React.Fragment>
              <Button onClick={() => handleDelete(selectedSupplier.supplier_num)} variant='contained' color='secondary' sx={{ m: 1 }}>
                Delete
              </Button>
              <Button type='submit' variant='contained' color='primary' sx={{ m: 1 }}>
                Update
              </Button>
            </React.Fragment>
          )}
        </form>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Supplier Number</th>
              <th>Supplier Name</th>
              <th>Address</th>
              <th>Telephone</th>
              <th>Fax Number</th>
            </tr>
          </thead>
          <tbody>
            {Suppliers.map((supplier) => (
              <tr key={supplier.supplier_num} onClick={() => handleSelectSupplier(supplier)} style={{ backgroundColor: selectedSupplier?.supplier_num === supplier.supplier_num ? '#f0f0f0' : 'transparent' }}> 
                <td>{supplier.supplier_num}</td>
                <td>{supplier.name}</td>
                <td>{supplier.address}</td>
                <td>{supplier.tel_number}</td>
                <td>{supplier.fax_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default Suppliers;
