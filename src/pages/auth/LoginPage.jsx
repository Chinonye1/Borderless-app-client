import service from "../../services/service.config";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export function LoginPage() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await service.post("/auth/login", body);
      console.log(response);

      // storing the token in localStorage
      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      
        setErrorMessage(error.response?.data?.errorMessage || "Login failed");
      
    }
  };

  return (
    <div>
      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
