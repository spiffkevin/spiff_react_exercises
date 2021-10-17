import React, { useState } from 'react';

import './parser.css';

const Parser = () => {
  const [matchOutput, setMatchOutput] = useState({});
  const [inputText, setInputText] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const initial = {};

    alphabet.split('').forEach((letter) => {
      initial[letter] = 0;
    });

    const matches = inputText.split(' ').reduce((obj, word) => {
      word
        .split('')
        .filter((letter, i, self) => self.indexOf(letter) === i)
        .forEach((letter) => (obj[letter] = obj[letter] + 1));
      return obj;
    }, initial);
    setMatchOutput(matches);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setMatchOutput({});
    setInputText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="label">
          <label htmlFor="phrase">Phrase</label>
        </div>
        <textarea name="phrase" id="phrase" cols="30" rows="10" onChange={(e) => setInputText(e.target.value)} value={inputText}></textarea>
        {selectedLetter && (
          <p data-testid="highlighted-text">
            {inputText.split(' ').map((word, i) => {
              if (word.includes(selectedLetter)) {
                return (
                  <span key={i}>
                    <mark>{word}</mark>{' '}
                  </span>
                );
              }
              return `${word} `;
            })}
          </p>
        )}
        <button className="button parse" type="submit">
          Parse
        </button>
        <button className="button reset" onClick={handleReset}>
          Reset
        </button>
      </form>
      <pre>
        {Object.keys(matchOutput).map((letter) => (
          <p key={letter} onClick={() => setSelectedLetter(letter)}>{`${letter}: ${matchOutput[letter]}`}</p>
        ))}
      </pre>
    </>
  );
};

export default Parser;
