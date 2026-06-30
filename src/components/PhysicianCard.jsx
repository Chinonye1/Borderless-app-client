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

export function PhysicianCard({ physician }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        component={Link}
        to={`/physicians/${physician._id}`}
        sx={{ height: "100%" }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar
              src={physician.image}
              alt={physician.user?.fullname}
              sx={{ width: 64, height: 64 }}
            >
              {physician.user?.fullname?.[4] || "?"}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {physician.user?.fullname || "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {physician.specialty}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
            {physician.department?.name && (
              <Chip label={physician.department.name} size="small" color="primary" variant="outlined" />
            )}
            {physician.user?.country && (
              <Chip label={physician.user.country} size="small" variant="outlined" />
            )}
          </Stack>

          {physician.consultfee != null && (
            <Typography variant="body2" color="text.secondary">
              Consultation fee: ${physician.consultfee}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
