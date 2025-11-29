import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Car Management
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/driver">Driver</Button>
      <Button color="inherit" component={Link} to="/manager">Manager</Button>
      <Button color="inherit" component={Link} to="/stats">Driver Stats</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
