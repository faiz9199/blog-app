// DialogBox.js
import React from 'react';
import { Link } from 'react-router-dom';

const DialogBox = ({ show, onClose }) => {
  if (!show) return null;

  const handleSignInClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">You need to sign in to write a post</h2>
        <div className="flex justify-center gap-4">
          <Link to="/signin" onClick={handleSignInClick} className="bg-slate-700 text-white px-4 py-2 rounded-lg">
            Sign In
          </Link>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
