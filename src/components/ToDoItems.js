import ToDo from "./ToDo";

export default function ToDoItems({ todoList, setTodoList }) {
  function onHandleCompleteTodo(id) {
      setTodoList(todoList => todoList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  

  return (
    <>
      {todoList?.map((todo) => (
        <ToDo
          key={todo.id}
          text={todo.text}
          isCompleted={todo.completed}
          onSetCompleted={() => onHandleCompleteTodo(todo.id)}
        />
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
