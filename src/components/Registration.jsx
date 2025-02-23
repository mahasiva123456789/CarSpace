import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import image2 from "../assets/images/registration/image2.png";
import image1 from "../assets/images/registration/image1.png";

const Registration = () => {
    const [name, setName] = useState(""); // Fixed missing state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    // Function to Assign Role on Signup
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Assign role (default is 'user')
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: user.email,
                role: "user"
            });

            console.log("Signup successful!");
            navigate("/user");
        } catch (error) {
            console.error("Signup error:", error.message);
            setError(error.message);
        }
    };

    // Login Function
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user role
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const role = userDoc.data().role;
                localStorage.setItem("role", role);
                console.log("Logged in as:", role);

                // Redirect based on role
                navigate(role === "admin" ? "/admin" : "/user");
            } else {
                setError("User role not found, please contact support.");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            setError(error.message);
        }
    };

    // Google Login Function
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const role = userDoc.data().role;
                localStorage.setItem("role", role);
                console.log("Google login successful as:", role);
                navigate(role === "admin" ? "/admin" : "/user");
            } else {
                // If user is not found, register them with a default role
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName || "User",
                    email: user.email,
                    role: "user"
                });
                navigate("/user");
            }
        } catch (error) {
            console.error("Google login error:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="registration-container" style={{ backgroundImage: `url(${image2})` }}>
            <div className="loginsignup-container">
                <div className="loginsignup-right" style={{ backgroundImage: `url(${image1})` }}></div>

                <div className="loginsignup-left">
                    <div className="loginsignup-left-top">
                      <h1>Car<span>space</span></h1>
                     <div className="button-group">
                        <button onClick={() => setIsSignup(false)} className={!isSignup ? "active" : ""}>
                            Log In
                        </button>
                        <button onClick={() => setIsSignup(true)} className={isSignup ? "active" : ""}>
                            Sign Up
                        </button>
                    </div>
                    </div>

                    {isSignup ? (
                        <form onSubmit={handleSignup}>
                      
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email ID" required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                            <button type="submit" className="continuebtn">Continue</button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
                            <button type="submit" className="continuebtn">Continue</button>
                            <button onClick={handleGoogleLogin} className="continuebtn">Continue with Google</button>
                        </form>
                    )}

                   
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Registration;
