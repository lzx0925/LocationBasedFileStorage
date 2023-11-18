import React, { useEffect, useState } from "react";
import "./style.css";
import { Oval } from "react-loading-icons"; // Import the loading icon you want to use

const Location = ({ city, handleCity, handleModify, inputVibrate }) => {
  const [manual, setManual] = useState();
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(true);
  const [vibrate, setVibrate] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || null
            handleCity(city);
            setInput(city);
            setLoading(false);
          });
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    handleModify(loading);
  }, [loading]);
  useEffect(() => {
    manual !== undefined && handleModify(manual);
  }, [manual]);

  const handleChange = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          input
        )}&format=json`
      );
      const data = await response.json();
      const cityExists = data.some(
        (location) =>
          location.name && location.name.toLowerCase() === input.toLowerCase()
      );

      if (cityExists) {
        const formattedName =
          input.length >= 1
            ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
            : input;
        handleCity(formattedName);
        setInput(formattedName);
        setManual(!manual);
      } else {
        setVibrate(true);
        setTimeout(() => setVibrate(false), 500);
      }
    } catch (error) {
      console.error("Error validating city: ", error);
    }
  };

  return (
    <div id="location" className={inputVibrate ? "vibrate-animation" : ""}>
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
            className={vibrate ? "vibrate-animation" : ""}
            id="location-input"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your current city"
            defaultValue={city}
            disabled={!manual}
          />
        </div>
      )}
      <div>
        {manual && (
          <button className="third-button" onClick={() => handleChange()}>
            Change
          </button>
        )}
        <button
          className="hyperlink-button"
          onClick={() => setManual(!manual)}
          disabled={loading}
          style={loading ? { visibility: "hidden" } : {}}
        >
          {!manual ? "Not correct? Input manually." : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default Location;
