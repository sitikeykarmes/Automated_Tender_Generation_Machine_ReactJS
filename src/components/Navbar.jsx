import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import userImg from "../assets/user.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-10" />
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-black font-semibold">
          Home
        </Link>
        <span className="text-gray-400">|</span>
        <a href="#" className="text-black font-semibold">
          About
        </a>
        <div className="flex items-center border rounded px-2">
          <input
            type="text"
            placeholder="Search Here"
            className="outline-none py-1 px-2"
          />
          <button className="text-gray-500">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <img src={userImg} alt="User" className="w-5" />
          {user ? (
            <>
              <Link to="/account" className="text-black">
                Your Account
              </Link>
              <button onClick={logout} className="ml-2 text-xs text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              state={{ from: location.pathname }}
              className="text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
