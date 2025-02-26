import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import "./Booking.css";

const Booking = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const requestCollection = await getDocs(collection(db, "carRequests"));
    setRequests(requestCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId, status) => {
    await updateDoc(doc(db, "carRequests", requestId), { status });
    window.alert(`Request has been ${status.toLowerCase()} successfully!`);
    fetchRequests(); // Refresh list after update
  };

  return (
    <div className="booking-container">
      <h2>Car Requests</h2>
      {requests.length > 0 ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Car Name</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>{req.carName}</td>
                <td>{new Date(req.timestamp?.seconds * 1000).toLocaleString()}</td>
                <td>
                  <span className={`status status-${req.status.toLowerCase()}`}>{req.status}</span>
                </td>
                <td>
                  {req.status === "Pending" && (
                    <>
                      <button onClick={() => updateRequestStatus(req.id, "Accepted")} className="accept-button">
                        Accept
                      </button>
                      <button onClick={() => updateRequestStatus(req.id, "Rejected")} className="reject-button">
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-requests">No car requests available.</p>
      )}
    </div>
  );
};

export default Booking;
