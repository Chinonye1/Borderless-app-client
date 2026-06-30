import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Rating,
  Button,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

export function DepartmentDetailPage() {
  const { departmentId } = useParams();
  const { user } = useContext(AuthContext);

  const [department, setDepartment] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await service.get(`/reviews?department=${departmentId}`);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const deptRes = await service.get(`/department/${departmentId}`);
        setDepartment(deptRes.data);
        await fetchReviews();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);
    try {
      await service.post("/reviews", { department: departmentId, rating, comment });
      setComment("");
      setRating(5);
      await fetchReviews(); // refresh the list with the new review
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.errorMessage || "Could not submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!department) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h5">Department not found.</Typography>
      </Container>
    );
  }

  // average rating
  const avg =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ===== Department header ===== */}
      <Paper sx={{ overflow: "hidden", mb: 4 }}>
        {department.image && (
          <CardMedia component="img" height="240" image={department.image} alt={department.name} />
        )}
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            {department.name}
          </Typography>
          {department.location && (
            <Typography color="text.secondary" gutterBottom>
              📍 {department.location}
            </Typography>
          )}
          {department.description && (
            <Typography sx={{ my: 2 }}>{department.description}</Typography>
          )}
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
            {(department.specialties || []).map((sp) => (
              <Chip key={sp} label={sp} color="primary" variant="outlined" />
            ))}
          </Stack>
          {reviews.length > 0 && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating value={avg} precision={0.5} readOnly />
              <Typography color="text.secondary">
                {avg.toFixed(1)} ({reviews.length} review{reviews.length > 1 ? "s" : ""})
              </Typography>
            </Stack>
          )}
        </Box>
      </Paper>

      {/* ===== Review form (patients only) ===== */}
      {user?.role === "patient" && (
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Leave a review
          </Typography>
          <Box component="form" onSubmit={handleSubmitReview}>
            <Stack spacing={2}>
              <Box>
                <Typography component="legend" color="text.secondary">
                  Your rating
                </Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
              </Box>
              <TextField
                label="Your review"
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
              />
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              <Button
                type="submit"
                variant="contained"
                disabled={submitting || !rating}
                sx={{ alignSelf: "flex-start" }}
              >
                {submitting ? "Submitting..." : "Submit review"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      )}

      {/* ===== Reviews list ===== */}
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {reviews.length === 0 ? (
        <Typography color="text.secondary">
          No reviews yet. {user?.role === "patient" && "Be the first to leave one!"}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {reviews.map((r) => (
            <Card key={r._id}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    {r.patient?.user?.fullname?.[0] || "?"}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">
                      {r.patient?.user?.fullname || "Anonymous"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {r.patient?.user?.country}
                    </Typography>
                  </Box>
                </Stack>
                <Rating value={r.rating} readOnly size="small" />
                {r.comment && <Typography sx={{ mt: 1 }}>{r.comment}</Typography>}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
