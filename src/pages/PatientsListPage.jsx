import { useState, useEffect } from "react";
import service from "../services/service.config";

export function PatientsListPage() {
  const [physicians, setPhysicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPhysicians = async () => {
      try {
        const response = await service.get("/users/physicians");
        setPhysicians(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPhysicians();
  }, []);

  return <h1>I am Patient list page</h1>;
}
