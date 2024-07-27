import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PacmanLoader color="#62e3d0" cssOverride={{}} />
    </div>
  );
};

export default Loading;
