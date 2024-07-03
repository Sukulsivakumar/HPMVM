import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./Pages/dashboard";
import Newpatient from "./Pages/newPatient";
import ViewPatient from "./Pages/ViewPatient";
import Profile from "./Pages/Profile";
import NewDoctor from "./Pages/newDoctor";
import ViewDoctor from "./Pages/ViewDoctor";
import NewPrescription from "./Pages/NewPrescription";
import Viewprescription from "./Pages/ViewPrescription";
import PrintPrescription from "./Pages/PrintPrescription";
import Patient from "./Auth/Patient";
import PrescriptionDetails from "./Pages/PrescriptionDetails";
const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Login/>}/>
      <Route path="/dashboard" element ={<Dashboard/>}/>\
      <Route path="/new-patient" element ={<Newpatient/>} />
      <Route path="/view-patient" element ={<ViewPatient/>} />
      <Route path="/profile" element ={<Profile/>} />
      <Route path="/new-doctor" element ={<NewDoctor/>} />
      <Route path="/view-doctor" element ={<ViewDoctor/>} />
      <Route path="/newprescription" element ={<NewPrescription/>} />
      <Route path="/view-prescription" element ={<Viewprescription/>} />
      <Route path="/print-prescription" element = {<PrintPrescription/>}/>
      <Route path="/patient" element = {<Patient/>}/>
      <Route path="/prescription-details" element = {<PrescriptionDetails/>}/>
    </Routes>
    </BrowserRouter>
   );
}
 
export default App;
