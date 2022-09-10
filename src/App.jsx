import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import "./App.css";

function App() {
  const imgObj = [
    { src: "/images/img-1.jpg", matched: false },
    { src: "/images/img-2.jpg", matched: false },
    { src: "/images/img-3.jpg", matched: false },
    { src: "/images/img-4.jpg", matched: false },
    { src: "/images/img-5.jpg", matched: false },
    { src: "/images/img-6.jpg", matched: false },
  ];

  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const render = function () {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setMoves((prev) => prev + 1);
  };

  // function for handling for choices
  const handleChoice = (parem) => {
    choiceOne ? setChoiceTwo(parem) : setChoiceOne(parem);
  };
  //checking & updating choiceOne and choiceTwo value
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      const timer = setTimeout(() => {
        if (choiceOne.src === choiceTwo.src) {
          setCards((prev) =>
            prev.map((card) => {
              if (card.src == choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            })
          );
          render();
        } else {
          render();
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [choiceOne, choiceTwo]);
  // TODO => comparing both choices
  // TODO => if both choices are same then enable disable state
  // TODO => otherwise flip back again

  const shuffledDeck = () => {
    const shuffledCards = [...imgObj, ...imgObj]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setMoves(0);
  };
  console.log(choiceOne + "  " + choiceTwo);

  useEffect(() => {
    shuffledDeck();
  }, []);

  // console.log(cards)

  return (
    <div className="container ">
      <h1>Memory Game</h1>
      <p><b>Total moves: {moves}</b></p>
      <button onClick={() => setMoves(moves + 1)}>Increase Moves (Test)</button>
      <div className="grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            handleChoice={handleChoice}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
