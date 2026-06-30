import { useState, useEffect } from "react";
import { Container, Typography, Grid, Box, CircularProgress, TextField, MenuItem, Stack } from "@mui/material";
import service from "../services/service.config";
import { PhysicianCard } from "../components/PhysicianCard";

export function PhysiciansListPage() {
  const [physicians, setPhysicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

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
  const getDepartments = async () => {
      try {
        const response = await service.get("/departments");
        setDepartmentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDepartments();
  }, []);

const filtered = physicians.filter((e) => {
  const matchesName = e.user?.fullname?.toLowerCase().includes(search.toLowerCase());
  const matchesDept = departmentFilter ? e.department?._id === departmentFilter : true;
  return matchesName && matchesDept;
});

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our specialists
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Browse verified physicians from around the world.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
  <TextField label="Search by name" value={search}
    onChange={(e) => setSearch(e.target.value)} fullWidth />
  <TextField select label="Department" value={departmentFilter}
    onChange={(e) => setDepartmentFilter(e.target.value)} sx={{ minWidth: 200 }}>
    <MenuItem value="">All departments</MenuItem>
    {departmentList.map((d) => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
  </TextField>
</Stack>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography color="text.secondary">No physicians match your filters.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p._id}>
              <PhysicianCard physician={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
