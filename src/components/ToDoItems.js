import { useState } from "react";
import ToDo from "./ToDo";

export default function ToDoItems({
  todoList,
  todosLeft,
  onToggleTodoCompletion,
  onClearCompleted,
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  const filteredTodo = todoList.filter((todo) => {
    if (activeFilter === "active") return !todo.completed;
    if (activeFilter === "completed") return todo.completed;
    return todo;
  });

  return (
    <>
      {filteredTodo?.map((todo) => (
        <ToDo
          key={todo.id}
          text={todo.text}
          isCompleted={todo.completed}
          onSetCompleted={() => onToggleTodoCompletion(todo.id)}
        />
      ))}
      <section className="bg-very-dark-desaturated-blue flex justify-between items-center text-[.8rem] text-dark-grayish-blue py-4 px-5">
        <p className="cursor-pointer">{todosLeft} items left</p>
        <div className="flex justify-between w-1/3">
          <p
            className={`cursor-pointer ${
              activeFilter === "all" ? "text-bright-blue" : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </p>
          <p
            className={`cursor-pointer ${
              activeFilter === "active" ? "text-bright-blue" : ""
            }`}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </p>
          <p
            className={`cursor-pointer ${
              activeFilter === "completed" ? "text-bright-blue" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </p>
        </div>
        <p className="cursor-pointer" onClick={onClearCompleted}>
          Clear Completed
        </p>
      </section>
    </>
  );
}
