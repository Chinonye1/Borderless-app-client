import { Link } from "react-router-dom";
import {
  Card, CardActionArea, CardMedia, CardContent, Typography, Stack, Chip,
} from "@mui/material";

export function DepartmentCard({ department }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        component={Link}
        to={`/departments/${department._id}`}
        sx={{ height: "100%" }}
      >
        {department.image && (
          <CardMedia
            component="img"
            height="160"
            image={department.image}
            alt={department.name}
          />
        )}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {department.name}
          </Typography>
          {department.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {department.description}
            </Typography>
          )}
          <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
            {(department.specialties || []).slice(0, 3).map((sp) => (
              <Chip key={sp} label={sp} size="small" variant="outlined" color="primary" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}