import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
// import Jdenticon from "react-jdenticon";
import Ethtagram from "./abis/Instagram.json";
import {create} from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0');

const App = () => {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [ethtagram, setEthtagram] = useState(null);
  // const [images,setImages] = useState([])
  const [text, setText] = useState("");
  const [bufferImage, setBufferImage] = useState(null);

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
      setLoading(false);
    } else {
      alert("contract not deployed");
    }
  };
  
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    console.log('captureFile function');

let test ;
    reader.onloadend = async () => {
      
      test = await Buffer(reader.result);
      // console.log(test);
      setBufferImage(test)
      console.log('onloaded function');
    };
  };
  const [urlArr, setUrlArr] = useState([]);
  const uploadImage = async (description) => {
    console.log(bufferImage);
 
    const created = await client.add(bufferImage)
    console.log(created);
    const url = `https://ipfs.infura.io/ipfs/${created.path}`;
    setUrlArr(prev => [...prev, url]);  
  };
  
  console.log(urlArr);
  useEffect(() => {
    loadWeb3();
    loadBlockchain();
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading..</p>
      ) : (
        <>
          <p>{account ? account : "0x0"}</p>
          <h1>Hello instagram !</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              uploadImage(text);
            }}
          >
            <input
              type={"file"}
              accept={".jpg ,.jpeg,.png,.bmp,.gif"}
              onChange={captureFile}
              required
            />
            <div>
              <input
                type={"text"}
                placeholder="image description..."
                onChange={(e) => setText(e.target.value)}
                required
              />
              <button>Upload</button>
            </div>
          </form>
          {urlArr.map((url,index) => (
            <img key={index} src={url} alt='image' width={100} height={100} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
