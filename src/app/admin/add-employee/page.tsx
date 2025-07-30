"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Department } from "../departmentlist/page";

export default function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    departmentid: "",
  });
  const router = useRouter();

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/employee/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch("/api/department/get");
      const data = await res.json();
      setDepartments(data.departments);
    };
    fetchDepartments();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <button className="btn btn-primary " onClick={() => router.back()}>
          Back
        </button>
        <h2 className="m-2">Add New Employee</h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="employee">Employee</option>
          <option value="incharge">Incharge</option>
          <option value="admin">Admin</option>
        </select>
        <select
          name="departmentid"
          className="form-control mb-3"
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="submit">
          Add Employee
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
