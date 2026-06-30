import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Stack,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import service from "../../services/service.config";

export function SignupPatientPage() {
  const navigate = useNavigate();

  const [specialistneeded, setSpecialistneeded] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [languages, setLanguages] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullname", fullname);
      formData.append("country", country);
      formData.append("age", age);
      formData.append("languages", languages);
      formData.append("role", "patient");
      formData.append("specialistneeded", specialistneeded);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("document", documentFile);

      await service.post("/users/patient", formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.errorMessage ||
          error.response?.data?.error ||
          "Signup failed",
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Create your account
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Set up your profile in a couple of minutes.
        </Typography>

        <Box component="form" onSubmit={handleSignup}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Min 8 chars, with an uppercase, a lowercase and a number"
              fullWidth
            />
            <TextField
              label="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              fullWidth
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextField
              label="Languages"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              helperText="Comma-separated, e.g. English, French"
              fullWidth
            />
            <TextField
              label="Specialist needed"
              value={specialistneeded}
              onChange={(e) => setSpecialistneeded(e.target.value)}
              fullWidth
            />
            <TextField
              label="Describe your condition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <Button variant="outlined" component="label">
              {image ? "Change photo" : "Upload photo"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>
            {image && (
              <Typography variant="body2" color="text.secondary">
                {image.name}
              </Typography>
            )}

            <Button variant="outlined" component="label">
              {documentFile ? "Change document" : "Upload document"}
              <input
                type="file"
                hidden
                onChange={(e) => setDocumentFile(e.target.files[0])}
              />
            </Button>
            {documentFile && (
              <Typography variant="body2" color="text.secondary">
                {documentFile.name}
              </Typography>
            )}

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Button type="submit" variant="contained" size="large" fullWidth>
              Create account
            </Button>
          </Stack>
        </Box>

        <Typography sx={{ mt: 2 }} textAlign="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
