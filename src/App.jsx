import { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import CardStack from './components/CardStack';

import axios from 'axios';

import './App.css';

const MIN = 4;
const MAX = 20;

function App() {
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categorySelectEl = useRef();
  const questionAmountEl = useRef();

  function handleHtmlEntities(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  // ON LOAD (NOT AFFECTED BY STATE). Load 10 easy questions on cs.
  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10&category=18')
      .then((res) => {
        setCards(
          res.data.results.map((item, idx) => {
            const correctAnswer = handleHtmlEntities(item.correct_answer);
            const incorrectAnswers = [...item.incorrect_answers].map((ans) =>
              handleHtmlEntities(ans)
            );
            const options = [...incorrectAnswers, correctAnswer].sort(
              () => Math.random() - 0.5
            );

            return {
              id: `${idx + '' + (Math.random() * 100).toFixed(0)}`,
              difficulty: item.difficulty,
              question: handleHtmlEntities(item.question),
              answer: correctAnswer,
              options: options,
            };
          })
        );
      });
  }, []);

  // GET ALL THE CATEGORIES ON LOAD:
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      console.log(res.data);
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: questionAmountEl.current.value,
          category: categorySelectEl.current.value,
        },
      })
      .then((res) => {
        setCards(
          res.data.results.map((item, idx) => {
            const correctAnswer = handleHtmlEntities(item.correct_answer);
            const incorrectAnswers = [...item.incorrect_answers].map((ans) =>
              handleHtmlEntities(ans)
            );
            const options = [...incorrectAnswers, correctAnswer].sort(
              () => Math.random() - 0.5
            );

            return {
              id: `${idx + '' + (Math.random() * 100).toFixed(0)}`,
              difficulty: item.difficulty,
              question: handleHtmlEntities(item.question),
              answer: correctAnswer,
              options: options,
            };
          })
        );
      });
  }

  return (
    <>
      <Header title="Schmahty Pantch!">
        <p>Test yourself on trivia from various categories. Click on the card to see the correct answer.</p>
      </Header>
      <form className='trivia-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='catetory'>Category</label>
          <select id='category' ref={categorySelectEl}>
            <option value=''>Any category!</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='question-amount'>Number of questions</label>
          <input
            type='number'
            id='question-amount'
            min='4'
            max='20'
            step='1'
            defaultValue={10}
            ref={questionAmountEl}
          />
        </div>
        <button className="btn" type='submit'>Hit me!</button>
      </form>
      <main className='quiz-board'>
        <CardStack cards={cards} />
      </main>
    </>
  );
}

export default App;

// Category Lookup: Returns the entire list of categories and ids in the database.
// https://opentdb.com/api_category.php
