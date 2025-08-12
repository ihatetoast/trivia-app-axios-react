import { useState } from 'react';

import Header from './components/Header';
import CardStack from './components/CardStack';

import './App.css';

function App() {
  const [cards, setCards] = useState(TEMP_TRIVIA);

  return (
    <>
      <Header />
      <main>
        <CardStack cards={cards} />
      </main>
    </>
  );
}

const TEMP_TRIVIA = [
  {
    id: 1001,
    question: 'Why',
    answer: 'because',
    options: ['because', 'why not?', 'just so', "it's the rules!"],
  },
  {
    id: 1002,
    question: 'Who',
    answer: 'Me',
    options: ['You', 'Me', 'Someone', 'Bob'],
  },
  {
    id: 1003,
    question: 'What if',
    answer: "let's try",
    options: ["oh, no please don't", 'perhaps', "i'm skeert", "let's try"],
  },
];
export default App;
