// src/components/Menu.jsx
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function Menu() {
  const auth = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/home" style={{ marginRight: "15px" }}>Home</Link>

      {auth.isAuthenticated && (
        <>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <Link to="/users" style={{ marginRight: "15px" }}>Users</Link>
          <button
            onClick={() => auth.removeUser()}
            style={{ marginLeft: "15px", cursor: "pointer" }}
          >
            Sign Out
          </button>
        </>
      )}

      {!auth.isAuthenticated && (
        <button
          onClick={() => auth.signinRedirect()}
          style={{ marginLeft: "15px", cursor: "pointer" }}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Menu;