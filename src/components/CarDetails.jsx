  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { db, auth } from "../firebase/firebaseConfig";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { useSelector } from "react-redux";
  import image1 from "../assets/images/landingpage/image1.png";
  import Header from "./Header";
  import "./CarDetails.css";
  import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


  const CarDetails = () => {
    


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    
    const { carId } = useParams();
    console.log("carId from useParams:", carId);
    const cars = useSelector((state) => state.searchcar.cars);
  //   const car = cars?.find((c) => c.id === carId);
  const car = cars?.find((c) => c.id === Number(carId));
    const [user, setUser] = useState(null);

    // Check Firebase Auth status
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
        setUser(loggedInUser);
      });
      return () => unsubscribe();
    }, []);

    const handleRequestCar = async () => {
      if (!user) {
        toast.info("Please Login to request the car.", { position: "top-right" });
        return;
      }
      if (!carId) {
        alert("Car ID is missing.");
        return;
      }
    
      if (!car) {
        toast.error("Car details not found.", { position: "top-right" });
        return;
      }
    
      try {
        const requestRef = doc(db, "carRequests", `${user.uid}_${carId}`);
    
        // Check if request already exists
        const requestSnapshot = await getDoc(requestRef);
        if (requestSnapshot.exists()) {
          toast.info("You have already requested this car.", { position: "top-right" });
          return;
        }
    
        let userName = user.displayName || "Anonymous";
    
        // Fetch the user's name from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
          userName = userDocSnapshot.data().name || user.email.split("@")[0];
        } else {
          userName = user.email.split("@")[0]; // Default to email username
        }
    
        await setDoc(requestRef, {
          carId,
          userId: user.uid,
          userName: userName, // Store the correct name
          userEmail: user.email,
          status: "Pending",
          carName: car.name,
          timestamp: new Date(),
        });
    
        toast.success("Request sent successfully!", { position: "top-right" });
    
      } catch (error) {
        console.error("Error requesting car:", error);
        alert("Failed to send request. Please try again.");
      }
    };
    

    return (
      <>
      <Header/>
      
  <ToastContainer position="top-right" autoClose={3000} />

        <div>
        {car ? (
          <>
            <div className="carlisting-container" style={{ backgroundImage: `url(${image1})` }}></div>
            <div className="car-search-title">
              <h1>{car.name}</h1>
            </div>

            <div className="car-features-box">
            {["Automatic", "Luxury", "Advanced", "High Safety"].map((feature, index) => (
                <button key={index} className="feature-button">{feature}</button>
              ))}
              <span className="car-details-price">Price: {car.price}</span> 
          </div>
          <div className="car-image-details"> 
            <div className="main-car-image">
              <img src={car.imageUrl} alt={car.name}  />
            </div>
              <div className="sub-car-image">
              <img src={car.imageUrl} alt={car.name}  />
              <img src={car.imageUrl} alt={car.name}  />
              <img src={car.imageUrl} alt={car.name}  />
              <img src={car.imageUrl} alt={car.name}  />
              <img src={car.imageUrl} alt={car.name}  />
              </div>
          </div>
          
        <div className="car-description">
          <div className="car-search-title">
            <h1>Description</h1>
          </div>
          <p>{car.description}</p>
          <div className="car-search-title">
            <h1>Car Overview</h1>
          </div>
          
        </div>

        <div className="car-overview-container">
          
          <div className="car-overview">
            <span>Engine Type:</span> {car.enginetype}
            <span>Horsepower:</span> {car.horsepower}
            <span>Torque:</span> {car.torque}
            <span>Towing Capacity:</span> {car.towing_capacity}
            <span>Trim:</span> {car.trim}
            <span>Body Type:</span> {car.body_type}
            <span>Seating Capacity:</span> {car.seating_capacity}
            <span>Max Capacity:</span> {car.max_capacity}
            <span>City MPG:</span> {car.city_mpg}
            <span>Combined MPG:</span> {car.combined_mpg}
            <span>Technology:</span> {car.technology}
            <span>Safety:</span> {car.safety}
            <span>Infotainment:</span> {car.infotainment}
          </div>
          
        
        {/* Right Side: Owner Profile Box */}
        <div className="owner-profile">
        {/* Buttons */}
        <button className="action-btn red-btn">Schedule Test Driver</button>
        <button className="action-btn white-btn" onClick={handleRequestCar}>Request Car</button>

        {/* Owner Profile Card */}
        <div className="profile-card">
          {/* Owner Avatar */}
          <div className="avatar"></div>

          {/* Owner Name */}
          <h3 className="owner-name">Name</h3>
          <p className="owner-role">Owner of Car</p>

          {/* Input Fields */}
          <div className="input-fields">
            <label>Name</label>
            <input type="text" placeholder="Name" />

            <label>Email Address</label>
            <input type="email" placeholder="Email Address" />

            <label>Phone number</label>
            <input type="tel" placeholder="Phone number" />

            <label>Description</label>
            <textarea placeholder="Description"></textarea>
          </div>

          {/* Contact Button */}
          <button className="contact-btn">Send message</button>
        </div>
      </div>
      </div>
          
          </>
        ) : (
          <h2>Car details not found.</h2>
        )}
      </div>
      </>
    );
  };

  export default CarDetails;
