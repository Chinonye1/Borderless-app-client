import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.png";

// links any visitor can see in the bar
const PUBLIC_LINKS = [
  { label: "Departments", to: "/departments" },
  { label: "Physicians", to: "/physicians" },
];

export function NavBar() {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ bgcolor: "#fff" }}>
      <Toolbar sx={{ gap: 1 }}>
        
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", color: "inherit" }}
        >
          <Avatar src={logo} alt="Borderless" sx={{ width: 36, height: 36 }} />
          <Typography variant="h6" fontWeight="bold" color="primary" sx={{ display: { xs: "none", sm: "block" } }}>
            Borderless
          </Typography>
        </Box>

       
        <Stack direction="row" spacing={1} sx={{ ml: 3, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {PUBLIC_LINKS.map((l) => (
            <Button key={l.to} component={Link} to={l.to} color="inherit">
              {l.label}
            </Button>
          ))}
          {user && (
            <Button component={Link} to="/connections" color="inherit">
              Connections
            </Button>
          )}
          {user?.role === "physician" && (
            <Button component={Link} to="/patients" color="inherit">
              Patients
            </Button>
          )}
        </Stack>

       
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", ml: "auto" }}>
          {user ? (
            <>
              <Button component={Link} to="/profile" color="inherit">
                {user.fullname || "Profile"}
              </Button>
              <Button variant="outlined" color="primary" onClick={logOutUser}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button variant="contained" color="primary" component={Link} to="/signup/patient">
                Sign up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
