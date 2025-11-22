import { Route, Router, Routes } from 'react-router-dom';
import Dashboard from '../app/modules/dashboard/dashboard.component';
import LoginComponent from '../app/modules/login/login.component';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginComponent />} />
    </Routes>
  );
}