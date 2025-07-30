"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { log } from "console";

interface Shift {
  id: number;
  name: string;
  starttime: string;
  endtime: string;
  createdat: string;
}

export default function ShiftPage() {
  const [name, setName] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [shifts, setShifts] = useState<Shift[]>([]);

  const fetchShifts = async () => {
    try {
      const res = await axios.get("/api/shift/get");
      setShifts(res.data.shifts);
    } catch (err) {
      console.error("Failed to fetch shifts", err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/shift/add", {
        name,
        starttime,
        endtime,
      });
      setName("");
      setStarttime("");
      setEndtime("");
      fetchShifts();
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert(err.response.data.message); // shows "Shift already exists..."
      } else {
        console.log("value log from shift creation", err.response.data.message);
        alert("Failed to create shift");
      }
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Shift Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="border p-4 mb-4">
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Shift Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Start Time</label>
            <input
              type="time"
              className="form-control"
              value={starttime}
              onChange={(e) => setStarttime(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">End Time</label>
            <input
              type="time"
              className="form-control"
              value={endtime}
              onChange={(e) => setEndtime(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="btn btn-success">Create Shift</button>
      </form>

      {/* Table */}
      <h4>All Shifts</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No shifts found
                </td>
              </tr>
            ) : (
              shifts.map((shift, index) => (
                <tr key={shift.id}>
                  <td>{shift.id}</td>
                  <td>{shift.name}</td>
                  <td>{shift.starttime}</td>
                  <td>{shift.endtime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
