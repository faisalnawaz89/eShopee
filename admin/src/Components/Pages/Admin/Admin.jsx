import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../AddProduct/AddProduct';
import ListProduct from '../../ListProduct/ListProduct';
import Login from '../../Login/Login';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route path="/addproduct" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/listproduct" element={<PrivateRoute element={<ListProduct />} />} />
      </Routes>
    </div>
  );
};

export default Admin;
