import PropTypes from "prop-types";

import React from "react";

import "./WordToGuess.css";

const HIDDEN_LETTERS = "_";

const WordToGuess = ({ isLoose, letterInWord, feedback, isWin }) => {
  return (
    <div
      className={`handle ${feedback}`}
      style={{ color: isLoose ? "red" : "black" && isWin ? "blue" : "black" }}
    >
      {feedback === "hidden" &&
      !isLoose &&
      letterInWord !== "-" &&
      letterInWord !== " " &&
      letterInWord !== "’"
        ? HIDDEN_LETTERS
        : letterInWord}
      &nbsp;
    </div>
  );
};

WordToGuess.propTypes = {
  letterInWord: PropTypes.string.isRequired,
};

export default WordToGuess;
