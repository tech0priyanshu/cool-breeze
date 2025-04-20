// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Orders from './pages/Orders';

function App() {
  const isLoggedIn = !!localStorage.getItem('riderToken');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/orders" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
