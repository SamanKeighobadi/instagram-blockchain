pragma solidity ^0.5.0;

contract Instagram {
    string public name = "Instagram Clone on blockchain";
    uint256 public postCount = 0;
    struct Image {
        uint256 id;
        string hash; // location of IPFS
        string description;
        uint256 tipAmount;
        address payable auther;
    }

    mapping(uint256 => Image) public images;

    event uploadedImage(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable auther
    );
    event tipAmountImage(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable auther
    );

    function uploadImage(string memory _hash, string memory _description)
        public
    {
        require(bytes(_hash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0x0));

        postCount++;
        images[postCount] = Image(
            postCount,
            _hash,
            _description,
            0,
            msg.sender
        );
        emit uploadedImage(postCount, _hash, _description, 0, msg.sender);
    }

    function tipImageOwner(uint _id) public payable{
        require(_id > 0 && _id <= postCount);
        // Fetch selected post and auther
        Image memory _image = images[_id];
        address payable _auther = _image.auther;
        // pay the ether to auther
        _auther.transfer(msg.value);
        // update and put post on blockchain
        _image.tipAmount = _image.tipAmount + msg.value;
        images[_id] = _image;
        // emit events 
        emit tipAmountImage(_id, _image.hash, _image.description, _image.tipAmount, _auther);
    }
}
