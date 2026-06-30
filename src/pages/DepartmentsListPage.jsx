import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../services/service.config";

import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Stack,
  Chip,
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
            <Card sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                to={`/departments/${dept._id}`}
                sx={{ height: "100%" }}
              >
                {dept.image && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={dept.image}
                    alt={dept.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {dept.name}
                  </Typography>
                  {dept.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {dept.description}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
                    {(dept.specialties || []).slice(0, 3).map((sp) => (
                      <Chip
                        key={sp}
                        label={sp}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);
}
