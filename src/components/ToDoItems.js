import ToDo from "./ToDo";

export default function ToDoItems({ todoList, isCompleted, onSetCompleted }) {
  return (
    <>
      {todoList?.map((todo) => (
        <ToDo
          key={todo.text}
          text={todo.text}
          isCompleted={isCompleted}
          onSetCompleted={onSetCompleted}
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
