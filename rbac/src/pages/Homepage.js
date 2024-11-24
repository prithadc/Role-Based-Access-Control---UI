import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-6">RBAC Admin Dashboard</h1>
    <div className="space-x-4">
      <Link to="/users" className="px-4 py-2 bg-blue-500 text-white rounded">
        Manage Users
      </Link>
      <Link to="/roles" className="px-4 py-2 bg-green-500 text-white rounded">
        Manage Roles
      </Link>
    </div>
  </div>
);

export default HomePage;
