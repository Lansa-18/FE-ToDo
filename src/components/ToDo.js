export default function ToDo({ text, isCompleted, onSetCompleted }) {
    // const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div
      className="border-b-[1px] border-very-dark-grayish-blue bg-very-dark-desaturated-blue py-5 px-5 flex justify-between items-center cursor-pointer"
    >
      <button className="border border-very-dark-grayish-blue rounded-full h-6 w-6"></button>
      <div className="w-[90%] border border-none outline-none bg-inherit text-light-grayish-blue placeholder-light-grayish-blue placeholder-opacity-50">
        <p onClick={onSetCompleted} className={isCompleted ? "line-through" : ""}>{text}</p>
      </div>
    </div>
  );
}
