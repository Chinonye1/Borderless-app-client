import { useState, useEffect } from "react";
import service from "../services/service.config";
import { DepartmentCard } from "../components/DepartmentCard";

import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Card,
  CircularProgress,
} from "@mui/material";

export function DepartmentsListPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await service.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  const filteredDepartments = departments.filter((e)=>{
    return e.name.toLowerCase().includes(search.toLocaleLowerCase())
    
  }
)

 return (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Find a specialist</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      Search verified doctors by department.
    </Typography>

    <TextField
      label="Search departments"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      fullWidth
      sx={{ mb: 4 }}
    />

    {loading ? (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    ) : (
      <Grid container spacing={3}>
        {filteredDepartments.map((dept) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept._id}>
            <DepartmentCard department={dept} />
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);
}
