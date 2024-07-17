import iconCheck from "../images/icon-check.svg";
import iconCross from "../images/icon-cross.svg";

export default function ToDo({
  text,
  isCompleted,
  onSetCompleted,
  onRemoveTodo,
}) {
  return (
    <div className="flex justify-between items-center border-b-[1px]  border-very-dark-grayish-blue bg-very-dark-desaturated-blue py-5 px-5 ">
      <section
        onClick={() => {
          onSetCompleted();
        }}
        className="border-none w-[92%] flex justify-between items-center cursor-pointer"
      >
        <div className="flex justify-center items-center p-px bg-very-dark-grayish-blue hover:bg-check-background rounded-full ease-linear">
          <button
            className={
              isCompleted
                ? "bg-check-background border border-very-dark-grayish-blue rounded-full h-6 w-6 flex items-center justify-center "
                : "border border-transparent rounded-full h-6 w-6 flex items-center justify-center bg-very-dark-desaturated-blue"
            }
          >
            {isCompleted ? <img src={iconCheck} alt="check-icon"></img> : ""}
          </button>
        </div>
        <div className="w-[88%] border border-none outline-none bg-inherit text-light-grayish-blue placeholder-light-grayish-blue placeholder-opacity-50">
          <p
            className={
              isCompleted
                ? "line-through"
                : "hover:text-light-grayish-blue-hover"
            }
          >
            {text}
          </p>
        </div>
      </section>
      <img
        className="h-5 w-5 cursor-pointer"
        onClick={() => onRemoveTodo()}
        src={iconCross}
        alt="cross-icon"
      ></img>
    </div>
  );
}
