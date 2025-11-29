import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

import nissan from "../assets/nissan.jpg";
import busImg from "../assets/bus.jpg";
import taxi from "../assets/taxi.jpg";

const cars = [
  { name: "Nissan", src: nissan },
  { name: "Bus", src: busImg },
  { name: "Taxi", src: taxi },
];

const Home = () => (
  <div style={{ padding: "20px" }}>
    <Typography variant="h4" gutterBottom>Welcome to Car Management</Typography>
    <Grid container spacing={2}>
      {cars.map((c) => (
        <Grid item xs={12} sm={4} key={c.name}>
          <Card>
            <CardMedia component="img" height="300" width="200" image={c.src} alt={c.name} />
            <CardContent>
              <Typography>{c.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default Home;
