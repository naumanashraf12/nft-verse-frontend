import React, { useEffect } from "react";
import "./home.css";

import { Footer, Navbar } from "../components";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";

import Loader from "../components/loader/Loader";
import Twitter from "../assets/images/Twitter";
import { FaDiscord } from "react-icons/fa";
import { MdWebAsset } from "react-icons/md";

const Upcoming = () => {
  const [imgs, setimgs] = useState([]);
  const [loading, setloading] = useState(true);
  const [featured, setfeatured] = useState([]);
  const [search, setsearch] = useState("");
  const [coming, setcoming] = useState([]);
  const [searched, setsearched] = useState(false);

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
    const { data } = await axios.get(
      "https://collections.rarity.tools/upcoming2"
    );

    var filterd = data.filter((val) => {
      const d = new Date(val["Sale Date"]);
      if (!isNaN(d.getTime())) {
        // d.valueOf() could also work
        // date is not valid
        return true;
      }
    });
    var sorteddata = filterd.sort(function (a, b) {
      var c = new Date(a["Sale Date"]);
      var d = new Date(b["Sale Date"]);
      return c - d;
    });

    setcoming(sorteddata);
    setloading(false);
  };
  const featurednfts = async () => {
    const {
      data: { data },
    } = await axios.get(
      "https://nft-verse1.herokuapp.com/api/reqnfts?populate=images1&populate=images2"
    );
    const temp = data.filter((val) => val.attributes.approve === true);

    setfeatured(temp);
  };
  const search1 = () => {
    const data = [...coming];
    const data1 = [...featured];

    const searchdata = data.filter(
      (val) => val.Project.toLowerCase() === search.toLowerCase()
    );
    const searchdata1 = data1.filter(
      (val) => val.attributes.project.toLowerCase() === search.toLowerCase()
    );
    setcoming(searchdata);
    setfeatured(searchdata1);
    setsearched(true);
    setsearch("");
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
                        padding: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Upcoming Collections:
                    </h3>
                  </div>
                  <div
                    className="d-flex"
                    style={{ width: "80%", margin: "auto" }}
                  >
                    <input
                      type="texts"
                      className="form-control"
                      placeholder="Upcoimg nft"
                      name="search"
                      value={search}
                      onChange={(e) => {
                        setsearch(e.target.value);
                      }}
                    />
                    <Button
                      style={{
                        margin: "auto",
                        width: "200px",
                        marginLeft: "5px",
                      }}
                      onClick={search1}
                      className="otherbutton"
                    >
                      Search
                    </Button>
                  </div>

                  <div
                    className="row g-0 justify-content-center"
                    style={{ width: "100%" }}
                  >
                    {featured.map((val) => (
                      <div className="col-md-11 box2 mt-3 ">
                        <div className="d-flex flex-column flex-sm-row justify-content-between  mt-3  ">
                          <div className="d-flex flex-column flex-sm-row">
                            <div>
                              <img
                                style={{
                                  width: "70px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginLeft: "5px",
                                }}
                                src={
                                  val.attributes?.images1?.data?.attributes
                                    ?.formats?.small?.url
                                }
                                alt=" "
                              />
                              {val.attributes?.images2 ? (
                                <img
                                  style={{
                                    width: "70px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    marginLeft: "5px",
                                  }}
                                  src={
                                    val?.attributes?.images2?.data?.attributes
                                      ?.formats?.small?.url
                                  }
                                  alt=" "
                                />
                              ) : (
                                ""
                              )}
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
                                {val.attributes.project}
                              </p>
                              <p
                                style={{
                                  verticalAlign: "center",
                                  margin: "0 0 0 10px",
                                }}
                              >
                                {val.attributes.description}
                              </p>
                              <p
                                style={{
                                  verticalAlign: "center",
                                  margin: "0 0 0 10px",
                                }}
                              >
                                {val.attributes.mintPrice}
                                {val.attributes.blockchain}
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
                              {new Date(val.attributes.saleDate).toLocaleString(
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
                              {new Date(
                                val.attributes?.presaleDate
                              ).toLocaleString("en-US", {
                                timeZone: "Asia/Jakarta",
                              })}
                            </p>
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
                            <a
                              href={`https://twitter.com/${val.attributes.twitter}`}
                              style={{
                                marginLeft: "10px",
                              }}
                            >
                              <Twitter
                                style={{ width: "25px", height: "25px" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row justify-content-center mb-5">
                    {coming.map((val) => (
                      <div className="col-md-11 box2 mt-3 ">
                        <div className="d-flex flex-column flex-sm-row justify-content-between  mt-3  ">
                          <div className="d-flex flex-column flex-sm-row">
                            <div>
                              <img
                                style={{
                                  width: "70px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginLeft: "5px",
                                }}
                                src={`https://upcoming.images.rarity.tools/${val.id}_1?width=80&optimizer=image`}
                                alt=""
                              />
                              <img
                                style={{
                                  width: "70px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginLeft: "5px",
                                }}
                                src={`https://upcoming.images.rarity.tools/${val.id}_2?width=80&optimizer=image`}
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
                                {val["Short Description"]}
                              </p>
                              <p
                                style={{
                                  verticalAlign: "center",
                                  margin: "0 0 0 10px",
                                }}
                              >
                                {val.Price}eth
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
                              {new Date(val["Sale Date"]).toLocaleString(
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
                              {new Date(val["Listed Date"]).toLocaleString(
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
                  <div className="d-flex">
                    {searched ? (
                      <Button
                        style={{
                          margin: "auto auto auto auto",

                          width: "200px",
                        }}
                        onClick={() => window.location.reload(false)}
                        variant="secondary"
                      >
                        back
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
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

export default Upcoming;
