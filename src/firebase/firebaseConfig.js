// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8LP-II0JxUlbIA6hxdRPM7XRGuLiZkVM",
  authDomain: "carspaceauth.firebaseapp.com",
  projectId: "carspaceauth",
  storageBucket: "carspaceauth.firebasestorage.app",
  messagingSenderId: "530332850351",
  appId: "1:530332850351:web:ef51609872c6473cc31c5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
// Import the necessary Firebase modules
// import { initializeApp } from "firebase/app";
// import { getFirestore, writeBatch, collection, doc } from "firebase/firestore"; // <-- Import missing functions
// import { getAuth } from "firebase/auth";

// Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA8LP-II0JxUlbIA6hxdRPM7XRGuLiZkVM",
//   authDomain: "carspaceauth.firebaseapp.com",
//   projectId: "carspaceauth",
//   storageBucket: "carspaceauth.firebasestorage.app",
//   messagingSenderId: "530332850351",
//   appId: "1:530332850351:web:ef51609872c6473cc31c5a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// export { app, db, auth };

// // Cars data
// const cars=[
//   {
//     "id": 201,
//     "name": "Hyundai Creta 2024",
//     "price": "₹ 10,00,999",
//     "priceRange": "10 - 15 Lakh",
//     "year": 2024,
//     "model": "Camry",
//     "fuelType": "Petrol/Diesel",
//     "mileage": "19-21 km/l",
//     "make": "Honda",
//     "Transmission": "Manual/Automatic",
//     "imageUrl": "https://www.financialexpress.com/wp-content/uploads/2024/01/Hyundai-Creta-reviuew-feature.jpg?resize=768,432",
//     "type": "new",
//     "description": "The all-new Hyundai Creta 2024 comes with a bold design, a digital cockpit, and ADAS features. It offers a spacious interior, premium upholstery, and multiple driving modes for enhanced performance.",
//     "enginetype": "1.5L Petrol / 1.5L Diesel",
//     "horsepower": 115,
//     "torque": "250 Nm",
//     "towing_capacity": "Not Available",
//     "trim": "SX(O)",
//     "body_type": "SUV",
//     "seating_capacity": 5,
//     "max_capacity": "5 passengers",
//     "city_mpg": 19,
//     "highway_mpg": 21,
//     "combined_mpg": 20,
//     "technology": "10.25-inch touchscreen, ADAS, 360-degree camera",
//     "safety": "6 airbags, ABS, ESP, Hill Assist",
//     "infotainment": "Android Auto, Apple CarPlay, Bose Sound System"
//   },
//   {
//     "id": 202,
//     "name": "Tata Harrier 2024",
//     "price": "₹ 15,99,999",
//     "priceRange": "15 - 20 Lakh",
//     "year": 2024,
//     "model": "Mustang",
//     "fuelType": "Diesel",
//     "mileage": "16-18 km/l",
//     "make": "Toyota",
//     "Transmission": "Manual/Automatic",
//     "imageUrl": "https://s7ap1.scene7.com/is/image/tatamotors/SunlitYellow-0?$PO-750-500-S$&fit=crop&fmt=avif-alpha",
//     "type": "new",
//     "description": "The 2024 Tata Harrier is a rugged and stylish SUV with a powerful diesel engine, premium interiors, and segment-first ADAS features. It offers a panoramic sunroof and ventilated seats for comfort.",
//     "enginetype": "2.0L Kryotec Diesel",
//     "horsepower": 170,
//     "torque": "350 Nm",
//     "towing_capacity": "2,000 kg",
//     "trim": "XZ+",
//     "body_type": "SUV",
//     "seating_capacity": 5,
//     "max_capacity": "5 passengers",
//     "city_mpg": 16,
//     "highway_mpg": 18,
//     "combined_mpg": 17,
//     "technology": "Digital cockpit, ADAS, Wireless charging",
//     "safety": "6 airbags, ESP, Lane Departure Warning",
//     "infotainment": "10-inch touchscreen, JBL Sound System"
//   },
//   {
//     "id": 203,
//     "name": "Maruti Suzuki Grand Vitara 2024",
//     "price": "₹ 22,57,000 ",
//     "priceRange": "20 - 35 Lakh",
//     "year": 2024,
//     "model": "Civic",
//     "fuelType": "Petrol/Hybrid",
//     "mileage": "21-27 km/l",
//     "make": "Maruti",
//     "Transmission": "Manual/Automatic",
//     "imageUrl": "https://auto.hindustantimes.com/_next/image?url=https%3A%2F%2Fimages.hindustantimes.com%2Fauto%2Fauto-images%2FMaruti%2Fgrandvitara%2Fexterior_maruti-grand-vitara_front-left-side_600x400.jpg&w=750&q=75",
//     "type": "new",
//     "description": "The 2024 Grand Vitara is a fuel-efficient hybrid SUV with an all-wheel-drive option. It offers premium interiors, an electric sunroof, and an advanced touchscreen system for a smart driving experience.",
//     "enginetype": "1.5L Smart Hybrid",
//     "horsepower": 103,
//     "torque": "136 Nm",
//     "towing_capacity": "Not Available",
//     "trim": "Alpha+",
//     "body_type": "SUV",
//     "seating_capacity": 5,
//     "max_capacity": "5 passengers",
//     "city_mpg": 21,
//     "highway_mpg": 27,
//     "combined_mpg": 24,
//     "technology": "360-degree camera, Head-Up Display",
//     "safety": "6 airbags, ESP, Hill Hold Assist",
//     "infotainment": "9-inch touchscreen, SmartPlay Pro+"
//   },
//   {
//     "id": 204,
//     "name": "Mahindra XUV700 2024",
//     "price": "₹ 20,00,000",
//     "priceRange": "15 - 20 Lakh",
//     "year": 2024,
//     "model": "XUV700",
//     "fuelType": "Petrol/Diesel",
//     "mileage": "15-18 km/l",
//     "make": "Honda",
//     "Transmission": "Manual/Automatic",
//     "imageUrl": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202401/65a550c273113-2024-mahindra-xuv700-151333813-16x9.jpg?size=948:533",
//     "type": "new",
//     "description": "The Mahindra XUV700 2024 is a tech-savvy SUV with segment-leading ADAS, a powerful engine, and a luxurious interior. It offers a large infotainment display, panoramic sunroof, and 7-seat configuration.",
//     "enginetype": "2.2L mHawk Diesel / 2.0L Turbo Petrol",
//     "horsepower": 200,
//     "torque": "380 Nm",
//     "towing_capacity": "2,500 kg",
//     "trim": "AX7 L",
//     "body_type": "SUV",
//     "seating_capacity": 7,
//     "max_capacity": "7 passengers",
//     "city_mpg": 15,
//     "highway_mpg": 18,
//     "combined_mpg": 16,
//     "technology": "ADAS Level 2, 12-inch touchscreen, Alexa Voice Control",
//     "safety": "7 airbags, ESP, Adaptive Cruise Control",
//     "infotainment": "Sony 3D Surround Sound, Wireless Android Auto/Apple CarPlay"
//   },
//   {
//     "id": 205,
//     "name": "Honda City 2024",
//     "price": "₹ 14,00,000",
//     "priceRange": "10 - 15 Lakh",
//     "year": 2024,
//     "model": "Mini Cooper",
//     "fuelType": "Petrol/Hybrid",
//     "mileage": "18-26 km/l",
//     "make": "Honda",
//     "Transmission": "Manual/Automatic",
//     "imageUrl": "https://imgd-ct.aeplcdn.com/664x415/n/ejn7bab_1649267.jpg?q=80",
//     "type": "new",
//     "description": "The 2024 Honda City is a premium sedan known for its reliability, refined engine, and feature-loaded cabin. It includes a hybrid variant for superior fuel efficiency and eco-friendly driving.",
//     "enginetype": "1.5L i-VTEC Petrol / 1.5L Hybrid",
//     "horsepower": 121,
//     "torque": "145 Nm",
//     "towing_capacity": "Not Available",
//     "trim": "ZX Hybrid",
//     "body_type": "Sedan",
//     "seating_capacity": 5,
//     "max_capacity": "5 passengers",
//     "city_mpg": 18,
//     "highway_mpg": 26,
//     "combined_mpg": 22,
//     "technology": "Honda Sensing, Digital Instrument Cluster",
//     "safety": "6 airbags, Lane Watch Camera, ABS with EBD",
//     "infotainment": "8-inch touchscreen, Alexa and Google Assistant Support"
//   }
// ];

// // Function to add cars to Firestore
// const addCarsToFirestore = async () => {
//   const batch = writeBatch(db);
//   const carsCollection = collection(db, "cars");

//   cars.forEach((car) => {
//     const docRef = doc(carsCollection, car.id.toString()); // Use car ID as document ID
//     batch.set(docRef, car);
//   });

//   try {
//     await batch.commit();
//     console.log("All cars added successfully!");
//   } catch (error) {
//     console.error("Error adding cars: ", error);
//   }
// };

// // Call the function
// addCarsToFirestore();
