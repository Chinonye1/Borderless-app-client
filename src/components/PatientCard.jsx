import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Chip,
  Box,
} from "@mui/material";

export function PatientCard({ patient }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        component={Link}
        to={`/patients/${patient._id}`}
        sx={{ height: "100%" }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
            <Avatar
              src={patient.image}
              alt={patient.user?.fullname}
              sx={{ width: 64, height: 64 }}
            >
              {patient.user?.fullname?.[0] || "?"}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {patient.user?.fullname || "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.user?.country}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
            {patient.specialistneeded && (
              <Chip
                label={`Needs: ${patient.specialistneeded}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>

          {patient.description && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {patient.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
