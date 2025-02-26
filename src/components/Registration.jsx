// import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
// import { db, auth } from "../firebase/firebaseConfig";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Registration.css";
// import image2 from "../assets/images/registration/image2.png";
// import image1 from "../assets/images/registration/image1.png";

// const Registration = () => {
//     const [name, setName] = useState(""); // Fixed missing state
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [isSignup, setIsSignup] = useState(false);
//     const navigate = useNavigate();

//     // Function to Assign Role on Signup
//     const handleSignup = async (e) => {
//         e.preventDefault(); // Prevent page reload
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Assign role (default is 'user')
//             await setDoc(doc(db, "users", user.uid), {
//                 name: name,
//                 email: user.email,
//                 role: "user"
//             });

//             console.log("Signup successful!");
//             navigate("/user");
//         } catch (error) {
//             console.error("Signup error:", error.message);
//             setError(error.message);
//         }
//     };

//     // Login Function
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Fetch user role
//             const userDoc = await getDoc(doc(db, "users", user.uid));
//             if (userDoc.exists()) {
//                 const role = userDoc.data().role;
//                 localStorage.setItem("role", role);
//                 console.log("Logged in as:", role);

//                 // Redirect based on role
//                 navigate(role === "admin" ? "/admin" : "/user");
//             } else {
//                 setError("User role not found, please contact support.");
//             }
//         } catch (error) {
//             console.error("Login error:", error.message);
//             setError(error.message);
//         }
//     };

//     // Google Login Function
//     const handleGoogleLogin = async () => {
//         try {
//             const provider = new GoogleAuthProvider();
//             const userCredential = await signInWithPopup(auth, provider);
//             const user = userCredential.user;

//             // Check if user exists in Firestore
//             const userDoc = await getDoc(doc(db, "users", user.uid));
//             if (userDoc.exists()) {
//                 const role = userDoc.data().role;
//                 localStorage.setItem("role", role);
//                 console.log("Google login successful as:", role);
//                 navigate(role === "admin" ? "/admin" : "/user");
//             } else {
//                 // If user is not found, register them with a default role
//                 await setDoc(doc(db, "users", user.uid), {
//                     name: user.displayName || "User",
//                     email: user.email,
//                     role: "user"
//                 });
//                 navigate("/user");
//             }
//         } catch (error) {
//             console.error("Google login error:", error.message);
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="registration-container" style={{ backgroundImage: `url(${image2})` }}>
//             <div className="loginsignup-container">
//                 <div className="loginsignup-right" style={{ backgroundImage: `url(${image1})` }}></div>

//                 <div className="loginsignup-left">
//                     <div className="loginsignup-left-top">
//                       <h1>Car<span>space</span></h1>
//                      {/* <div className="button-group">
//                         <button onClick={() => setIsSignup(false)} className={!isSignup ? "active" : ""}>
//                             Log In
//                         </button>
//                         <button onClick={() => setIsSignup(true)} className={isSignup ? "active" : ""}>
//                             Sign Up
//                         </button>
//                     </div> */}
//                       <div className="search-toggles">
//                                 <button onClick={() => setIsSignup(false)} className={!isSignup ? "active" : ""}>
//                                   Login
//                                 </button>
//                                 <button onClick={() => setIsSignup(true)} className={isSignup ? "active" : ""}>
//                                   Sign Up
//                                 </button>
//                      </div>
//                     </div>

//                     {isSignup ? (
//                         <form onSubmit={handleSignup}>
                      
//                             <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your Name" required />
//                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email ID" required />
//                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
//                             <button type="submit" className="continuebtn">Continue</button>
//                         </form>
//                     ) : (
//                         <form onSubmit={handleLogin}>
//                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
//                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
//                             <button type="submit" className="continuebtn">Continue</button>
//                             <button onClick={handleGoogleLogin} className="continuebtn">Continue with Google</button>
//                         </form>
//                     )}

                   
//                     {error && <p>{error}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Registration;
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import React Toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles
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

            toast.success("Signup successful!"); // Show success toast
            setTimeout(() => navigate("/user"), 2000); // Redirect after 2 seconds
        } catch (error) {
            // if (error.code === "auth/email-already-in-use") {
            //     setError("Email already in use. Try logging in.");
            // } else if (error.code === "auth/weak-password") {
            //     setError("Password should be at least 6 characters long.");
            // } else {
            //     setError("Registration failed. Please try again.");
            // }
            toast.error(error.message); // Show error toast
        }
    };

    // Login Function
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors before new attempt
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Fetch user role
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const role = userDoc.data().role;
                localStorage.setItem("role", role);
                toast.success("Login successful!"); // Show success toast
                setTimeout(() => navigate(role === "admin" ? "/admin" : "/user"), 2000);
            } else {
                setError("User role not found, please contact support.");
                toast.error("User role not found, please contact support.");
            }
        } catch (error) {
            console.error("Login error:", error.code);
            if (error.code === "auth/user-not-found") {
                setError("No account found with this email. Please sign up.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else if (error.code === "auth/invalid-email") {
                setError("Invalid email format. Please enter a valid email.");
            } else {
                toast.error("Login failed. Please try again.");
            }
            
        }
    };
    
    // Google Login Function
    const handleGoogleLogin = async () => {
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const role = userDoc.data().role;
                localStorage.setItem("role", role);
                toast.success("Google login successful!");
                setTimeout(() => navigate(role === "admin" ? "/admin" : "/user"), 2000);
            } else {
                // If user is not found, register them with a default role
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName || "User",
                    email: user.email,
                    role: "user"
                });
                toast.success("Google login successful!");
                setTimeout(() => navigate("/user"), 2000);
            }
        } catch (error) {
            toast.error("Google login failed. Please try again.");
        }
    };

    return (
        <div className="registration-container" style={{ backgroundImage: `url(${image2})` }}>
            <ToastContainer /> {/* Toast Container for notifications */}
            <div className="loginsignup-container">
                <div className="loginsignup-right" style={{ backgroundImage: `url(${image1})` }}></div>

                <div className="loginsignup-left">
                    <div className="loginsignup-left-top">
                      <h1>Car<span>space</span></h1>
                      <div className="search-toggles">
                                <button onClick={() => { setIsSignup(false); setError(""); }} className={!isSignup ? "active" : ""}>
                                  Login
                                </button>
                                <button onClick={() => { setIsSignup(true); setError(""); }} className={isSignup ? "active" : ""}>
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
                            <button type="button" onClick={handleGoogleLogin} className="continuebtn">Continue with Google</button>
                        </form>
                    )}

                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Registration;
