import React from "react";

function tvShow({ show, selectShow }) {
  return (
    <div>
      <br />
      <img src={show.image.medium} onClick={() => selectShow(show)} alt="" />
    </div>
  );
}

export default tvShow;
