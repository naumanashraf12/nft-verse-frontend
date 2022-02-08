import React from "react";
import Home from "./Pages/Home";
import Avertise from "./Pages/Avertise";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SubmitNft from "./Pages/SubmitNft";
import Upcoming from "./Pages/Upcoming";
import AmountPage from "./Pages/AmountPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advertise" element={<Avertise />} />
          <Route path="/submit" element={<SubmitNft />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/amount" element={<AmountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
