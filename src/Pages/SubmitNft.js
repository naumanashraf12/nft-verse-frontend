import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { Navbar } from "../components";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

const SubmitNft = () => {
  const [formData, setFormData] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [saleDate, setSaleDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [image, setimage] = useState({});
  const [network, setnetwork] = useState({ network: "Ethereum(ERC20)" });
  const [txid, settxid] = useState("");
  const [image1, setimage1] = useState({});
  const [image2, setimage2] = useState({});
  const [image3, setimage3] = useState({});
  const [presaleDate, setPreSaleDate] = useState(new Date());
  console.log(network.network);

  const options = [
    {
      value: "Ethereum(ERC20)",
      lable: "Ethereum(ERC20)",
      // receiver: "0x628192D4D57c3079BaCfBec526766a6e8fd0F64b",
    },
    {
      value: "Binance(BSC-BEP20)",
      lable: "Binance(BSC-BEP20)",
      // receiver: "0x628192D4D57c3079BaCfBec526766a6e8fd0F64b",
    },
    {
      value: "Polygon(matic)",
      lable: "Polygon(matic)",
      // receiver: "0x628192D4D57c3079BaCfBec526766a6e8fd0F64b",
    },
  ];
  const handleNetwork = (e) => {
    const value = e.target.value;
    if (value === "Ethereum(ERC20)") {
      setnetwork({
        network: e.target.value,
        receiver: "0x628192D4D57c3079BaCfBec526766a6e8fd0F64b",
      });
    }
    if (value === "Binance(BSC-BEP20)") {
      setnetwork({
        network: e.target.value,
        receiver: "0x628192D4D57c3079BaCfBec526766a6e8fd0F64b",
      });
    }
    if (value === "Polygon(matic)") {
      setnetwork({
        network: e.target.value,
        receiver: "0x628192D4D57c3079BaCfBec526766a6e8fd0F64b",
      });
    }
  };
  const handletxid = (e) => {
    settxid(e.target.value);
  };
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        autoFocus
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Enter details</h4>
          <div className="d-flex flex-column justify-content-center align-content-center">
            <select
              name="network"
              className="form-control"
              onChange={handleNetwork}
              value={network.network}
            >
              <option value="Ethereum(ERC20)">Ethereum(ERC20)</option>
              <option value="Binance(BSC-BEP20)">Binance(BSC-BEP20)</option>
              <option value="Polygon(matic)">Polygon(matic)</option>
            </select>

            <input
              key={2}
              className="form-control mt-3"
              type="text"
              disabled
              value={network?.receiver}
            />
            <label
              for="exampleInputEmail1 w-100"
              style={{
                color: "#696969",
                fontWeight: "bolder",
                margin: "1rem 0 0 0",
              }}
            >
              Paste your TXID here
            </label>
            <input
              autoFocus="autoFocus"
              key={1}
              className="form-control mt-3"
              type="text"
              value={txid}
              onChange={handletxid}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="otherbutton" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            className="otherbutton1"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill all fields",
        timer: 2000,
        showConfirmButton: true,
      });
    }
  }, [errors]);
  const validation = () => {
    let errors = {};
    if (!formData.project) errors.project = "project name is required";
    if (!formData.mintPrice) errors.mintPrice = "mintPrice is required";
    if (!formData.discord) errors.discord = "discord is required";
    if (!formData.twitter) errors.twitter = "twitter is required";
    if (!formData.opensea) errors.opensea = "opensea is required";
    if (!formData.description) errors.description = "description is required";
    if (!formData.blockchain) errors.blockchain = "blockchain is required";
    if (!saleDate) errors.saleDate = "saleDate is required";
    if (!network) errors.saleDate = "select network is required";
    if (!txid) errors.saleDate = "txid is required";

    setErrors(errors);
    return Object.keys(errors).length;
  };
  console.log(txid);
  const handleSubmit = async (e) => {
    setFormData({ ...formData, tid: txid, networks: network?.network });
    console.log(formData);
    e.preventDefault();
    const valid = validation();
    if (valid > 0) return;

    let formData1 = new FormData();
    const {
      project,
      mintPrice,
      opensea,
      discord,
      twitter,
      description,
      blockchain,
      networks,
      tid,
    } = formData;
    const data = {
      project,
      mintPrice,
      opensea,
      discord,
      twitter,
      description,
      blockchain,
      saleDate,
      presaleDate,
      networks,
      tid,
    };
    const dat = JSON.stringify(data);
    console.log(dat);
    formData1.append("data", dat);
    formData1.append("files.images1", image);
    if (image1) {
      formData1.append("files.images2", image1);
    }
    if (image2) {
      formData1.append("files.images3", image2);
    }
    if (image3) {
      formData1.append("files.images4", image3);
    }

    const config = {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    };
    for (var key of formData1.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const data1 = await axios.post(
      "https://nft-verse1.herokuapp.com/api/reqnfts",
      formData1,
      config
    );
    if (data1.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your request is submited",
        timer: 2000,
        showConfirmButton: true,
      });
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row align-items-center min-vh-100 Background">
          <div
            className="offset-md-4 col-md-4 offset-md-3 h-100 d-flex align-items-center justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "35px",
                color: "#5A5A5A",
                fontStyle: "normal",
                fontWeight: "900",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Submit NFT <br />
              <span
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  color: "#5A5A5A",
                  fontStyle: "normal",
                  fontWeight: "600",
                }}
              >
                for 0.5 Eth
              </span>
            </h1>
            <form
              // onSubmit={handleSubmit}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
              }}
              action=""
              className="w-75"
            >
              <div className="form-group mb-3">
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    Name
                  </label>

                  <input
                    type="texts"
                    className="form-control"
                    id="password"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                    name="project"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    Sale Date
                  </label>

                  <ReactDatePicker
                    className="form-control"
                    name="saleDate"
                    selected={saleDate}
                    onChange={(date) => setSaleDate(date)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    PreSale Date(if any)
                  </label>

                  <ReactDatePicker
                    className="form-control"
                    name="preSaleDate"
                    selected={presaleDate}
                    onChange={(date) => setPreSaleDate(date)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    Mint Price
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="mintprice"
                    aria-describedby="emailHelp"
                    name="mintPrice"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    OpenSea
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="mintprice"
                    aria-describedby="emailHelp"
                    name="opensea"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    blockchain
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="blockchain"
                    aria-describedby="emailHelp"
                    placeholder="blockchain"
                    name="blockchain"
                  />
                </div>

                <div className=" mt-3">
                  <label
                    htmlfor="orginization w-100"
                    style={{
                      color: "#696969",
                      fontWeight: "bolder",
                    }}
                  >
                    Twitter Link
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="orginizationname"
                    aria-describedby="emailHelp"
                    placeholder="twitter"
                    name="twitter"
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    Discord Link
                  </label>

                  <input
                    type="texts"
                    className="form-control"
                    id="password"
                    aria-describedby="emailHelp"
                    placeholder="discord"
                    name="discord"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlfor="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    Project Discription
                  </label>

                  <textarea
                    className="form-control"
                    id="confirmpassword"
                    aria-describedby="emailHelp"
                    placeholder="Product discription"
                    name="description"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlfor="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    image-1
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    name="images1"
                    onChange={(e) => {
                      setimage(e.target.files[0]);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlfor="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    image-2
                  </label>

                  <input
                    type="file"
                    multiple
                    className="form-control"
                    onChange={(e) => {
                      setimage1(e.target.files[0]);
                    }}
                    name="images2"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlfor="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    image-3
                  </label>

                  <input
                    type="file"
                    multiple
                    className="form-control"
                    onChange={(e) => {
                      setimage2(e.target.files[0]);
                    }}
                    name="images3"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlfor="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    image-4
                  </label>

                  <input
                    type="file"
                    multiple
                    className="form-control"
                    onChange={(e) => {
                      setimage3(e.target.files[0]);
                    }}
                    name="images4"
                  />
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "20px" }}></div>
            </form>
            <button
              style={{
                width: "50%",
                margin: "0 0 2rem 0 ",
                height: "40px",
                color: "#FFFFFF",
                backgroundColor: "#1f2833",
              }}
              onClick={() => setModalShow(true)}
              className="btn btn-light"
            >
              Submit
            </button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={(e) => {
                e.preventDefault();
                setModalShow(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitNft;
