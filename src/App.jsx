import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPatientPage } from "./pages/auth/SignupPatientPage";
import { SignupPhysicianPage } from "./pages/auth/SignupPhysicianPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup/patient" element={<SignupPatientPage />} />
      <Route path="/signup/physician" element={<SignupPhysicianPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
