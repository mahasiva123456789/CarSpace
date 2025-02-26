import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import "./Managelisting.css"
import { Link }  from "react-router-dom";
import Addcar from "./Addcar";
import { FaEdit, FaTrash } from "react-icons/fa";



const ManageListing = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [showAddCar, setShowAddCar] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const carCollection = collection(db, "cars");
    const carSnapshot = await getDocs(carCollection);
    const carList = carSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCars(carList);
  };

  const handleDelete = async (id) => {
    if (!id || typeof id !== "string") {
      console.error("Invalid document ID:", id);
      id = String(id);
    }
  
    try {
      await deleteDoc(doc(db, "cars", id));
      alert("Car deleted successfully!");
      fetchCars();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  
  const handleEdit = (car) => {
    setEditingCar((car.id));
    setUpdatedData(car);
  };

  const handleUpdate = async () => {
    if (!editingCar) {
      console.error("Invalid document ID:", editingCar);
      return;
    }
  
    try {
      const carRef = doc(db, "cars", String(editingCar));
      await updateDoc(carRef, updatedData);
      alert("Car updated successfully!");
      setEditingCar(null);
      fetchCars();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="listing-container">
      {showAddCar ? (
        <div>
          {/* <button className="btn-go-back" onClick={() => setShowAddCar(false)}>Go Back</button> */}
          <Addcar />
        </div>
      ) : (
        <div>
          <div className="listing-header">
            <h2 className="listing-title">Car Listings</h2>
            <button className="btn-add-car" onClick={() => setShowAddCar(true)}>Add Car</button>
          </div>
          <div className="cars-grid">
            {cars.map((car) => (
              <div key={car.id} className="cars-item">
                {car.featured && <div className="badge-featured">Featured</div>}
                <img className="cars-image" src={car.imageUrl || "https://via.placeholder.com/300"} alt={car.name} />
                <div className="cars-details">
                  <p className="cars-name">{car.name}</p>
                  <h3 className="cars-model">{car.model} {car.year}</h3>
                  <p className="cars-price">{car.price}</p>
                  <div className="cars-specs">
                    <span>Fuel Type: {car.fuelType}</span>
                    <span>Mileage: {car.mileage} km/l</span>
                    <span>Transmission: {car.Transmission}</span>
                  </div>
                </div>
                <div className="action-buttons">
                  {editingCar === car.id ? (
                    <div className="edit-form">
                      <input className="input-field" type="text" name="name" value={updatedData.name} onChange={handleChange} />
                      <input className="input-field" type="text" name="model" value={updatedData.model} onChange={handleChange} />
                      <input className="input-field" type="number" name="year" value={updatedData.year} onChange={handleChange} />
                      <button className="btn-update" onClick={handleUpdate}>Update</button>
                      <button className="btn-cancel" onClick={() => setEditingCar(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="buttons">
                    <FaEdit className="icon-edit" onClick={() => handleEdit(car)} />
                    <FaTrash className="icon-delete" onClick={() => handleDelete(car.id)} />
                  </div>
                  
                  
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListing;
