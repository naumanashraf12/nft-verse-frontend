import React from "react";
import { Button } from "react-bootstrap";
import { Navbar } from "../components";
import "./home.css";

const Avertise = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h3
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: "3rem",
            fontSize: "3rem",
          }}
        >
          Select Listing Package
        </h3>
        <div className="row mt-5 mb-5 justify-content-center ">
          <div className="col-md-3 box m-3">
            <div className="d-flex justify-content-center flex-column ">
              <h4
                className="text-center title"
                style={{ fontWeight: "bold", fontSize: "30px" }}
              >
                Common
              </h4>
              <p style={{ textAlign: "center", fontSize: "4rem" }}>
                0.2
                <span style={{ textAlign: "center", fontSize: "1rem" }}>
                  ETH
                </span>
              </p>

              <ul style={{}}>
                <li>Lifetime listing</li>
                <li>24h approval</li>
                <li>Tweet with custom image</li>
                <li>email support</li>
                <li className="dul">Unlimited edits</li>
                <li className="dul">Telegram support</li>
                <li className="dul">
                  7 days in promoted spot, shown in all pages.
                </li>
              </ul>
              <a
                style={{ margin: "auto" }}
                href="https://twitter.com/hypebearsclub"
              >
                <Button
                  className="buton"
                  style={{ margin: "auto", width: "200px" }}
                  variant="secondary"
                >
                  List Now
                </Button>
              </a>
            </div>
          </div>
          <div className="col-md-3 box m-3 ">
            <div className="d-flex justify-content-center flex-column">
              <h4
                className="text-center title"
                style={{ fontWeight: "bold", fontSize: "30px" }}
              >
                Best deal
              </h4>
              <p style={{ textAlign: "center", fontSize: "4rem" }}>
                0.6
                <span style={{ textAlign: "center", fontSize: "1rem" }}>
                  ETH
                </span>
              </p>

              <ul style={{}}>
                <li>Lifetime listing</li>
                <li>24h approval</li>
                <li>Tweet with custom image</li>
                <li>Unlimited edits</li>
                <li>email support</li>
                <li>Telegram support</li>
                <li>7 days in promoted spot, shown in all pages.</li>
              </ul>
              <a
                style={{ margin: "auto" }}
                href="https://twitter.com/hypebearsclub"
              >
                <Button
                  className="buton"
                  style={{ margin: "auto", width: "200px" }}
                  variant="secondary"
                >
                  List Now
                </Button>
              </a>
            </div>
          </div>
          <div className="col-md-3 box m-3">
            <div className="d-flex justify-content-center flex-column">
              <h4
                className="text-center title"
                style={{ fontWeight: "bold", fontSize: "30px" }}
              >
                Premium
              </h4>
              <p style={{ textAlign: "center", fontSize: "4rem" }}>
                0.4
                <span style={{ textAlign: "center", fontSize: "1rem" }}>
                  ETH
                </span>
              </p>
              <ul style={{}}>
                <li>Lifetime listing</li>
                <li>24h approval</li>
                <li>Tweet with custom image</li>
                <li>email support</li>
                <li>Unlimited edits</li>
                <li className="dul">Telegram support</li>
                <li className="dul">
                  7 days in promoted spot, shown in all pages.
                </li>
              </ul>
              <a
                style={{ margin: "auto" }}
                href="https://twitter.com/hypebearsclub"
              >
                <Button
                  className="buton"
                  style={{ margin: "auto", width: "200px" }}
                  variant="secondary"
                >
                  List Now
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-12" style={{ marginTop: "4rem" }}>
          <p style={{ color: "white" }}>
            {" "}
            © UpcomingNFT.com 2022. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
};

export default Avertise;
