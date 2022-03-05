import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";

const Posts = ({ images, tipAmountOwner,removeImage }) => {
  return (
    <div className="">
      <Post posts={images} tipAmountPost={tipAmountOwner} deletePost={removeImage} />
    </div>
  );
};

Posts.propTypes = {
  images: PropTypes.array,
  tipAmountOwner: PropTypes.func,
};

export default Posts;
