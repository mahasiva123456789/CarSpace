# 🚗 CarSpace - Second-Hand Car Buying & Selling Platform

## 📌 Objective
Develop a web-based application to facilitate the buying and selling of second-hand cars.

## 🛠️ Technology Stack
- **Frontend:** React (Redux used for state management)
- **Database:** Firestore (Firebase)
- **Authentication:** Google Auth
- **Backend:** Not required

## 🔑 Features
### Common Features
- **Authentication:** Google Authentication

### 🔹 Admin Role
- Add, update, and delete car listings.
- Manage car pricing.
- View and process purchase requests.
- Admin Access: A user becomes an admin if their role is set to "admin" in Firestore.

### 🔹 User Role
- Search for available second-hand cars.
- Request to purchase a car.


## 🌐 Live Demo
[Click here to view the deployed app](https://carspaceauth.web.app/)

## 📦 Project Setup

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/mahasiva123456789/CarSpace.git
   ```  
2. **Navigate to the project folder:**  
   ```sh
   cd CarSpace
   ```  
3. **Install dependencies:**  
   ```sh
   npm install
   ```  
4. **Start the development server:**  
   ```sh
   npm run dev
   ```  
5. **Build for production (optional):**  
   ```sh
   npm run build
   ```  

## 📁 Folder Structure
```
CarSpace/
│── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components (Home, Listing, etc.)
│   ├── redux/         # Redux state management
│   ├── firebase/      # Firebase configuration
│   ├── App.js         # Main App component
│   ├── main.jsx       # Entry point
│── public/
│── package.json
│── vite.config.js
│── README.md
```

