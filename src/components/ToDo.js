import iconCheck from "../images/icon-check.svg";

export default function ToDo({
  text,
  isCompleted,
  onSetCompleted,
}) {

  return (
    <div
      onClick={() => {
        onSetCompleted();
      }}
      className="border-b-[1px] border-very-dark-grayish-blue bg-very-dark-desaturated-blue py-5 px-5 flex justify-between items-center cursor-pointer"
    >
      <button
        className={
          isCompleted
            ? "bg-check-background border border-very-dark-grayish-blue rounded-full h-7 w-7 flex items-center justify-center"
            : "border border-very-dark-grayish-blue rounded-full h-7 w-7 flex items-center justify-center"
        }
      >
        {isCompleted ? <img src={iconCheck} alt="check-icon"></img> : ""}
      </button>
      <div className="w-[90%] border border-none outline-none bg-inherit text-light-grayish-blue placeholder-light-grayish-blue placeholder-opacity-50">
        <p className={isCompleted ? "line-through" : ""}>{text}</p>
      </div>
    </div>
  );
}
