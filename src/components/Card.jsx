import { useState } from 'react';

export default function Card({ card }) {
  const [isFront, setIsFront] = useState(true);

  const content = isFront ? (
    <div className='card-front'>
      <h2>{card.question}</h2>
      <ul className='answer-options'>
        {card.options.map((opt, idx) => (
          <li key={idx}>{opt}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className='card-back'><h2>{card.answer}</h2></div>
  );

  return (
    <div
      className={`card ${!isFront ? 'flipped' : ''}`}
      onClick={() => setIsFront(!isFront)}
    >
      {content}
    </div>
  );
}
