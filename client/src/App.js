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
  const [images,setImages] = useState([])
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

      const imageCount = await ethtagram.methods.imageCount().call()

      for(let i =1;i<imageCount;i++){
        const image = await ethtagram.methods.images(i).call();
        setImages(prev => [...prev,image])
      }
      
      setLoading(false);
    } else {
      alert("contract not deployed");
    }
  };
  let test;
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
 
    reader.onloadend = async () => {
      
      test = await Buffer(reader.result);
      // console.log(test);
      setBufferImage(test)
    
    };
  };

  const [urlArr, setUrlArr] = useState([]);
  const uploadImage = async (description) => {
    console.log(bufferImage);
 
    setLoading(true);
    const created = await client.add(bufferImage)
    console.log(created);
    const url = `https://ipfs.infura.io/ipfs/${created.path}`;
    setUrlArr(prev => [...prev, url]);  

    ethtagram.methods.uploadImage(created.path,description).send({from:account}).on("transactionHash",result =>{
      setLoading(false)
      console.log(result);
    })
  
  };
  

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
          {images.length >0 && images.map((img,index) => (
            <div key={index} >
            <img  src={`https://ipfs.infura.io/ipfs/${img.hash}`} alt={img.description} width={400} height={400} />
            {img.hash}
            </div>
            
          ))}
        </>
      )}
    </div>
  );
};

export default App;
