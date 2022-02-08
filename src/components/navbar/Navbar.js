import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
// import { useSelector } from "react-redux";

const Menu = () => (
  <>
    <p className="hov">
      <Link to="/">HOME</Link>
    </p>
    <p className="hov">
      <Link to="/upcoming">UPCOMING</Link>
    </p>

    <p className="hov">
      <Link to="/advertise">ADVERTISE-AD</Link>
    </p>
    <p className="hov">
      <Link to="/amount">SUBMITNFT</Link>
    </p>
  </>
);
const Navbar = () => {
  const navigate = useNavigate();
  const [Toggle, setToggle] = useState(false);
  return (
    <div className="gpt3__navbar" style={{ background: "#0B0C10" }}>
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          {/* <img src={priceGetter} alt="logo" /> */}
          <h2 style={{ color: "#fff", fontWeight: "bold", fontSize: "2.5rem" }}>
            NFT.Verse.art
          </h2>
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
          <a
            href="https://discord.gg/UgZRh5tR"
            style={{
              marginLeft: "10px",
            }}
          >
            <FaDiscord style={{ width: "25px", height: "25px" }} />
          </a>
        </div>
      </div>
      <div className="gpt__navbar-menu">
        {Toggle ? (
          <BsXLg size={26} color="#fff" onClick={() => setToggle(false)} />
        ) : (
          <BsList size={26} color="#fff" onClick={() => setToggle(true)} />
        )}
        {Toggle && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <Menu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
