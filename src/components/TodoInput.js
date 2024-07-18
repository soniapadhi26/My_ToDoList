import React, { useState, useEffect } from 'react';

function TodoInput({ addList, toggleSubmit, isEditItem, currentItem }) {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (toggleSubmit && isEditItem !== null) {
      setInputText(currentItem.task);
    } else {
      setInputText('');
    }
  }, [toggleSubmit, isEditItem, currentItem]);

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      addList(inputText);
      setInputText('');
    }
  }

  const handleButtonClick = () => {
    addList(inputText);
    setInputText('');
  }

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-box-todo"
        placeholder="Enter your to-do"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      <button className="add-btn" onClick={handleButtonClick}>
        {toggleSubmit ? 'Edit your text' : 'Add your to-do'}
      </button>
   
    </div>
    
  );
}

export default TodoInput;
