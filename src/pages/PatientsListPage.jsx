import { useState, useEffect } from "react";
import { Container, Typography, Grid, Box, CircularProgress, TextField } from "@mui/material";
import service from "../services/service.config";
import { PatientCard } from "../components/PatientCard";

export function PatientsListPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await service.get("/users/patients");
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPatients();
  }, []);

  const filtered = patients.filter((p) =>
    p.user?.fullname?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Patients looking for a specialist.
      </Typography>

      <TextField
        label="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 4 }}
      />

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography color="text.secondary">No patients found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p._id}>
              <PatientCard patient={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
