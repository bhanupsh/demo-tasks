// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { fetchData } from "../utils/api";

function Dashboard() {
  const [data, setData] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();

  // Fetch API data
  useEffect(() => {
    fetchData()
      .then((res) => setData(res.comments || []))
      .catch(() => setData([]));
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSignOut = () => {
    auth.removeUser();
    localStorage.clear();

    const clientId = "2dhfmd1rd9gg903g310g5uuqog";
    const logoutUri = "https://demo-tasks-drab.vercel.app/"; // Must match Cognito logout URL
    const cognitoDomain = "https://ap-south-1si2vsazlq.auth.ap-south-1.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>Hello: {auth.user?.profile.email}</pre>
      <button onClick={handleSignOut}>Sign Out</button>

      <div className="comments_area">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              {item.name} - {item.email} -{" "}
              <a href="#" onClick={() => console.log("Edit clicked:", item)}>Edit</a>{" "}
              -{" "}
              <a href="#" onClick={() => console.log("Delete clicked:", item)}>Delete</a>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;