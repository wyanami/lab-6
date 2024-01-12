import React, { useRef, useState } from 'react';
import './style.css';
import * as uuid from 'uuid';

const isArrayEqual = (selected, correct) => {
  if (selected.length !== correct.length) {
    return false;
  }
  return correct.filter((e) => !selected.includes(e)).length === 0;
};

/**
 * @param {Object} props
 * @param {string} props.question
 * @param {string[]} props.answers
 * @param {number[]} props.correctAnswer
 * @returns
 */
const MultiAnswerComponent = (props) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState([]);
  const correctRef = useRef();
  const wrongRef = useRef();
  const showCorrectAnswerButton = useRef();
  let incorrectAttempts = useRef(0);

  const checkboxClick = (index, status) => {
    if (status) {
      setSelectedAnswerIndex([...selectedAnswerIndex, index]);
    } else {
      setSelectedAnswerIndex(selectedAnswerIndex.filter((e) => e !== index));
    }
    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
  };

  const checkOnClick = () => {
    if (isArrayEqual(selectedAnswerIndex, props.correctAnswer)) {
      correctRef.current.classList.add('selected');
      wrongRef.current.classList.remove('selected');
    } else {
      wrongRef.current.classList.add('selected');
      correctRef.current.classList.remove('selected');
      incorrectAttempts.current += 1;

      if (incorrectAttempts.current >= 3) {
        showCorrectAnswerButton.current.style.display = 'block';
      }
    }
  };

  const showCorrectAnswerOnClick = () => {
    correctRef.current.classList.add('selected', 'correct-green');
    wrongRef.current.classList.remove('selected');

    setSelectedAnswerIndex([...props.correctAnswer]);
  };

  return (
    <div className='question single-answer'>
      <div>
        <h3>{props.question}</h3>
      </div>
      <div className='answers'>
        {props.answers.map((answer, i) => {
          const id = uuid.v1();
          return (
            <div key={id}>
              <input
                id={id}
                type='checkbox'
                onClick={(e) => checkboxClick(i, e.currentTarget.checked)}
                checked={selectedAnswerIndex.includes(i)}
              />
              <label htmlFor={id}>{answer}</label>
            </div>
          );
        })}
      </div>
      <div className='check'>
        <div className='button' onClick={checkOnClick}>
          check my answer
          <div ref={correctRef} className='correct'>
            correct
          </div>
          <div ref={wrongRef} className='wrong'>
            wrong
          </div>
        </div>
        <button
          ref={showCorrectAnswerButton}
          className='button'
          onClick={showCorrectAnswerOnClick}
          style={{ display: 'none' }}
        >
          Show me correct answer
        </button>
      </div>
    </div>
  );
};

export default MultiAnswerComponent;