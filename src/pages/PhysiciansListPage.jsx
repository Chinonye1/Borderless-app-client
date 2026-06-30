import { useState, useEffect } from "react";
import { Container, Typography, Grid, Box, CircularProgress } from "@mui/material";
import service from "../services/service.config";
import { PhysicianCard } from "../components/PhysicianCard";

export function PhysiciansListPage() {
  const [physicians, setPhysicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPhysicians = async () => {
      try {
        const response = await service.get("/users/physicians");
        setPhysicians(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPhysicians();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our specialists
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Browse verified physicians from around the world.
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : physicians.length === 0 ? (
        <Typography color="text.secondary">No physicians found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {physicians.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p._id}>
              <PhysicianCard physician={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
