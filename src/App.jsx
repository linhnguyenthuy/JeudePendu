import React from "react";
import "./App.css";
import shuffle from "lodash.shuffle";

import Letter from "./components/Letters";
import WordToGuess from "./components/WordToGuess";
import HangMan from "./components/HangMan";
import Loose from "./components/Loose";
import Win from "./components/Win";

const WORDS = [
  "ski",
  "axe",
  "cri",
  "lune",
  "rock",
  "bruit",
  "radar",
  "coquelicot",
  "labyrinthe",
  "bel",
  "cou",
  "dune",
  "joli",
  "ours",
  "pion",
  "avion",
  "cycle",
  "valse",
  "jambe",
  "animal",
  "boucle",
  "crayon",
  "humour",
  "chariot",
  "clairon",
  "fourmis",
  "mondial",
  "vautour",
  "aquarium",
  "objectif",
  "tabouret",
  "triangle",
  "ascenseur",
  "avalanche",
  "brillance",
  "graphique",
  "populaire",
  "vestiaire",
  "bouillotte",
  "citrouille",
  "subjective",
  "chlorophylle",
  "qualification",
  "conspirateur",
  "compte rendu",
  "pots-de-vin",
  "garde-boue",
  "garde-manger",
  "arcs-en-ciel",
  "haut-parleurs",
  "abat-jour",
  "gratte-ciel",
  "apres-midi",
  "brise-glace",
  "coupe-papier",
  "porte-bonheur",
  "porte-plume",
  "porte-monnaie",
  "tire-bouchon",
  "pomme de terre",
  "anticonstitutionnellement",
  "confinement",
  "bande dessinee",
  "compte rendu",
  "millefeuille",
  "photocopie",
  "savoir-faire",
  "clairvoyant",
  "rouge-gorge",
  "insecticide",
  "vice-president",
  "supermarche",
  "chefs-d’oeuvre",
  "clins d’oeil",
  "pieds de biche",
];
const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const generateWord = () => {
  let candidates = shuffle(WORDS);
  candidates = candidates.pop();
  return candidates;
};
const word = generateWord();
const letterInWords = word.split("");

class App extends React.Component {
  state = {
    letters: [],
  };

  handleLetters(letter) {
    if (
      !this.ifIswin(this.state.letters, letterInWords) &&
      this.getCounter() < 10
    ) {
      this.setState({
        letters: [...this.state.letters, letter],
      });
    }
  }
  getCounter() {
    const { letters } = this.state;
    const guesses = letters.filter((letter) => letterInWords.includes(letter));
    return letters.length - guesses.length;
  }

  CountdownOfGuess() {
    return <HangMan countDown={this.getCounter()} />;
  }

  tableOfLetters() {
    let letters = LETTERS.map((letter, index) => (
      <Letter
        key={index}
        letter={letter}
        isSelected={this.state.letters.includes(letter)}
        onClick={() => this.handleLetters(letter)}
      />
    ));
    return letters;
  }

  tableOfWord(isLoose, isWin) {
    let words = letterInWords.map((letterInWord, index) => (
      <WordToGuess
        key={index}
        isLoose={isLoose}
        isWin={isWin}
        countDown={this.getCounter()}
        letterInWord={letterInWord}
        feedback={this.getFeedbackForLetters(letterInWord)}
      />
    ));
    return words;
  }

  getFeedbackForLetters(letterInWord) {
    const { letters } = this.state;
    const wordMatched = letters.includes(letterInWord);
    if (wordMatched === true) {
      return "visible";
    }
    if (wordMatched === false) {
      return "hidden";
    }
    // if (wordMatched === '-') { return letterInWord }
    // if (wordMatched === ' ') { return letterInWord }
  }
  ifIswin(letters, letterInWords) {
    letterInWords = letterInWords.filter(
      (l) => l !== "’" && l !== "-" && l !== " "
    );
    const letterFound = letterInWords.filter((l) => letters.includes(l));
    return letterFound.length === letterInWords.length;
  }

  Restart() {
    window.location.reload(false);
  }

  render() {
    const { letters } = this.state;
    const isWin = this.ifIswin(letters, letterInWords);
    const isLoose = this.getCounter() === 10;
    let resultDisplay = null;
    const buttonRestart = (
      <div className="button-wrapper">
        <button type="button" className="button" onClick={() => this.Restart()}>
          Nouvelle partie?
        </button>
      </div>
    );

    if (isLoose === true) {
      return (
        <div>
          <div className="guesses">{this.getCounter()}</div>
          <div className="handle">
            <h1>{this.tableOfWord(isLoose, isWin)}</h1>
          </div>
          <div className="letters">{this.tableOfLetters()}</div>
          <div className="loose">
            <Loose />
          </div>
          <div>
            {" "}
            <button
              type="button"
              className="button"
              onClick={() => this.Restart()}
            >
              Nouvelle partie?
            </button>
          </div>
        </div>
      );
    }
    if (isWin === true) {
      return (
        <div>
          <div className="guesses">{this.getCounter()}</div>
          <div className="handle">
            <h1>{this.tableOfWord(isLoose, isWin)}</h1>
          </div>
          <div className="letters">{this.tableOfLetters()}</div>
          <div className="winner">
            <Win />
          </div>

          <div>
            {" "}
            <button
              type="button"
              className="button"
              onClick={() => this.Restart()}
            >
              Nouvelle partie?
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="guesses">{this.getCounter()}</div>
          <div className="handle">
            <h1>{this.tableOfWord(isLoose, isWin)}</h1>
          </div>
          <div className="letters">{this.tableOfLetters()}</div>
          <div>{this.CountdownOfGuess()}</div>
        </div>
      );
    }
  }
}

export default App;
