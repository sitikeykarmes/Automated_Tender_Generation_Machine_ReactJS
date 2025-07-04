import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-10" />
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-black font-semibold">Home</Link>
        <span className="text-gray-400">|</span>
        <a href="#" className="text-black font-semibold">About</a>
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
          <img src={user} alt="User" className="w-5" />
          <a href="#" className="text-black">Login</a>
        </div>
      </div>
    </nav>
  );
}
