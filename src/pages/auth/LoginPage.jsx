import service from "../../services/service.config";

import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { AuthContext } from "../../context/auth.context";
import { loginSchema } from "../../validators/auth.validators";

export function LoginPage() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

      const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    setFormErrors(result.error.flatten().fieldErrors);
    return; // stop — don't call the API with bad input
  }
  setFormErrors({}); // clear old errors on a valid submit

    try {
      const body = { email, password };

      const response = await service.post("/auth/login", body);
      console.log(response);

      // storing the token in localStorage
      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      setErrorMessage(error.response?.data?.errorMessage || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Welcome back
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!formErrors.email}
              helperText={formErrors.email?.[0]}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!formErrors.password}
              helperText={formErrors.password?.[0]}
              fullWidth
            />

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Stack>
        </Box>

        <Typography sx={{ mt: 2 }} textAlign="center">
          No account? <Link to="/signup/patient">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
