import React from 'react'
import PropTypes from 'prop-types'

const UploadPost = ({uploadImage,captureFile}) => {

    const [text, setText] = React.useState("");

  return (
    <div>
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
    </div>
  );
};

UploadPost.propTypes = {
    uploadImage:PropTypes.func,
    captureFile:PropTypes.func
}

export default React.memo(UploadPost);
