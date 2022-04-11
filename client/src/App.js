import React, { useState, useEffect } from "react";
// blockchain tools
import Web3 from "web3";
import Ethtagram from "./abis/Instagram.json";
import { create } from "ipfs-http-client";
// sweet alert 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// custom components
import Navbar from "./components/common/Navbar";
import Posts from "./components/Posts/Posts";
import UploadPost from "./components/common/UploadPost";

const client = create("https://ipfs.infura.io:5001/api/v0");

const App = () => {

  // init states
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [ethtagram, setEthtagram] = useState(null);
  const [images, setImages] = useState([]);
  const [bufferImage, setBufferImage] = useState(null);

  const Alert = withReactContent(Swal);

  // Initialization web3 and blockchain data
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Please install metamask");
    }
  };
  
  const loadBlockchain = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    setAccount(account[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Ethtagram.networks[networkId];
    if (networkData) {
      const ethtagram = new web3.eth.Contract(
        Ethtagram.abi,
        networkData.address
      );
      setEthtagram(ethtagram);

      const imageCount = await ethtagram.methods.imageCount().call();

      for (let i = 1; i < imageCount; i++) {
        const image = await ethtagram.methods.images(i).call();
        console.log("imags", image);
        if (image.hash !== "") {
          setImages((prev) => [...prev, image]);
        }
      }

      setLoading(false);
    } else {
      alert("contract not deployed");
    }
  };

  /**
   * @param {Object} event object of upload filed
   */
  let bufferedImage;
  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      bufferedImage = await Buffer(reader.result);
      setBufferImage(bufferedImage);
    };
  };

  const [urlArr, setUrlArr] = useState([]);
  /**
   * 
   * @param {String} description description of image which want to upload
   */
  const uploadImage = async (description) => {
    try {
      console.log(bufferImage);

      setLoading(true);
      const created = await client.add(bufferImage);

      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr((prev) => [...prev, url]);

      await ethtagram.methods.uploadImage(created.path,description).send({from:account});
      setLoading(false);
      Alert.fire({
        icon: "success",
        title: "Image Uploaded !",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => window.location.reload(), 3000);
    } catch (ex) {
      console.log(ex);
    }
  };

  /**
   * 
   * @param {string} id id of image which we want to delete it
   */
  const removePost = async (id) => {
    try {
      setLoading(true);
      await ethtagram.methods.removeImage(id).send({ from: account });

      Alert.fire({
        icon: "success",
        title: "Image successfully deleted !",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => window.location.reload(), 3000);

      console.log("post deleted");
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  /**
   * 
   * @param {string} id id of post which we want to reward
   * @param {number} amount amount of tip ==> 0.1ETH
   */
  const tipAmountOwner = async (id, amount) => {
    try {
      setLoading(true);
      await ethtagram.methods
        .tipImageOwner(id)
        .send({ from: account, value: amount });
      setLoading(false);
      Alert.fire({
        icon: "success",
        title: "Tip Amount successfull !",
        showConfirmButton: false,
        timer: 3000,
      });
      console.log("tip amount async ");
      setTimeout(() => window.location.reload(), 3000);
    } catch (ex) {
      console.log(ex);
    }
  };

  /**
   * 
   * @param {string} text content we want to copy 
   */
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Alert.fire({
      icon: "success",
      title: "Copied to clipboard!",
    });
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchain();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center flex justify-center items-center h-screen">
          <p className="text-slate-500 text-2xl font-bold  italic">
            Loading...
          </p>
        </div>
      ) : (
        <>
          <Navbar account={account} copyToClipboard={copyToClipboard} />
          <div className="flex items-center flex-col space-y-10">
            <UploadPost uploadImage={uploadImage} captureFile={captureFile} />
            <Posts
              images={images}
              tipAmountOwner={tipAmountOwner}
              removeImage={removePost}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
