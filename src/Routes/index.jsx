import React from 'react';
import LoginPage from '../Page/Login';
import SignUpForm from '../Page/SignUp';
import Dashboard from '../Page/Dashboard';
import FormsPage from '../Page/FormsPage';
import BookAppointmentPage from '../Page/BookAppointmentPage';
import LocalDoctorsPage from '../Page/LocalDoctorsPage';
import PatientAllocation from '../Page/PatientAllocation';
import WardStaffAllocation from '../Page/WardStaffAllocation';
import Suppliers from '../Page/Suppliers'; // Import the Suppliers component
import Patients from '../Page/Patients';
import InPatients from '../Page/InPatients';
import OutPatients from '../Page/OutPatients';
import EmploymentContract from '../Page/EmploymentContract';
import WardRequisition from '../Page/WardRequisition';
import NextOfKin from '../Page/NextOfKin';

const routes = [
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpForm />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard/forms",
    element: <FormsPage />
  },
  {
    path: "/dashboard/book-appointment",
    element: <BookAppointmentPage />
  },
  {
    path: "/dashboard/local-doctors",
    element: <LocalDoctorsPage />
  },

  {
      path: "/dashboard/patient alloc",
      element: <PatientAllocation />
  },

  {
      path: "/dashboard/staff alloc",
      element: <WardStaffAllocation />
  },

  {
      path: "/dashboard/suppliers",
      element: <Suppliers />
  },

  {
    path: "/dashboard/patientlist",
    element: <Patients />
  },
  
  {

  path: "dashboard/patientlist/in_patient",
  element: <InPatients />
},

{

  path: "dashboard/patientlist/out_patient",
  element: <OutPatients />
},

{

  path: "dashboard/patientlist/next_of_kin",
  element: <NextOfKin />
},

{

  path: "dashboard/employment_contract",
  element: <EmploymentContract />
},

{

  path: "dashboard/ward_requisition",
  element: <WardRequisition />
}

  ];

export default routes;
