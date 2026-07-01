import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Box, Stack, Avatar, Typography, Chip, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";


export function PatientDetailPage() {
  const { patientId } = useParams();
  const { user } = useContext(AuthContext);

   const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");    
  const [feedback, setFeedback] = useState("");  

  useEffect(() => {
  const getPatient = async () => {
    try {
      const response = await service.get(`/users/patient/${patientId}`);
      setPatient(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  getPatient();
}, [patientId]);

  const handleConnect = async () => {
    try {
      await service.post("/connections", { patientId, message });
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

if (!patient) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h5">Patient not found.</Typography>
    </Container>
  );
}

return (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Paper sx={{ p: 4 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: "center", mb: 3 }}>
        <Avatar src={patient.image} sx={{ width: 96, height: 96 }}>
          {patient.user?.fullname?.[0]}
        </Avatar>
        <Box>
          <Typography variant="h4">{patient.user?.fullname}</Typography>
          <Typography color="text.secondary">
            {patient.user?.country}
            {patient.user?.age ? ` · ${patient.user.age} yrs` : ""}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }} useFlexGap flexWrap="wrap">
        {patient.specialistneeded && (
          <Chip
            label={`Needs: ${patient.specialistneeded}`}
            color="primary"
            variant="outlined"
          />
        )}
      </Stack>

      {patient.description && (
        <Typography sx={{ mb: 2 }}>{patient.description}</Typography>
      )}

      {patient.document && (
        <Button href={patient.document} target="_blank" sx={{ mb: 2 }}>
          View document
        </Button>
      )}

      {/* physicians can request a connection */}
      {user?.role === "physician" && (
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

