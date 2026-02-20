// App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

function App() {
  const auth = useAuth();

  // Persist user session in localStorage
  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      localStorage.setItem("userEmail", auth.user.profile.email);
      localStorage.setItem("idToken", auth.user.id_token);
      localStorage.setItem("accessToken", auth.user.access_token);
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
    }
  }, [auth.isAuthenticated, auth.user]);

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Encountering error... {auth.error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? <Dashboard /> : <Navigate to="/home" replace />
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;