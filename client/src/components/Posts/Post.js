import React from "react";
import PropTypes from "prop-types";
import Jdenticon from "react-jdenticon";

const Post = ({ posts, tipAmountPost,deletePost }) => {
  console.log(posts);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3  gap-6">
      {posts.length > 0 &&
        posts.map((img, index) => (
          <div key={index} className="shadow-lg py-6 rounded px-2">
            <div className="flex items-center justify-between py-2 px-1">
              <Jdenticon size={"28"} value={`${index}`} />
              <div className="text-sm text-slate-500">{img.author}</div>
            </div>
            <img
              src={`https://ipfs.infura.io/ipfs/${img.hash}`}
              alt={img.description}
              width={400}
              height={400}
              className="rounded"
            />
           <div>
           <p className="py-3 text-slate-500 font-medium">
             {img.description}
           </p>
           <div className="flex justify-between mt-2 ">
              <small className="text-md text-sky-500 font-semibold">
                TIPS:{" "}
                {window.web3.utils.fromWei(img.tipAmount.toString(), "Ether")}{" "}
                ETH
              </small>
              <button
                onClick={() => {
                  let tipAmount = window.web3.utils.toWei("0.1", "Ether");
                  console.log(img.id, tipAmount);
                  tipAmountPost(img.id, tipAmount);
                }}
                className='text-sm text-slate-500 hover:text-sky-600 semibold'
              >
                tipAmount
              </button>
            </div>
            {/* <button onClick={() => deletePost(img.id)}>
              delete
            </button> */}

           </div>
          </div>
        ))}
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  tipAmountPost: PropTypes.func,
};

export default Post;
