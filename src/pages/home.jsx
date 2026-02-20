// Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div>
      <h2>Welcome to Home Page</h2>

      {auth.isAuthenticated ? (
        <div>
          <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
          <button onClick={() => auth.removeUser()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => auth.signinRedirect()}>Sign In</button>
      )}
    </div>
  );
}

export default Home;