import React from "react";
import PropTypes from "prop-types";

const Post = ({ posts, tipAmountPost }) => {
  return (
    <div>
      {posts.length > 0 &&
        posts.map((img, index) => (
          <div key={index}>
            <img
              src={`https://ipfs.infura.io/ipfs/${img.hash}`}
              alt={img.description}
              width={400}
              height={400}
            />
            <small className="float-left mt-1 text-muted">
              TIPS:{" "}
              {window.web3.utils.fromWei(img.tipAmount.toString(), "Ether")} ETH
            </small>
            <button
              onClick={() => {
                let tipAmount = window.web3.utils.toWei("0.1", "Ether");
                console.log(img.id, tipAmount);
                tipAmountPost(img.id, tipAmount);
              }}
            >
              amount
            </button>
          </div>
        ))}
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.array,
  tipAmountPost: PropTypes.func,
};

export default Post;
