import React,{useState,useEffect} from "react";
import "./App.css";
import Web3 from 'web3';

const App = () =>{

  const [account,setAccount] = useState('')
  

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
    
  }

  useEffect(() =>{
    loadWeb3()
    loadBlockchain()
  },[])

  return(
    <div>
      <h1>Hello instagram !</h1>
    </div>
  )
}

export default App;
