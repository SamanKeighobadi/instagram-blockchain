import React from "react";
import PropTypes from "prop-types";

const UploadPost = ({ uploadImage, captureFile }) => {
  const [text, setText] = React.useState("");

  return (
    <div className="my-5  text-center">
      <h1 className="text-slate-600 text-2xl pb-3 font-bold ">
        Upload you post!
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadImage(text);
        }}
        className=""
      >
        <input
          type={"file"}
          accept={".jpg ,.jpeg,.png,.bmp,.gif"}
          onChange={captureFile}
          required
          className="block text-salt-500   mx-auto w-full text-sm file:rounded-full file:border-0  file:py-2 file:px-4 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <div className="flex flex-col">
          <input
            type={"text"}
            placeholder="image description..."
            onChange={(e) => setText(e.target.value)}
            required
            className="my-3  px-2 py-1 rounded text-slate-500  w-80 focus:ring-2 focus:ring-violet-500 caret-violet-500 outline-0 text-salte-500 border-2 placeholder:italic placeholder:text-slate-400"
          />
          <button className="bg-violet-400 py-1 rounded text-slate-50">Upload</button>
        </div>
      </form>
    </div>
  );
};

UploadPost.propTypes = {
  uploadImage: PropTypes.func,
  captureFile: PropTypes.func,
};

export default React.memo(UploadPost);
