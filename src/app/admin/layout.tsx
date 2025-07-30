"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="sidebar bg-secondary text-white p-3">
          <h4 className="mb-4">TracKaro</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="/admin/dashboard" className="nav-link text-white">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/employeelist" className="nav-link text-white">
                Employees
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/shift" className="nav-link text-white">
                Shift
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/departmentlist" className="nav-link text-white">
                Department
              </a>
            </li>
            <li className="nav-item">
              <a href="/logout" className="nav-link text-white">
                Logout
              </a>
            </li>
          </ul>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light position-relative">
        {/* Toggle button inside main area */}
        <button
          className="btn btn-primary toggle-btn-inside"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          ☰
        </button>

        {/* Page content */}
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}
