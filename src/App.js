import React, { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import Todolist from './components/Todolist';

const getLocalItems = () => {
  let list = localStorage.getItem('list');
  return list ? JSON.parse(list) : [];
};

function App() {
  const [listTodo, setListTodo] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = (inputText) => {
    if (!inputText) {
      return;
    }

    if (toggleSubmit) {
      setListTodo(listTodo.map((item, index) => {
        if (index === isEditItem) {
          return { ...item, task: inputText };
        }
        return item;
      }));
      setToggleSubmit(false);
      setIsEditItem(null);
      setCurrentItem(null);
    } else {
      setListTodo([...listTodo, { task: inputText, checked: false }]);
    }
  };

  const deleteListItem = (index) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(index, 1);
    setListTodo(newListTodo);
  };

  const editItem = (index) => {
    let itemToEdit = listTodo[index];
    setToggleSubmit(true);
    setIsEditItem(index);
    setCurrentItem(itemToEdit);
  };

  const checkItem = (index) => {
    setListTodo(listTodo.map((item, idx) => {
      if (idx === index) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput
          addList={addList}
          toggleSubmit={toggleSubmit}
          isEditItem={isEditItem}
          currentItem={currentItem}
        />
        <h1 className="app-heading">TO-DO-LIST</h1>
        <button className="show"onClick={toggleFinished}>
          {showFinished ? 'Show All' : 'Hide Finished'}
        </button>
        <hr />
        <ul>
          {listTodo.map((listItem, index) => (
            (!showFinished || !listItem.checked) && (
              <Todolist
                key={index}
                index={index}
                item={listItem}
                deleteItem={deleteListItem}
                editItem={editItem}
                checkItem={checkItem}
              />
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
