import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { fetchData } from '../utils/api';

function Dashboard() {
  const [data, setData] = useState([]); // <-- initialize as array
  const auth = useAuth();
  const navigate = useNavigate();
      
  // Fetch data from API
  useEffect(() => {
    fetchData()
      .then(data => {
        console.log("Data from API:", data);
        setData(data.comments || []); // <-- ensure it's always an array
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setData([]); // fallback to empty array
      });
  }, []);

  // Redirect to home if logged out
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <pre>Hello: {auth.user?.profile.email}</pre>
      <button onClick={() => auth.removeUser()}>Sign Out</button>

      <div className='comments_area'>
        {data.map((item, index) => (
          <div key={index}>
            {item.name} - {item.email} - 
            <a href='#' onClick={() => console.log("Edit clicked for item:", item)}>Edit</a> - 
            <a href="#" onClick={() => console.log("Delete clicked for item:", item)}>Delete</a>
          </div>
        ))}
        {data.length === 0 && <p>No comments available.</p>}
      </div>
    </div>
  );
}

export default Dashboard;