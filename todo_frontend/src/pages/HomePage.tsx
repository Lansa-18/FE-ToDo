import iconSun from "../images/icon-sun.svg";
import iconMoon from "../images/icon-moon.svg";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import ToDoItems from "../components/ToDoItems";
import type { TodoObj } from "../lib/types";
import "../index.css";

export default function HomePage() {
  const [inpValue, setInpValue] = useState("");
  const [todoList, setTodoList] = useState<TodoObj[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const inputEl = useRef<HTMLInputElement>(null!);

  function handleToggleColorMode() {
    setIsDarkMode((mode) => !mode);
  }

  function handleAddTodo(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    if (!inpValue.trim()) return;

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

  function handleRemoveTodo(id: number) {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  }

  function toggleTodoCompletion(id: number) {
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

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
      } else {
        document.documentElement.classList.remove("dark");
        document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
      }
    },
    [isDarkMode]
  );

  return (
    <div className="flex flex-col min-h-[100vh] font-josefin body">
      <article className="bg-desktop-light dark:bg-desktop-dark min-h-[40vh] bg-cover"></article>
      <article className="dark:bg-very-dark-blue min-h-[60vh] bg-repeat-y"></article>

      <main className="w-1/3 absolute top-[10%] left-1/2 -translate-x-1/2 laptop:w-[40%] custom-1050:w-[43%] custom-915:w-[49%] custom-850:w-[51%] land-phone:w-[55%] phone:w-[70%]">
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
          onSubmitTodo={handleAddTodo}
          inpValue={inpValue}
          onSetValue={setInpValue}
        />
        <ToDoItems
          todosLeft={todosLeft}
          todoList={todoList}
          onToggleTodoCompletion={toggleTodoCompletion}
          onClearCompleted={handleClearCompleted}
          onRemoveTodo={handleRemoveTodo}
        />
      </main>
    </div>
  );
}
