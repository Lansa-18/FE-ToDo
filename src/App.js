import { useState, useRef, useEffect } from "react";
import Input from "./components/Input";
import ToDoItems from "./components/ToDoItems";
import iconSun from "./images/icon-sun.svg";
import iconMoon from "./images/icon-moon.svg";

export default function App() {
  const [inpValue, setInpValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const inputEl = useRef(null);

  function handleToggleColorMode() {
    setIsDarkMode((mode) => !mode);
  }

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

  function handleRemoveTodo(id) {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
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

  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);


  // useKey("Enter", () => inputEl.current.focus());

  return (
    <div className="flex flex-col h-screen font-josefin">
      <article
        className='bg-desktop-light dark:bg-desktop-dark basis-[40%] bg-cover'
      ></article>
      <article
        className='dark:bg-very-dark-blue basis-[60%]'
      ></article>

      <main className="h-2/5 w-1/3 absolute top-[10%] left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-[2rem] text-light-grayish-blue tracking-widest font-bold">
            TODO
          </h1>
          <img
            onClick={handleToggleColorMode}
            className="block"
            src={isDarkMode ? iconSun : iconMoon}
            alt="sun"
          ></img>
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
          onRemoveTodo={handleRemoveTodo}
        />
      </main>
    </div>
  );
}
