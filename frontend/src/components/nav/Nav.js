import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faFolder } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Nav = () => {
  return (
    <nav>
      <div>
        <h1>File Uploading</h1>
      </div>
      <div>
        <button>
          <FontAwesomeIcon icon={faLocationDot} />
        </button>
        <button>
          <FontAwesomeIcon icon={faFolder} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
