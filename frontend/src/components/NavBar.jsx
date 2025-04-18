import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, currentUser } = useContext(ShopContext);

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Trendify" />
      </Link>
      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className="flex items-center gap-1">
          Home
        </NavLink>
        <NavLink to="/collection" className="flex items-center gap-1">
          Products
        </NavLink>
        <NavLink to="/about" className="flex items-center gap-1">
          About
        </NavLink>
        <NavLink to="/contact" className="flex items-center gap-1">
          Contact
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {currentUser ? (
          <Link to="/profile">
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Profile" />
          </Link>
        ) : (
          <Link to="/login">
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Login" />
          </Link>
        )}

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-pointer" alt="Cart" />
          {getCartCount() > 0 && (
            <span className="absolute -right-1 -bottom-1 w-4 h-4 text-[8px] bg-black text-white rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-white z-50 transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}> 
        <button onClick={() => setVisible(false)} className="p-4">Close</button>
        <ul className="flex flex-col p-4 gap-4">
          <NavLink onClick={() => setVisible(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection">Products</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about">About</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact">Contact</NavLink>
          {currentUser ? (
            <NavLink onClick={() => setVisible(false)} to="/profile">Profile</NavLink>
          ) : (
            <NavLink onClick={() => setVisible(false)} to="/login">Login</NavLink>
          )}
        </ul>
      </div>
    </nav>
);
}
export default NavBar;