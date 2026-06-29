import service from "../services/service.config";
import { createContext, useEffect, useState } from "react";

// Context Component => the one that shares the states through the app
const AuthContext = createContext();

function AuthWrapper(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  async function authenticateUser() {
    const authToken = localStorage.getItem("authToken");

    // No token => not logged in. We're done checking.
    if (!authToken) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      // The interceptor attaches the token. Backend returns { user, profile }.
      const response = await service.get("/auth/me");
      setUser(response.data.user);
      setProfile(response.data.profile);
    } catch (error) {
      // Token invalid/expired => clear it and treat as logged out.
      console.log(error);
      localStorage.removeItem("authToken");
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []); 

  const passedContext = {
    user,
    profile,
    isLoading,
    authenticateUser,
    logOutUser,
    storeToken,
  };

  if (isLoading) {
    return <h3>... authenticating user</h3>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
