import { useState, useEffect, useContext } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { ConnectionCard } from "../components/ConnectionCard";

export function ConnectionsPage(){

     const { user } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
    try {
      const response = await service.get("/connections");
      setConnections(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



    const incoming = connections.filter((contact) => contact.initiatedBy !== user.role);
    const outgoing = connections.filter((contact) => contact.initiatedBy === user.role);

const respond = async (id, status) => {
  try {
    await service.patch(`/connections/${id}`, { status });
    await fetchConnections(); // refresh the list so the status updates
  } catch (error) { console.log(error); }
};

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Requests to you
      </Typography>
      {incoming.length === 0 && (
        <Typography color="text.secondary">No incoming requests.</Typography>
      )}
      {incoming.map((e) => (
        <ConnectionCard key={e._id} connection={e} role={user.role} onRespond={respond} />
      ))}

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Your requests
      </Typography>
      {outgoing.length === 0 && (
        <Typography color="text.secondary">No outgoing requests.</Typography>
      )}
      {outgoing.map((e) => (
        <ConnectionCard key={e._id} connection={e} role={user.role} onRespond={respond} />
      ))}
    </Container>
  );
}
