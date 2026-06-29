import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function NavBar() {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/physicians">Physicians</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/connections">Connections</Link>
          <Link to="/profile">Profile</Link>
          <span>{user.fullname}</span>
          <button onClick={logOutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup/patient">Sign up</Link>
        </>
      )}
    </nav>
  );
}
