import React,{useState,useEffect} from "react";
import "./App.css";
import Web3 from 'web3';
import Jdenticon from 'react-jdenticon';
import Ethtagram from './abis/Instagram.json'

const App = () =>{

  const [account,setAccount] = useState('')
  
  const contractAddress = '0xc8a86fe1de9EF9A6895755bb2867F912dF906978' 

  const loadWeb3 = async () =>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else {
      window.alert('Please install metamask')
    }
  }

  const loadBlockchain = async () => {
    const web3 = window.web3;
    const account= await web3.eth.getAccounts();
    setAccount(account[0])
    const networkId = await web3.eth.net.getId();
    const networkData = Ethtagram.networks[networkId]
    if(networkData){
      const ethtagram = new web3.eth.Contract(Ethtagram.abi,networkData.address)
    }else {
      alert('contract not deployed')
    }
  }

  useEffect(() =>{
    loadWeb3()
    loadBlockchain()
  },[])

  return(
    <div>
      <p>{account ? account  : "0x0"}</p>
      <h1>Hello instagram !</h1>
    </div>
  )
}

export default App;
