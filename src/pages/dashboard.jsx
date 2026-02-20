// Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { fetchData } from '../utils/api';

function Dashboard() {

  const [data, setData] = useState(0);
  const auth = useAuth();
  const navigate = useNavigate();
      
    useEffect(() => {
        fetchData()
        .then(data => {
            console.log("Data from API:", data);
            setData(data.comments);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
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
                {item.name} - 
                {item.email} - 
                <a href='javascript:void(0)' onClick={() => console.log("Edit clicked for item:", item)}>Edit</a> - 
                <a href="javascript:void(0)" onClick={() => console.log("Delete clicked for item:", item)}>Delete</a>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Dashboard;