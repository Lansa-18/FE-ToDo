import { useState, useRef } from "react";
import { useKey } from "./useKey";
import iconCheck from "./images/icon-check.svg";
import iconSun from "./images/icon-sun.svg";
import iconMoon from "./images/icon-moon.svg";
import iconCross from "./images/icon-cross.svg";

export default function App() {
  const [inpValue, setInpValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const inputEl = useRef(null);

  function onHandleAddTodo() {
    setTodoList((todoArr) => [
      ...todoArr,
      {
        text: inpValue,
        completed: isCompleted,
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
          inputEl = {inputEl}
          onAddTodo={onHandleAddTodo}
          inpValue={inpValue}
          onSetValue={setInpValue}
        />
        <ToDoItems todoList={todoList} />
      </main>
    </div>
  );
}

function Input({ inpValue, onSetValue, onAddTodo, inputEl }) {
  return (
    <div className="bg-very-dark-desaturated-blue py-5 px-5 rounded-lg flex justify-between items-center mb-6">
      <button
        className="border border-very-dark-grayish-blue rounded-full h-6 w-6"
        onClick={onAddTodo}
      ></button>
      <input
        ref={inputEl}
        type="text"
        value={inpValue}
        onChange={(e) => onSetValue(e.target.value)}
        placeholder="Create a new todo..."
        className="w-[90%] border border-none outline-none bg-inherit text-light-grayish-blue placeholder-light-grayish-blue placeholder-opacity-50"
      ></input>
    </div>
  );
}

function ToDoItems({ todoList }) {
  return (
    <>
      {todoList?.map((todo) => (
        <ToDo key={todo.text} text={todo.text} />
      ))}
      <section className="bg-very-dark-desaturated-blue flex justify-between items-center text-[.8rem] text-dark-grayish-blue py-4 px-5">
        <p className="cursor-pointer">X items left</p>
        <div className="flex justify-between w-1/3">
          <p className="cursor-pointer">All</p>
          <p className="cursor-pointer">Active</p>
          <p className="cursor-pointer">Completed</p>
        </div>
        <p className="cursor-pointer">Clear Completed</p>
      </section>
    </>
  );
}

function ToDo({ text }) {
  return (
    <div className="border-b-[1px] border-very-dark-grayish-blue bg-very-dark-desaturated-blue py-5 px-5 flex justify-between items-center cursor-pointer">
      <button className="border border-very-dark-grayish-blue rounded-full h-6 w-6"></button>
      <div className="w-[90%] border border-none outline-none bg-inherit text-light-grayish-blue placeholder-light-grayish-blue placeholder-opacity-50">
        {text}
      </div>
    </div>
  );
}
