import React from "react";
import UploadPage from "./pages/UploadPage";
import Nav from "./components/nav/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <UploadPage/>
    </div>
  );
}

export default App;
