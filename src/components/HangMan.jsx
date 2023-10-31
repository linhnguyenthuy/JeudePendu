import PropTypes from "prop-types";
import "./HangMan.css";

import React from "react";

const HangMan = ({ countDown }) => (
  <div className="hangman">
    <img src={`/hangman/${countDown + 1}.png`} />
  </div>
);

HangMan.propTypes = {
  countDown: PropTypes.number.isRequired,
};

export default HangMan;
