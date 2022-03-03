import React from "react";
import PropTypes from "prop-types";
import { CameraIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import Jdenticon from "react-jdenticon";

const Navbar = ({ account, copyToClipboard }) => {
  return (
    <div className="flex items-center justify-between px-6 py-2 mb-3 shadow-md text-gray-600 font-semibold bg-gray-100 ">
      <div className="order-2 flex items-center space-x-2">
        <ClipboardCopyIcon className="w-5 h-5  cursor-pointer transition hover:shadow-md  " onClick={() => copyToClipboard(account)} />
        <p>{account ? account : "0x0"}</p>{" "}
        <Jdenticon size="28" value={"account"} />
      </div>
      <div className="order-1">
        <div className="flex items-center space-x-3 ">
          <CameraIcon className="w-5 h-5" />
          <h3>Ethtagram</h3>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  account: PropTypes.string,
};

export default React.memo(Navbar);
