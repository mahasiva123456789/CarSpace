
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import PreOwnedCar from "./components/preownedcar";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
                <Route path="/usedcar" element={<ProtectedRoute role="user"><PreOwnedCar /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
