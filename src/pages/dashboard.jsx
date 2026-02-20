
import { useState, useEffect } from 'react'
import { fetchData } from '../utils/api';


export const Dashboard = () => {

    const [data, setData] = useState(0)
    
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

    return (
        <div>   
            <h2>Dashboard Page</h2>
            <p>This is the dashboard page. You can add your dashboard content here.</p>

            {data && (
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
      )}
        </div>
    );
}