import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMember from './pages/member/AddMember';
import Login from './pages/user/Login';
import Registration from './pages/user/Registration';
import AllMembers from './pages/member/AllMembers';
import EditMember from './pages/member/EditMember';
import AddTrainer from './pages/trainers/AddTrainer';
import AllTrainers from './pages/trainers/AllTrainers';
import EditTrainer from './pages/trainers/EditTrainer';
import WelcomeScreen from './Componants/DefauldLayout/WelcomeScreen';
import Privateroute from './Componants/Privateroute';
import AddPackages from './pages/Packages/AddPackages';
import AllPackages from './pages/Packages/AllPackages';
import EditPackage from './pages/Packages/EditPackage';
import CreateMembership from './pages/MembershipAsign/CreateMembership';
import AllMembership from './pages/MembershipAsign/AllMembership';
import EditMembership from './pages/MembershipAsign/EditMembership';
import AddSchedule from './pages/Schedule/AddSchedule';
import AllSchedule from './pages/Schedule/AllSchedule';
import EditSchedule from './pages/Schedule/EditSchedule';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/*" element={<Privateroute />}>
          <Route path="" element={<WelcomeScreen />} />
          <Route path="addMember" element={<AddMember />} />
          <Route path="editMember/:id" element={<EditMember />} />
          <Route path="allMembers" element={<AllMembers />} />
          <Route path="addTrainer" element={<AddTrainer />} />
          <Route path="allTrainer" element={<AllTrainers />} />
          <Route path="editTrainer/:id" element={<EditTrainer />} />
          <Route path="addPackage" element={<AddPackages />} />
          <Route path="allPackage" element={<AllPackages />} />
          <Route path="editPackage/:id" element={<EditPackage />} />
          <Route path="createMembership" element={<CreateMembership />} />
          <Route path="allMembership" element={<AllMembership />} />
          <Route path="editMembership/:id" element={<EditMembership />} />

          <Route path="addSchedule" element={<AddSchedule />} />
          <Route path="allSchedule" element={<AllSchedule />} />
          
          <Route path="allSchedule/:id" element={<EditSchedule />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;