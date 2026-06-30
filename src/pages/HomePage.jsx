import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../services/service.config";
import { DepartmentCard } from "../components/DepartmentCard";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  Rating,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import hero from "../assets/Hospital background image.jpg";


const STATS = [
  { value: "60+", label: "Countries served" },
  { value: "2000+", label: "Verified Specialists" },
  { value: "20,000+", label: "Patients helped" },
];

const STEPS = {
  patients: [
    { icon: <PersonAddAlt1Icon />, title: "Create your profile", text: "Sign up and describe the care you need in a few minutes." },
    { icon: <SearchIcon />, title: "Find a specialist", text: "Browse verified doctors by department, specialty and country." },
    { icon: <ChatBubbleOutlineIcon />, title: "Connect & consult", text: "Send a request and start your cross-border consultation." },
  ],
  physicians: [
    { icon: <VerifiedIcon />, title: "Register & verify", text: "Join the network and set up your verified physician profile." },
    { icon: <SearchIcon />, title: "Set your specialty", text: "Add your department, specialty and consultation fee." },
    { icon: <EventAvailableIcon />, title: "Accept requests", text: "Receive patient requests and accept the ones you can help." },
  ],
};

export function HomePage() {
  const [tab, setTab] = useState("patients");
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await service.get("/departments");
        setDepartments(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingDepts(false);
      }
    };

    const getReviews = async () => {
      try {
        const response = await service.get("/reviews");
        setReviews(response.data.slice(0, 3)); // latest 3
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
    getReviews();
  }, []);

  // only show the first 6 on the homepage
  const featuredDepartments = departments.slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      {/* ===== Hero ===== */}
      <Box
        sx={{
          position: "relative",
          my: 4,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <Box
          component="img"
          src={hero}
          alt="Borderless Health"
          sx={{
            width: "100%",
            height: { xs: 260, md: 420 },
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(15, 23, 42, 0.55)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            p: { xs: 3, md: 8 },
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: 32, md: 56 }, maxWidth: 700 }}>
            Healthcare without borders
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: 560, fontWeight: 400 }}>
            Connect with verified specialists across the world — wherever you are.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
            <Button variant="contained" size="large" component={Link} to="/signup/patient">
              Find a specialist
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/signup/physician"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Join as a physician
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* ===== Stats ===== */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 4, my: 4 }}>
        <Grid container spacing={2} textAlign="center">
          {STATS.map((s) => (
            <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {s.value}
              </Typography>
              <Typography color="text.secondary">{s.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* ===== Welcome ===== */}
      <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto", my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Borderless Health
        </Typography>
        <Typography color="text.secondary">
          Borderless Health connects patients with trusted, verified specialists around
          the globe. Whether you need a second opinion or care your home country can't
          offer, we make it simple to find the right doctor, share your records securely,
          and start a consultation across borders.
        </Typography>
      </Box>

      {/* ===== How it works ===== */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          How it works
        </Typography>
        <Tabs
          value={tab}
          onChange={(event, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Patients" value="patients" />
          <Tab label="Physicians" value="physicians" />
        </Tabs>
        <Grid container spacing={3}>
          {STEPS[tab].map((step, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2, width: 56, height: 56 }}>
                  {step.icon}
                </Avatar>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">{step.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      

      {/* ===== Departments (from backend) ===== */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Explore our departments
        </Typography>

        {loadingDepts ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {featuredDepartments.map((dept) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept._id}>
      <DepartmentCard department={dept} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="outlined" size="large" component={Link} to="/departments">
            View all departments
          </Button>
        </Box>
      </Box>

      {/* ===== Reviews (from backend) ===== */}
      {reviews.length > 0 && (
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Lives changed across borders
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {reviews.map((r) => (
              <Grid size={{ xs: 12, md: 4 }} key={r._id}>
                <Card sx={{ height: "100%", p: 2 }}>
                  <CardContent>
                    <Rating value={r.rating} readOnly sx={{ mb: 1 }} />
                    {r.comment && (
                      <Typography sx={{ fontStyle: "italic", mb: 3 }}>"{r.comment}"</Typography>
                    )}
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        {r.patient?.user?.fullname?.[0] || "?"}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold">
                          {r.patient?.user?.fullname || "Anonymous"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {r.department?.name}
                          {r.patient?.user?.country ? ` · ${r.patient.user.country}` : ""}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
