import React, { useState } from "react";
import image1 from '../assets/images/landingpage/image1.png';
import "./userlandingpage.css";
import Header from "./Header";
import { FaStar } from "react-icons/fa";

const RangeSlider = ({ price, handleSliderChange }) => {
    return (
        <div className="slider-container">
            <input
                type="range"
                min="1000"
                max="5000"
                value={price}
                onChange={handleSliderChange}
                className="slider"
                style={{
                   
                    background: `linear-gradient(to right,rgb(233, 48, 79) 0%,rgb(241, 72, 100) ${
                        ((price - 1000) / (5000 - 1000)) * 100
                    }%, #ddd ${((price - 1000) / (5000 - 1000)) * 100}%, #ddd 100%)`,
                }}
            />
            <div className="price-value">₹{price}</div>
           
        </div>
    );
};

const UserDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("New Cars");
    const [price, setPrice] = useState(1000);

    const handleSliderChange = (event) => {
        setPrice(event.target.value);
    };

    return (
        <>
            <Header />
            <div className="landingpage-container" style={{ backgroundImage: `url(${image1})` }}>
                {/* Left Quote Section */}
                <div className="quote-container">
                    <h1>Find Quality-Assured  Cars <br /> Tailored to Your Budget <br />and Preferences</h1>
                    <p>Browse a wide range of certified used cars from trusted dealers <br />and private sellers</p>
                    <button className="book-button">Book My Car</button>
                    
                    {/* Star Rating */}
                    <div className="rating-container">
                        <div className="stars">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        </div>
                        <p className="rating-text">Working with 50+ Happy members</p>
                    </div>
                </div>

                {/* Right Search Container */}
                <div className="search-container">
                    <div className="search-box">
                        {/* Tabs for New & Used Cars */}
                        <div className="search-tabs">
                            <button 
                                className={selectedTab === "New Cars" ? "active-tab" : ""}
                                onClick={() => setSelectedTab("New Cars")}
                            >
                                New Cars
                            </button>
                            <button 
                                className={selectedTab === "Used Cars" ? "active-tab" : ""}
                                onClick={() => setSelectedTab("Used Cars")}
                            >
                                Used Cars
                            </button>
                        </div>

                        {/* Input Fields */}
                        <input type="text" placeholder="Make" />
                        <input type="text" placeholder="Models" />

                        {/* Range Slider */}
                        <RangeSlider price={price} handleSliderChange={handleSliderChange} />

                        <input type="text" placeholder="Body" />
                        <button className="search-button">2334 Cars</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
