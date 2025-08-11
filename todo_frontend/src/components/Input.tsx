interface InputProps {
  inpValue: string;
  onSetValue: (targetValue: string) => void;
  onAddTodo: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmitTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  inputEl: React.RefObject<HTMLInputElement>;
}

export default function Input({
  inpValue,
  onSetValue,
  onAddTodo,
  onSubmitTodo,
  inputEl,
}: InputProps) {
  return (
    <div className="bg-very-light-gray dark:bg-very-dark-desaturated-blue py-5 px-5 rounded-lg flex justify-between items-center mb-6 land-phone:gap-4">
      <button
        type="submit"
        className="border border-light-grayish-blue dark:border-very-dark-grayish-blue rounded-full h-6 w-6"
        onClick={onAddTodo}
      ></button>
      <form className="w-[90%]" onSubmit={onSubmitTodo}>
        <input
          ref={inputEl}
          type="text"
          value={inpValue}
          onChange={(e) => onSetValue(e.target.value)}
          placeholder="Create a new todo..."
          className="w-full border border-none outline-none bg-inherit placeholder:text-sm text-very-dark-grayish-blue dark:text-light-grayish-blue placeholder-very-dark-grayish-blue dark:placeholder-light-grayish-blue placeholder-opacity-50 caret-bright-blue land-phone:placeholder:text-[12px]"
        ></input>
      </form>
    </div>
  );
}
