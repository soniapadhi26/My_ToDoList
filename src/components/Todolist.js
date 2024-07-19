import React from 'react';

function Todolist({ item, index, deleteItem, editItem, checkItem }) {
  const handleCheckbox = () => {
    checkItem(index);
  };

  return (
    <div>
    <li className={`list-item ${item.checked ? 'checked' : ''}`}>
      <span className={`task ${item.checked ? 'line-through' : ''}`}>
        {item.task}
      </span>
      <span className='icons'>
        <i className="fa-solid fa-trash-can icon-delete"
          onClick={() => deleteItem(index)}>
        </i>
      </span>
      <span className='icons1'>
        <i className="fa-solid fa-pen-to-square"
          onClick={() => editItem(index)}>
        </i>
      </span>
      <span className='icons2'>
        <input
          type="checkbox"
          onChange={handleCheckbox}
          checked={item.checked}
        />
      </span>
    </li>
    </div>
  );
}

export default Todolist;
