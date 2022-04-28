import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Login, UserList } from 'components';

export const RouteMenu: React.FC = () => (
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="userList" element={<UserList />} />
    <Route path="login" element={<Login />} />
    <Route path="*" element={<Login />} />
  </Routes>
);
