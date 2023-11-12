import React from "react";
import UploadPage from "./pages/UploadPage";
import PreviewPage from "./pages/PreviewPage";
import Nav from "./components/nav/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/file/:city" element={<PreviewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
