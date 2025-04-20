// src/components/Navbar.jsx
function Navbar() {
    const logout = () => {
      localStorage.clear();
      window.location.href = '/login';
    };
  
    return (
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Rider Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </nav>
    );
  }
  
  export default Navbar;
  