import React, { useEffect } from "react";
import "./home.css";

import { Footer, Navbar } from "../components";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import Loader from "../components/loader/Loader";
import Twitter from "../assets/images/Twitter";
import { FaDiscord } from "react-icons/fa";

const AmountPage = () => {
  const navigate = useNavigate();
  const [imgs, setimgs] = useState([]);
  const [loading, setloading] = useState(true);
  const ads = async () => {
    const {
      data: { data },
    } = await axios.get(
      "https://nft-verse1.herokuapp.com/api/advertisements?populate=images"
    );

    const url = data[0].attributes.images.data[0].attributes.formats.large.url;
    const url2 = data[0].attributes.images.data[1].attributes.formats.large.url;
    const url3 = data[0].attributes.images.data[2].attributes.formats.large.url;
    // const url4 = data[0].attributes.images.data[3].attributes.formats.large.url;
    console.log(url);
    const images1 = { url };
    const images2 = { url2 };
    const images3 = { url3 };
    // const images4 = `http://localhost:1337${url4}`;

    setimgs([images1, images2, images3]);
    setloading(false);
  };

  useEffect(() => {
    ads();

    // featurednfts();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Navbar />
            <div className="row g-0">
              <div
                className="col-md-12"
                style={{ height: "200px", objectFit: "cover" }}
              >
                <img
                  src={imgs[2]}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
              <div className="col-md-2">
                <img
                  src={imgs[0]}
                  style={{ width: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <div className="d-flex h-50 ">
                  <Button
                    className="otherbutton"
                    style={{
                      margin: "auto",
                      width: "200px",
                      height: "70px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      navigate("/submit");
                    }}
                  >
                    Published your NFT for 0.5 ETH
                  </Button>
                </div>
              </div>

              <div className="col-md-2">
                <img
                  src={imgs[1]}
                  style={{ width: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AmountPage;
