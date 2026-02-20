// pages/Home.jsx
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

  const handleSignOut = () => {
    auth.removeUser(); // remove local session
    localStorage.clear(); // clear all stored tokens

    const clientId = "2dhfmd1rd9gg903g310g5uuqog";
    const logoutUri = "https://demo-tasks-drab.vercel.app/"; // Must match Cognito logout URL
    const cognitoDomain = "https://ap-south-1si2vsazlq.auth.ap-south-1.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return (
    <div>
      <h2>Welcome to Home Page</h2>
      {auth.isAuthenticated ? (
        <div>
          <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => auth.signinRedirect()}>Sign In</button>
      )}
    </div>
  );
}

export default Home;