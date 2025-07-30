"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface Department {
  id: number;
  name: string;
  inchargeName: string;
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await axios.get("/api/department/get");
      setDepartments(res.data.departments);
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <h2 className="m-2">All Departments</h2>
        <button
          className="btn btn-primary ms-auto"
          onClick={() => router.push("/admin/add-department")}
        >
          Add
        </button>
      </div>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Incharge</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No departments found
              </td>
            </tr>
          ) : (
            departments.map((dep, i) => (
              <tr key={dep.id}>
                <td>{i + 1}</td>
                <td>{dep.name}</td>
                <td>{dep.inchargeName || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
