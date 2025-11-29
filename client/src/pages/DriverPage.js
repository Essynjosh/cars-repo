import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";

const backendURL = "http://localhost:3004";

const DriverPage = () => {
  const [f, setF] = useState({
    name: "",
    id_no: "",
    car_number: "",
    departure_time: "",
    arrival_time: "",
    fuel_in_litres: "",
    price_per_litre: ""
  });

  // helper: convert Date or ISO to datetime-local string (YYYY-MM-DDTHH:mm)
  const toLocalInput = (dt) => {
    if (!dt) return "";
    const d = new Date(dt);
    const tzOffset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - tzOffset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const handleChange = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client validation
    if (!f.name || !f.id_no || !f.car_number) {
      return alert("Please fill name, ID and car number.");
    }
    if (!f.departure_time || !f.arrival_time) {
      return alert("Pick departure and arrival times.");
    }
    if (!f.fuel_in_litres || !f.price_per_litre) {
      return alert("Enter fuel and price.");
    }

    // prepare payload: use ISO strings for dates
    const payload = {
      name: f.name.trim(),
      id_no: f.id_no.trim(),
      car_number: f.car_number.trim(),
      departure_time: new Date(f.departure_time).toISOString(),
      arrival_time: new Date(f.arrival_time).toISOString(),
      fuel_in_litres: parseFloat(f.fuel_in_litres),
      price_per_litre: parseFloat(f.price_per_litre)
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await axios.post(`${backendURL}/drivers`, payload, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Server response:", res.data);
      alert("Trip recorded successfully!");
      setF({
        name: "",
        id_no: "",
        car_number: "",
        departure_time: "",
        arrival_time: "",
        fuel_in_litres: "",
        price_per_litre: ""
      });
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response) {
        alert("Server error: " + (err.response.data.error || JSON.stringify(err.response.data)));
      } else if (err.request) {
        alert("No response from server — is backend running? Check CORS and network.");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Driver Trip Entry</Typography>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <TextField name="name" label="Name" value={f.name} onChange={handleChange} required />
        <TextField name="id_no" label="ID No" value={f.id_no} onChange={handleChange} required />
        <TextField name="car_number" label="Car Number" value={f.car_number} onChange={handleChange} required />

        <TextField
          type="datetime-local"
          name="departure_time"
          label="Departure Time"
          value={f.departure_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          type="datetime-local"
          name="arrival_time"
          label="Arrival Time"
          value={f.arrival_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          type="number"
          name="fuel_in_litres"
          label="Fuel in Litres"
          value={f.fuel_in_litres}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          required
        />
        <TextField
          type="number"
          name="price_per_litre"
          label="Price per Litre"
          value={f.price_per_litre}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          required
        />

        <Button type="submit" variant="contained">Submit Trip</Button>
      </form>
    </Container>
  );
};

export default DriverPage;
