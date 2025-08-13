import { useState, useEffect, useRef } from 'react';

import sunny from '../assets/sun-1265199_640.png';
import cloudy from '../assets/very-cloudy-1265202_640.png';
import stormy from '../assets/thunderstorm-1265161_640.png';

export default function Card({ card }) {
  const [isFront, setIsFront] = useState(true);
  const [cardHeight, setCardHeight] = useState('initial');

  const frontSide = useRef();
  const backSide = useRef();

  function setMaxHeight() {
    const frontHeight = frontSide.current.getBoundingClientRect().height;
    const backHeight = backSide.current.getBoundingClientRect().height;
    setCardHeight(Math.max(frontHeight, backHeight, 220));
  }

  useEffect(setMaxHeight, [card.question, card.answer, card.options]);
  // on resizing:
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  let difficultyImg = { image: sunny, alt: "icon of a bright sun"};
  if (card.difficulty === 'medium') {
    difficultyImg.image = cloudy;
    difficultyImg.alt = "icon of a sun with big clouds";
  } 
    if (card.difficulty === 'hard') {
    difficultyImg.image = stormy;
    difficultyImg.alt = "icon of a sun with big clouds lightning and rain";
  } 
  

  return (
    <div
      className={`card ${!isFront ? 'flipped' : ''} ${card.difficulty}`}
      style={{ height: cardHeight }}
      onClick={() => setIsFront(!isFront)}
    >
      <div className='card-front' ref={frontSide}>
        <div className='color-band'>
          <span>{card.difficulty}</span>
          <img className="icon" src={difficultyImg.image} alt={difficultyImg.alt} />
        </div>
        <h2>{card.question}</h2>
        <ul className='answers-list'>
          {card.options.map((opt, idx) => (
            <li key={idx}>{`${String.fromCharCode(idx + 65)}) ${opt}`}</li>
          ))}
        </ul>
      </div>
      <div className='card-back' ref={backSide}>
        <div className='color-band'>
        </div>
        <h2>A: {card.answer}</h2>
      </div>
    </div>
  );
}
