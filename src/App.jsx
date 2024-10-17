import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 'Routes' va 'Route' import qilindi
import AdminPanel from './pages/AdminPanel';
import OrganizationDetail from './pages/MorePage';

const App = () => {
  const [data, setData] = useState([
    {
      key: 1,
      id: 1,
      name: '—',
      inn: '223344556',
      status: 'Faol',
      address: 'Toshkent, Chilonzor 9kv',
      createdAt: '05.11.2018',
    },
    {
      key: 2,
      id: 2,
      name: 'Cambridge academy',
      inn: '—',
      status: 'Faol',
      address: 'Toshkent, Chilonzor 10kv',
      createdAt: '05.11.2005',
    },
  ]);

  const updateOrganization = (id, updatedValues) => {
    const newData = data.map(item => (item.id === parseInt(id) ? { ...item, ...updatedValues } : item));
    setData(newData);
  };

  return (
    <Router>
      <Routes> {/* Switch o'rniga Routes ishlatilmoqda */}
        <Route path="/" element={<AdminPanel data={data} setData={setData} />} /> {/* component propslarini element bilan almashtiring */}
        <Route path="/organization/:id" element={<OrganizationDetail data={data} updateOrganization={updateOrganization} />} />
      </Routes>
    </Router>
  );
};

export default App;
