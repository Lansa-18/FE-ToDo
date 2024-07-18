import { useState } from "react";
import ToDo from "./ToDo";

export default function ToDoItems({
  todoList,
  todosLeft,
  onToggleTodoCompletion,
  onClearCompleted,
  onRemoveTodo,
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
          onRemoveTodo={() => onRemoveTodo(todo.id)}
        />
      ))}
      <section className="bg-very-light-gray dark:bg-very-dark-desaturated-blue flex justify-between items-center text-[.8rem] text-dark-grayish-blue dark:text-dark-grayish-blue py-4 px-5 shadow-lg">
        <p className="cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover">
          {todosLeft} items left
        </p>
        <div className="flex justify-between w-1/3">
          <p
            className={`cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover ${
              activeFilter === "all" ? "text-bright-blue" : ""
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </p>
          <p
            className={`cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover ${
              activeFilter === "active" ? "text-bright-blue" : ""
            }`}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </p>
          <p
            className={`cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover ${
              activeFilter === "completed" ? "text-bright-blue" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </p>
        </div>
        <p
          className="cursor-pointer hover:text-light-grayish-blue-hover"
          onClick={onClearCompleted}
        >
          Clear Completed
        </p>
      </section>
    </>
  );
}
