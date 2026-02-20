// Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { fetchData } from "../utils/api";
import * as constants from "../utils/constants";

function Dashboard() {
  const [data, setData] = useState([]); // data must be an array
  const auth = useAuth();
  const navigate = useNavigate();

  // Fetch comments/data from API
  useEffect(() => {
    fetchData()
      .then((res) => {
        console.log("Data from API:", res);
        setData(res.comments || []); // always an array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
      });
  }, []);

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  // Proper Sign Out handling
  const handleSignOut = () => {
    // Remove user from react-oidc-context memory
    auth.removeUser();

    // Clear localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");

    // Redirect to Cognito logout endpoint
    const clientId = "2dhfmd1rd9gg903g310g5uuqog";
    const cognitoDomain =
      "https://ap-south-1si2vsazlq.auth.ap-south-1.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      constants.APP_URL + "/home"
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
              <a
                href="#"
                onClick={() =>
                  console.log("Edit clicked for item:", item)
                }
              >
                Edit
              </a>{" "}
              -{" "}
              <a
                href="#"
                onClick={() =>
                  console.log("Delete clicked for item:", item)
                }
              >
                Delete
              </a>
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