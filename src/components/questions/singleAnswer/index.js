import React, { useRef } from 'react';
import './style.css';
import * as uuid from 'uuid';

const SingleAnswerComponent = (props) => {
  const showCorrectAnswerButton = useRef();
  const correctAnswerRevealed = useRef(false);
  let incorrectAttempts = useRef(0);
  let selectedAnswerIndex = null;

  const radioClick = (index) => {
    selectedAnswerIndex = index;
    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
  };

  const correctRef = useRef();
  const wrongRef = useRef();

  const checkOnClick = () => {
    if (selectedAnswerIndex === props.correctAnswer) {
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

  const qId = uuid.v1();

  const showCorrectAnswerOnClick = () => {
    correctRef.current.classList.add('selected', 'correct-green');
    wrongRef.current.classList.remove('selected');
    correctAnswerRevealed.current = true;

   
    const firstAnswerInput = document.querySelector(`input[name=group-${qId}]:first-of-type`);
    if (firstAnswerInput) {
      firstAnswerInput.checked = true;
      firstAnswerInput.classList.add('selected'); 
    }
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
                type='radio'
                name={`group-${qId}`}
                onClick={() => radioClick(i)}
                disabled={correctAnswerRevealed.current && i === 0}
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

export default SingleAnswerComponent;