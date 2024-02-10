import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './UserListPage.jsx';
import UserDetailsPage from './UserDetailsPage.jsx';

function App() {
  return (
    <>
        <Router>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/:username" element={<UserDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
