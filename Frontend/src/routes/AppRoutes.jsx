import { Route, Router, Routes } from 'react-router-dom';
import Dashboard from '../modules/dashboard/dashboard.component';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}