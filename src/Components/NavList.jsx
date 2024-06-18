import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HotelIcon from '@mui/icons-material/Hotel';
import MedicationIcon from '@mui/icons-material/Medication';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Import LocalShippingIcon
import DescriptionIcon from '@mui/icons-material/Description'; 


import { Link } from 'react-router-dom';

const styles = {
  textDecoration: "none",
  color: "inherit"
};

const listItemButtonStyles = {
  '&:hover': {
    backgroundColor: '#800080', // Purple color
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: '#fff',
    },
  },
};

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/book-appointment" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Book Appointment" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/list_of_pa" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="List of Patient Appointments" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/forms" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Patient Registration" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/patientlist" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <AccessibleForwardIcon />
        </ListItemIcon>
        <ListItemText primary="Patient Lists" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/patient alloc" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <HotelIcon />
        </ListItemIcon>
        <ListItemText primary="Patient Allocation" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/local-doctors" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <NoteAddIcon />
        </ListItemIcon>
        <ListItemText primary="Local Doctors" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/medication form" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <MedicalInformationIcon />
        </ListItemIcon>
        <ListItemText primary="Medication Form" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/staff alloc" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <MedicationIcon />
        </ListItemIcon>
        <ListItemText primary="Staff Allocation" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/staff alloc" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Staff Form" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/stafflist" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Staff Lists" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/settings" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/about" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/suppliers" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
      <ListItemIcon>
          <LocalShippingIcon /> {/* Use LocalShippingIcon for Suppliers */}
        </ListItemIcon>
        <ListItemText primary="Suppliers" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/employment_contract" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
      <ListItemIcon>
          <DescriptionIcon /> {/* Use LocalShippingIcon for Suppliers */}
        </ListItemIcon>
        <ListItemText primary="Employment Contract" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/requisition_form" style={styles}>
      <ListItemButton sx={listItemButtonStyles}>
      <ListItemIcon>
          <DescriptionIcon /> {/* Use LocalShippingIcon for Suppliers */}
        </ListItemIcon>
        <ListItemText primary="Ward Requisition" />
      </ListItemButton>
    </Link>



  </React.Fragment>
);
