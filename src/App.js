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

  function onHandleAddTodo() {
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

  useKey("Enter", onHandleAddTodo);

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
          onAddTodo={onHandleAddTodo}
          inpValue={inpValue}
          onSetValue={setInpValue}
        />
        <ToDoItems todoList={todoList} setTodoList={setTodoList} />
      </main>
    </div>
  );
}



