import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import ListProduct from '../ListProduct/ListProduct';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Login from '../Login/login';




const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route path="/addproduct" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/listproduct" element={<PrivateRoute element={<ListProduct />} />} />
      </Routes>
    </div>
  );
};

export default Admin;
