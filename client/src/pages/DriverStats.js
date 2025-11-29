import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Typography } from "@mui/material";

const backendURL = "http://localhost:3004";

const DriverStats = () => {
  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    try {
      const res = await axios.get(`${backendURL}/drivers`);
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadDrivers(); }, []);

  // Count trips per driver
  const tripCounts = drivers.reduce((acc, d) => {
    acc[d.name] = (acc[d.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Driver Stats</Typography>
      {Object.entries(tripCounts).map(([name, count]) => (
        <div key={name} style={{ marginBottom: "10px" }}>
          <Typography>{name} - Trips: {count}</Typography>
          <Checkbox checked={true} /> Details Recorded
        </div>
      ))}
    </div>
  );
};

export default DriverStats;
