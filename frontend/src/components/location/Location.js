import React, { useEffect, useState } from "react";
import "./style.css";
import { Oval } from "react-loading-icons"; // Import the loading icon you want to use

const Location = () => {
  const [location, setLocation] = useState();
  const [manual, setManual] = useState(false);
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(latitude, longitude);
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setLocation(data.address);
            setLoading(false); // Set loading to false once the location is fetched
          });
      },
      (err) => {
        console.error(err);
        setLoading(false); // Also set loading to false in case of an error
      }
    );
  }, []);

  return (
    <div id="location">
      <p>Located at</p>
      {loading ? (
        <div id="buffer">
          <Oval stroke="#6c757d" height="15" width="15" />
          <p>locating your position...</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            className="location-input"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your current city"
            defaultValue={location?.city || city || "Not available"}
            disabled={!manual}
          />
        </div>
      )}
      <div>
        {manual && (
          <button
            className="third-button"
            onClick={() => {
              setLocation({ ...location, city: city });
              setManual(!manual);
            }}
          >
            Change
          </button>
        )}
        <button className="hyperlink-button" onClick={() => setManual(!manual)}>
          {!manual
            ? "Not correct? Input manually."
            : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default Location;
