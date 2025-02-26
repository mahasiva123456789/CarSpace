import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import "./Home.css"; // Updated CSS file

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [carsCount, setCarsCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUsersCount(usersSnapshot.size);

        const carsSnapshot = await getDocs(collection(db, "cars"));
        setCarsCount(carsSnapshot.size);

        const requestsSnapshot = await getDocs(collection(db, "carRequests"));
        setRequestsCount(requestsSnapshot.size);

        const acceptedRequests = requestsSnapshot.docs.filter(
          (doc) => doc.data().status === "Accepted"
        );
        setAcceptedCount(acceptedRequests.length);

        const recentRequestsQuery = query(
          collection(db, "carRequests"),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const recentRequestsSnapshot = await getDocs(recentRequestsQuery);

        const recentRequestsData = recentRequestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          carName: doc.data().carName,
          userName: doc.data().userName,
          status: doc.data().status,
        }));

        setRecentRequests(recentRequestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-heading">Admin Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>{usersCount}</h3>
          <p>Registered Users</p>
        </div>
        <div className="stat-box">
          <h3>{carsCount}</h3>
          <p>Total Cars</p>
        </div>
        <div className="stat-box">
          <h3>{requestsCount}</h3>
          <p>Total Requests</p>
        </div>
        <div className="stat-box">
          <h3>{acceptedCount}</h3>
          <p>Accepted Requests</p>
        </div>
      </div>

      <h3 className="recent-requests-heading">Recent Car Requests</h3>
      <ul className="recent-requests-list">
        {recentRequests.length > 0 ? (
          recentRequests.map((req) => (
            <li key={req.id} className="request-card">
              <span className="request-user">{req.userName}</span> requested
              <span className="request-car"> {req.carName}</span> 
              <span className={`status-tag ${req.status.toLowerCase()}`}>{req.status}</span>
            </li>
          ))
        ) : (
          <p className="no-requests">No recent requests</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
