export default function Input({ inpValue, onSetValue, onAddTodo, inputEl }) {
  return (
    <div className="bg-very-dark-desaturated-blue py-5 px-5 rounded-lg flex justify-between items-center mb-6">
      <button
        className="border border-very-dark-grayish-blue rounded-full h-6 w-6"
        onClick={onAddTodo}
      ></button>
      <form className="w-[90%]" onSubmit={onAddTodo}>
        <input
          ref={inputEl}
          type="text"
          value={inpValue}
          onChange={(e) => onSetValue(e.target.value)}
          placeholder="Create a new todo..."
          className="w-full border border-none outline-none bg-inherit text-light-grayish-blue placeholder-light-grayish-blue placeholder-opacity-50"
        ></input>
      </form>
    </div>
  );
}
