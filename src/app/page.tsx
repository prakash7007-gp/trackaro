"use client";

import { useRouter } from "next/navigation";
import "./home.css";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="welcome-bg d-flex justify-content-center align-items-center vh-100">
      <div className="glass-box text-center p-5">
        <h1 className="mb-3 text-white">Welcome to</h1>
        <h2 className="mb-4 fw-bold text-white">TracKaro App</h2>
        <p className="text-white-50">Smart Attendance & Shift Management</p>
        <button
          className="btn btn-light mt-4 px-4"
          onClick={() => router.push("/login")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
