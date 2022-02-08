import React, { useEffect } from "react";
import "./home.css";

import { Footer, Navbar } from "../components";

import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import Loader from "../components/loader/Loader";
import Twitter from "../assets/images/Twitter";
import { MdWebAsset } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [imgs, setimgs] = useState([]);
  const [loading, setloading] = useState(true);
  const [featured, setfeatured] = useState([]);
  const [coming, setcoming] = useState([]);
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
    const images1 = url;
    const images2 = url2;
    const images3 = url3;
    // const images4 = `http://localhost:1337${url4}`;

    setimgs([images1, images2, images3]);
  };
  const nfts = async () => {
    const {
      data: { newdata },
    } = await axios.get("https://nft-backen.herokuapp.com/data");

    console.log(newdata);

    var filterd = newdata.filter((val) => {
      const d = new Date(val["saleDate"]);
      if (!isNaN(d.getTime())) {
        // d.valueOf() could also work
        // date is not valid
        return true;
      }
    });
    var sorteddata = filterd.sort(function (a, b) {
      var c = new Date(a["saleDate"]);
      var d = new Date(b["saleDate"]);
      return c - d;
    });
    console.log(sorteddata);

    setcoming([sorteddata[0], sorteddata[1], sorteddata[2], sorteddata[3]]);
    console.log(coming);
  };
  const featurednfts = async () => {
    const {
      data: { data },
    } = await axios.get(
      "https://nft-verse1.herokuapp.com/api/featurednfts?populate=images"
    );

    setfeatured(data);
    setloading(false);
  };

  useEffect(() => {
    ads();
    nfts();
    featurednfts();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Navbar />
            <div className="row g-0" style={{ backgroundColor: "white" }}>
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
                <div className="d-flex flex-column justify-content-center mb-5">
                  <div>
                    <h3
                      style={{
                        color: "black",
                        padding: "2rem 2rem 0 2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Featured Collections:
                    </h3>
                    <p
                      style={{
                        color: "black  ",
                        padding: "0 2rem 2rem 2rem ",
                        fontWeight: "bold",
                      }}
                    >
                      Selected by the team
                    </p>

                    <div
                      className="row g-0 justify-content-center"
                      style={{ width: "100%" }}
                    >
                      {featured.map((val) => (
                        <div className="col-md-3 col-sm-6 box1 m-3 justify-content-between ">
                          <p
                            style={{
                              margin: "0 0 0 5px",
                              fontStyle: "italic",
                              color: "orange",
                            }}
                          >
                            featured
                          </p>
                          <div className="d-flex align-content-center">
                            {val.attributes.images.data.map((value) => (
                              <img
                                style={{
                                  width: "70px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginLeft: "5px",
                                }}
                                src={value.attributes.formats.small.url}
                                alt=" "
                              />
                            ))}
                            <div>
                              <h5 style={{ marginLeft: "10px" }}>
                                {val.attributes.blockchain}
                              </h5>

                              <h5 style={{ margin: "10px 0 0 10px" }}>
                                {val.attributes.mintPrice}
                              </h5>
                            </div>
                          </div>
                          <p
                            style={{
                              margin: "5px 0 5px 5px",
                              color: "grey",
                              lineHeight: "20px",
                              fontSize: "18px",
                            }}
                          >
                            {val.attributes.projectDescription}
                          </p>
                          <div className="d-flex align-content-center icons">
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                margin: "0 0 0 5px",
                              }}
                            >
                              PreSale Date: {val.attributes.presaleDate}
                            </p>
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                margin: "0 0 0 5px",
                              }}
                            >
                              Sale Date: {val.attributes.saleDate}
                            </p>
                          </div>
                          <div className="d-flex  icons">
                            <a
                              href={val.attributes.twitter}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <Twitter style={{ width: "10px" }} />
                            </a>
                            <a
                              href={val.attributes.discord}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <FaDiscord
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "black",
                        padding: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Upcoming Collections:
                    </h3>
                  </div>
                  <div className="row justify-content-center mb-5">
                    {coming.map((val) => (
                      <div className="col-md-11 box2 mt-3 ">
                        <div className="d-flex flex-column flex-sm-row justify-content-between  mt-2  ">
                          <div className="d-flex flex-column flex-sm-row">
                            <div>
                              <img
                                style={{
                                  width: "80px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginLeft: "5px",
                                }}
                                src={`https://upcoming.images.rarity.tools/${val.id}_1?width=70&height=100&optimizer=image`}
                                alt=""
                              />
                              <img
                                style={{
                                  width: "80px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginLeft: "5px",
                                }}
                                src={`https://upcoming.images.rarity.tools/${val.id}_2?width=70&optimizer=image`}
                                alt=""
                              />
                            </div>
                            <div>
                              <p
                                style={{
                                  verticalAlign: "center",
                                  margin: "0 0 0 10px",
                                  fontSize: "30px",
                                  fontWeight: "bold",
                                }}
                              >
                                {val.Project}
                              </p>
                              <p
                                style={{
                                  verticalAlign: "center",
                                  margin: "0 0 0 10px",
                                }}
                              >
                                {val["description"]}
                              </p>
                              <p
                                style={{
                                  verticalAlign: "center",
                                  margin: "0 0 0 10px",
                                }}
                              >
                                Price: {val.Price} ETH
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 icons">
                            <p
                              style={{
                                verticalAlign: "center",
                                margin: "0 0 0 10px",
                              }}
                            >
                              Sale Date:
                              {new Date(val["saleDate"]).toLocaleString(
                                "en-US",
                                { timeZone: "Asia/Jakarta" }
                              )}
                            </p>
                            <p
                              style={{
                                verticalAlign: "center",
                                margin: "0 0 0 10px",
                              }}
                            >
                              Listed Date:
                              {new Date(val["presaleDate"]).toLocaleString(
                                "en-US",
                                { timeZone: "Asia/Jakarta" }
                              )}
                            </p>
                            <a
                              href={val.Discord}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <FaDiscord
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                            <a
                              href={`https://twitter.com/${val.TwitterId}`}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <Twitter
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                            <a
                              href={val.Website}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <MdWebAsset
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    style={{ margin: "auto", width: "200px" }}
                    className="otherbutton"
                    onClick={() => {
                      navigate("/upcoming");
                    }}
                  >
                    View More
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

export default Home;
