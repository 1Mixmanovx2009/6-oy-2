import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import OrganizationDetail from './pages/MorePage'; 

const App = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Tashkilot 1', inn: '123456789', address: 'Manzil 1', status: 'Faol', createdAt: '2024-01-01' },
    { id: 2, name: 'Tashkilot 2', inn: '987654321', address: 'Manzil 2', status: 'Faol', createdAt: '2024-02-01' },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel data={data} setData={setData} />} />
        <Route path="/organization/:id" element={<OrganizationDetail data={data} updateOrganization={setData} />} />
      </Routes>
    </Router>
  );
};

export default App;
