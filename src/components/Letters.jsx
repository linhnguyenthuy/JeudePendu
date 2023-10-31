import PropTypes from "prop-types";

import React from "react";

import "./Letter.css";

const Letter = ({ letter, isSelected, onClick }) => (
  <div
    className="letters"
    onClick={onClick}
    style={{
      background: isSelected ? "grey" : "white",
    }}
  >
    {letter}
  </div>
);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Letter;
