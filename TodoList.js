import { useState } from "react";
import "./styles.css";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const onSubmitHandler = () => {
    setTodoList([...todoList, todo]);
    setTodo("");
  };
  const deleteTodo = (index) => {
    const updatedList = todoList.filter((_, i) => {
      return i !== index;
    });
    setTodoList(updatedList);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <div>
          <button onClick={onSubmitHandler}>Submit</button>
        </div>
      </div>
      <ul>
        {todoList.map((item, index) => {
          return (
            <li key={index}>
              <span>{item}</span>
              <button
                onClick={() => {
                  deleteTodo(index);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
