import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Avatar,
  Box,
} from "@mui/material";

export function ConnectionCard({ connection, role, onRespond }) {
  // the OTHER party (not me)
  const other = role === "patient" ? connection.physician : connection.patient;

  // incoming = the other person initiated it; actionable only while pending
  const isIncoming = connection.initiatedBy !== role;
  const canRespond = isIncoming && connection.status === "pending";

  const statusColor =
    connection.status === "accepted"
      ? "success"
      : connection.status === "declined"
        ? "error"
        : "warning"; // pending

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 1 }}>
          <Avatar src={other?.image}>
            {other?.user?.fullname?.[0] || "?"}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight="bold">
              {other?.user?.fullname || "Unknown"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {other?.user?.country}
            </Typography>
          </Box>
          <Chip label={connection.status} color={statusColor} size="small" />
        </Stack>

        {connection.message && (
          <Typography sx={{ mb: 1 }}>"{connection.message}"</Typography>
        )}

        {canRespond && (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => onRespond(connection._id, "accepted")}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onRespond(connection._id, "declined")}
            >
              Decline
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
