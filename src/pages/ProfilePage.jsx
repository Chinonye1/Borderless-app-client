import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

export function ProfilePage() {
  const { user, profile, authenticateUser, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

//========Patient Profile=========//
const [specialistneeded, setSpecialistneeded] = useState(profile?.specialistneeded || "");
const [description, setDescription] = useState(profile?.description || "");


//========Physician Profile=========//
const [specialty, setSpecialty] = useState(profile?.specialty || "");
const [consultfee, setConsultfee] = useState(profile?.consultfee || "");


const [message, setMessage] = useState("");
const [confirmOpen, setConfirmOpen] = useState(false);

const handleSave = async (e) => {
  e.preventDefault();
  try {
    if (user.role === "patient") {
      await service.put(`/users/patient/${profile._id}`, { specialistneeded, description });
    } else {
      await service.patch(`/users/physician/${profile._id}`, { specialty, consultfee });
    }
    await authenticateUser();   
    setMessage("Profile updated");
  } catch (error) {
    console.log(error);
    setMessage("Could not update profile");
  }

}

const handleDelete = async () => {
  try {
    const path = user.role === "patient" ? "patient" : "physician";
    await service.delete(`/users/${path}/${profile._id}`);
    logOutUser();
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

return (
  <Container maxWidth="sm" sx={{ py: 4 }}>
    <Paper sx={{ p: 4 }}>
     
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Avatar src={profile?.image} sx={{ width: 64, height: 64 }}>
          {user?.fullname?.[0]}
        </Avatar>
        <Typography variant="h4">Welcome back, {user?.fullname}</Typography>
      </Stack>

      
      <Typography color="text.secondary">Email: {user?.email}</Typography>
      <Typography color="text.secondary">Country: {user?.country}</Typography>
      <Typography color="text.secondary">Age: {user?.age}</Typography>

      <Divider sx={{ my: 3 }} />

      {/* editable form */}
      <Box component="form" onSubmit={handleSave}>
        <Stack spacing={2}>
          {user?.role === "patient" ? (
            <>
              <TextField label="Specialist needed" value={specialistneeded}
                onChange={(e) => setSpecialistneeded(e.target.value)} fullWidth />
              <TextField label="Description" value={description}
                onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
            </>
          ) : (
            <>
              <TextField label="Specialty" value={specialty}
                onChange={(e) => setSpecialty(e.target.value)} fullWidth />
              <TextField label="Consultation fee" type="number" value={consultfee}
                onChange={(e) => setConsultfee(e.target.value)} fullWidth />
            </>
          )}

          {message && <Alert severity="info">{message}</Alert>}

          <Button type="submit" variant="contained">Save changes</Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* danger zone */}
      <Button color="error" variant="outlined" onClick={() => setConfirmOpen(true)}>
        Delete my profile
      </Button>
    </Paper>

    {/* delete confirmation dialog */}
    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
      <DialogTitle>Delete profile?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          !This permanently removes your profile and documents. This can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
);




}