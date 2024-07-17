import { useState, useRef } from "react";
import { useKey } from "./useKey";
import Input from "./components/Input";
import ToDoItems from "./components/ToDoItems";
import iconSun from "./images/icon-sun.svg";
import iconMoon from "./images/icon-moon.svg";
import iconCross from "./images/icon-cross.svg";

export default function App() {
  const [inpValue, setInpValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputEl = useRef(null);

  function handleAddTodo(e) {
    e.preventDefault();

    setTodoList((todoArr) => [
      ...todoArr,
      {
        id: Date.now(),
        text: inpValue,
        completed: false,
      },
    ]);
    setInpValue("");
    inputEl.current.focus();
  }

  function toggleTodoCompletion(id) {
    setTodoList((todoList) =>
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleClearCompleted() {
    setTodoList(todoList.filter((todo) => !todo.completed));
  }

  const todosLeft = todoList.filter((todo) => !todo.completed).length;

  // useKey("Enter", () => inputEl.current.focus());

  return (
    <div className="flex flex-col h-screen font-josefin">
      <article className="basis-[40%] bg-desktop-dark bg-cover"></article>
      <article className="basis-[60%] bg-very-dark-blue"></article>

      <main className="h-2/5 w-1/3 absolute top-[10%] left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-[2rem] text-light-grayish-blue tracking-widest font-bold">
            TODO
          </h1>
          <img className="block" src={iconSun} alt="sun"></img>
        </div>

        <Input
          inputEl={inputEl}
          onAddTodo={handleAddTodo}
          inpValue={inpValue}
          onSetValue={setInpValue}
        />
        <ToDoItems
          todosLeft={todosLeft}
          todoList={todoList}
          setTodoList={setTodoList}
          onToggleTodoCompletion={toggleTodoCompletion}
          onClearCompleted={handleClearCompleted}
        />
      </main>
    </div>
  );
}
