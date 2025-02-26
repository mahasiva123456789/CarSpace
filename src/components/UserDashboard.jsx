import React, { useState } from "react";
import image1 from '../assets/images/landingpage/image1.png';
import "./userlandingpage.css";
import Header from "./Header";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: 'Sedan', imgSrc: 'https://s3-alpha-sig.figma.com/img/d263/76ee/c21122a0144a4e0388759e80ed2bd5e2?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DrE510Wr~S~BLPBC93eu~XhLAdy1sW92Y~zhzlgyh2QyTu7~wB~Dl3bPkfc~tx5CTOUq7HDiVoOB-6qkcQZQPUaj8nMKmOPSUgdr2mG8RqyDTw-9LfL0gkgHnkz0Wn9aQ-jxXQKXFl2G0ooprMyc9OTS9jDvvkmsiYUToO7QV2RFk1910wFGXs3g2HIXosXCyPLamzWK0gc8ylB9moqJFE8buuiYc5sQc0npUidURusLquLB4tTq52PStWXTL5AQdrsOEzSf06-3nt7jP8r2Uhz4bFhmN1cuMXp-ZmQIy2fiDkZO66BT9jGbTBUtAnpDf7X49W9wVA1fOHZKic7tvw__' },
    { name: 'Campers', imgSrc: 'https://s3-alpha-sig.figma.com/img/5e04/fae0/d22cee5d2e778223eac233270d60a20a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=L6Zr8plThNtJl3CMUagJKIniCygYvjMDTw4UFcarWDp~8zKNBcO8I2Fa9qHXaKZ9izZyEwZWY3tVeA~NpLaioipUqP1sTzhqCWRZfeA23kscYsX7QftFrYAHR~KnzJcxtIAPksDcFUmvdkD1SupAadlftEEgzakx87IVeWMBL3gOKYJJ24El6knIT2YxSMH~MIxeawQpvOZuMDhGf4FFKiknAKmI5-HDbir1X0mXE-uS-bJ7oq2xrdNAZpIzSKZVneL2GHCcm8~w7fYm7jWJ9wCTK8bDyYp-XxENBy~i6VAP0A9Ck41WjeB16E1rFRf0hBhaNAdFteAsGyUOh0UhDQ__' },
    { name: 'Cabriolet', imgSrc: 'https://s3-alpha-sig.figma.com/img/5773/e5df/76526f2841b9a97b42bb46a6d16a5d56?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lzIVYZCz4bl18pK4H155QAX3R-jCWU9oP42d9TGqHPg4Jbz5ass~~V-HB6ABuczQybQwTdhhh8b9Ta5Za1zELj-7cp8IQzp1shL7BZZe4YwUId56HZ9kUz4IsknRbDY3cdcxxIljQXs82st01vmOF~rxBukqCycaT9VNIM3AW57RzrTrp25lKu3oNb91uT3CzSPsDCT4TsGp3QXkESyRVI6CLCd0kPjKtmyUDsGUqYlGK2gjbPJtp8DgEj7l9LXc6CxvHxdp4C-8UCQ1pI~aY3fxvRE8GQahcGXzpPbzg6uH6FellT7PWbKLG4YmwxEo3ZdOJXn4rHhx2MaZcCiDcA__' },
    { name: 'Pickup', imgSrc: 'https://s3-alpha-sig.figma.com/img/5773/e5df/76526f2841b9a97b42bb46a6d16a5d56?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lzIVYZCz4bl18pK4H155QAX3R-jCWU9oP42d9TGqHPg4Jbz5ass~~V-HB6ABuczQybQwTdhhh8b9Ta5Za1zELj-7cp8IQzp1shL7BZZe4YwUId56HZ9kUz4IsknRbDY3cdcxxIljQXs82st01vmOF~rxBukqCycaT9VNIM3AW57RzrTrp25lKu3oNb91uT3CzSPsDCT4TsGp3QXkESyRVI6CLCd0kPjKtmyUDsGUqYlGK2gjbPJtp8DgEj7l9LXc6CxvHxdp4C-8UCQ1pI~aY3fxvRE8GQahcGXzpPbzg6uH6FellT7PWbKLG4YmwxEo3ZdOJXn4rHhx2MaZcCiDcA__' },
    { name: 'Supercar', imgSrc: 'https://s3-alpha-sig.figma.com/img/d263/76ee/c21122a0144a4e0388759e80ed2bd5e2?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DrE510Wr~S~BLPBC93eu~XhLAdy1sW92Y~zhzlgyh2QyTu7~wB~Dl3bPkfc~tx5CTOUq7HDiVoOB-6qkcQZQPUaj8nMKmOPSUgdr2mG8RqyDTw-9LfL0gkgHnkz0Wn9aQ-jxXQKXFl2G0ooprMyc9OTS9jDvvkmsiYUToO7QV2RFk1910wFGXs3g2HIXosXCyPLamzWK0gc8ylB9moqJFE8buuiYc5sQc0npUidURusLquLB4tTq52PStWXTL5AQdrsOEzSf06-3nt7jP8r2Uhz4bFhmN1cuMXp-ZmQIy2fiDkZO66BT9jGbTBUtAnpDf7X49W9wVA1fOHZKic7tvw__' },
    { name: 'Minivans', imgSrc: 'https://s3-alpha-sig.figma.com/img/f687/e9e9/88f05ae18d7f906fe868ab465c42ffd2?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WtEkFWJGU1EFL4hK-uUnTJyqia3hqlWf82~dGkvOfjgE3RSYfHeJlBr0ZOe-FFTzO9QsCVYUiLIYw91FCOeA2Hs8f5PTjJammtk2CmuadOotpJd~2Z-odkaUR3Rn0PzKsDZx0zmcJR6VcMxxQHf4-t-9klzE2OQHxKNd8fUOQJnIvDzwup-KQSugAEQOZJblJs~C~gGkoOGFubJcqQrKVplXSslUWOBPQLFoQT1oYu4djXtmmPxbrGRtjPuzSScFE-c2IWrPEkMwA3ndAEygBqAces9pR~Bm3oenKMkVTs1F6b8rOUxeIrK3l2n99Jh5jjIqweDajnlikuNYEXv6Vw__' }
  ];

const RangeSlider = ({ price, handleSliderChange }) => {
    return (
        <div className="sliders-container">
            <input
                type="range"
                min="1000"
                max="5000"
                value={price}
                onChange={handleSliderChange}
                className="sliders"
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
    const navigate = useNavigate(); // Hook for navigation

    const handleBookCarClick = () => {
        navigate("/usedcar"); // Redirects to Used Cars page
    };

    return (
        <>
            <Header />
            <div className="landingpage-container" style={{ backgroundImage: `url(${image1})` }}>
                {/* Left Quote Section */}
                <div className="quote-container">
                    <h1>Find Quality-Assured  Cars <br /> Tailored to Your Budget <br />and Preferences</h1>
                    <p>Browse a wide range of certified used cars from trusted dealers <br />and private sellers</p>
                    <button className="book-button" onClick={handleBookCarClick}>Book My Car</button>
                    
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
                        <button className="search-button1" onClick={handleBookCarClick}>2334 Cars</button>
                    </div>
                </div>
            </div>

 
        </>
    );
};

export default UserDashboard;
