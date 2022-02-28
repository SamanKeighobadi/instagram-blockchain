pragma solidity ^0.5.0;

contract Instagram {
    string public name ='Instagram Clone on blockchain';
    uint public postCount = 0;
    struct Image{
        uint id;
        string hash; // location of IPFS
        string description;
        uint tipAmount;
        address payable auther;
    }

    mapping(uint => Image) public images;

    event uploadedImage(
         uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable auther
    );

    function uploadImage(string memory _hash,string memory _description,
 ) public{
        postCount ++;
        images[postCount]= Image(postCount,_hash,_description,0,msg.sender);
        emit uploadedImage(postCount,_hash,_description,0,mgs.sender);
    }

}