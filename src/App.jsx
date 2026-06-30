import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPatientPage } from "./pages/auth/SignupPatientPage";
import { SignupPhysicianPage } from "./pages/auth/SignupPhysicianPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PhysiciansListPage } from "./pages/PhysiciansListPage";
import { PhysicianDetailPage } from "./pages/PhysicianDetailPage";
import { DepartmentsListPage } from "./pages/DepartmentsListPage";
import { DepartmentDetailPage } from "./pages/DepartmentDetailPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PatientsListPage } from "./pages/PatientsListPage";
import { PatientDetailPage } from "./pages/PatientDetailPage";
import "./App.css";
import { NavBar } from "./components/navBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/patient" element={<SignupPatientPage />} />
        <Route path="/signup/physician" element={<SignupPhysicianPage />} />
        <Route
          path="/physicians"
          element={
            <ProtectedRoute>
              <PhysiciansListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/physicians/:physicianId"
          element={
            <ProtectedRoute>
              <PhysicianDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <DepartmentsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/:departmentId"
          element={
            <ProtectedRoute>
              <DepartmentDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <ConnectionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* physician-only */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute role="physician">
              <PatientsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:patientId"
          element={
            <ProtectedRoute role="physician">
              <PatientDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
