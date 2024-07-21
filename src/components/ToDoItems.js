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
    <div className=" flex flex-col shadow-lg">
      {filteredTodo?.map((todo) => (
        <ToDo
          key={todo.id}
          text={todo.text}
          isCompleted={todo.completed}
          onSetCompleted={() => onToggleTodoCompletion(todo.id)}
          onRemoveTodo={() => onRemoveTodo(todo.id)}
        />
      ))}

      <FilterTodo>
        <p className="cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover">
          {todosLeft} items left
        </p>
        <div className="flex justify-between w-1/3 land-phone:hidden">
          <p
            className={`${
              activeFilter === "all"
                ? "text-bright-blue cursor-pointer"
                : "cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </p>
          <p
            className={`${
              activeFilter === "active"
                ? "text-bright-blue cursor-pointer"
                : "cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
            }`}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </p>
          <p
            className={`${
              activeFilter === "completed"
                ? "text-bright-blue cursor-pointer"
                : "cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
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
      </FilterTodo>

      <section className="hidden bg-very-light-gray dark:bg-very-dark-desaturated-blue land-phone:flex justify-center items-center gap-6 mt-5 px-28 text-dark-grayish-blue dark:text-dark-grayish-blue rounded-lg py-4">
        <p
          className={`${
            activeFilter === "all"
              ? "text-bright-blue cursor-pointer"
              : "cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </p>
        <p
          className={`${
            activeFilter === "active"
              ? "text-bright-blue cursor-pointer"
              : "cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
          }`}
          onClick={() => handleFilterChange("active")}
        >
          Active
        </p>
        <p
          className={`${
            activeFilter === "completed"
              ? "text-bright-blue cursor-pointer"
              : "cursor-pointer hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </p>
      </section>
    </div>
  );
}

function FilterTodo({ children }) {
  return (
    <div className="bg-very-light-gray dark:bg-very-dark-desaturated-blue flex justify-between items-center text-[.8rem] text-dark-grayish-blue dark:text-dark-grayish-blue py-4 px-5 shadow-lg laptop:text-[.7rem] land-phone:text-[.8rem]">
      {children}
    </div>
  );
}
