import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Box, Stack, Avatar, Typography, Chip, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";


export function PhysicianDetailPage() {
  const { physicianId } = useParams();
  const { user } = useContext(AuthContext);

   const [physician, setPhysician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");    
  const [feedback, setFeedback] = useState("");  

  useEffect(() => {
  const getPhysician = async () => {
    try {
      const response = await service.get(`/users/physician/${physicianId}`);
      setPhysician(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  getPhysician();
}, [physicianId]);

  const handleConnect = async () => {
    try {
      await service.post("/connections", { physicianId, message });
      setFeedback("Request sent!");
    } catch (error) {
      setFeedback(error.response?.data?.errorMessage || "Could not send request");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

if (!physician) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h5">Physician not found.</Typography>
    </Container>
  );
}

return (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Paper sx={{ p: 4 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: "center", mb: 3 }}>
        <Avatar src={physician.image} sx={{ width: 96, height: 96 }}>
          {physician.user?.fullname?.[0]}
        </Avatar>
        <Box>
          <Typography variant="h4">{physician.user?.fullname}</Typography>
          <Typography color="text.secondary">{physician.specialty}</Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
        {physician.department?.name && (
          <Chip label={physician.department.name} color="primary" variant="outlined" />
        )}
        {physician.user?.country && <Chip label={physician.user.country} variant="outlined" />}
      </Stack>

      {physician.consultfee != null && (
        <Typography sx={{ mb: 2 }}>Consultation fee: ${physician.consultfee}</Typography>
      )}

      {/* patients can request a connection */}
      {user?.role === "patient" && (
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleConnect}>
            Request connection
          </Button>
          {feedback && <Alert sx={{ mt: 2 }}>{feedback}</Alert>}
        </Box>
      )}
    </Paper>
  </Container>
);


}

