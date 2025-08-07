import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import EmployeesPage from "./pages/Employees";
import DevicesPage from "./pages/devices/Devices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/employees" />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="devices" element={<DevicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
