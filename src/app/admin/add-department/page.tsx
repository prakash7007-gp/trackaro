"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Employee {
  id: number;
  name: string;
}

export default function AddDepartmentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [inchargeid, setInchargeid] = useState<number | "">("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get("/api/employee/get").then((res) => {
      setEmployees(res.data.employees);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/department/add", {
        name,
        inchargeid: inchargeid || null,
      });
      router.push("/admin/departmentlist");
    } catch (err) {
      console.error("Error adding department", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Department Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Incharge</label>
          <select
            className="form-select"
            value={inchargeid}
            onChange={(e) => setInchargeid(Number(e.target.value))}
          >
            <option value="">Select Incharge</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
}
