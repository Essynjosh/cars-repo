import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Typography } from "@mui/material";

const backendURL = "http://localhost:3004";

const ManagerPage = () => {
  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    try {
      const res = await axios.get(`${backendURL}/drivers`);
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>
      {drivers.map(d => (
        <div key={d.id} style={{ marginBottom: "10px" }}>
          {d.name} - {d.car_number} <Checkbox checked={true} /> Signed In/Out
        </div>
      ))}
    </div>
  );
};

export default ManagerPage;
