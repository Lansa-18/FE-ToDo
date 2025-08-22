import iconCheck from "../images/icon-check.svg";
import iconCross from "../images/icon-cross.svg";

interface ToDoProps {
  text: string;
  isCompleted: boolean;
  onSetCompleted: () => void;
  onRemoveTodo: () => void;
}

export default function ToDo({
  text,
  isCompleted,
  onSetCompleted,
  onRemoveTodo,
}: ToDoProps) {
  return (
    <div className="flex justify-between items-center border-b-[1px] border-very-light-grayish-blue-lightmode dark:border-very-dark-grayish-blue bg-very-light-gray dark:bg-very-dark-desaturated-blue py-5 px-5 ">
      <section
        onClick={() => {
          onSetCompleted();
        }}
        className="border-none w-[92%] flex justify-between items-center cursor-pointer land-phone:gap-4"
      >
        <div className="flex justify-center items-center p-px bg-light-grayish-blue-lightmode dark:bg-very-dark-grayish-blue hover:bg-check-background rounded-full">
          <button
            className={
              isCompleted
                ? "bg-check-background border border-light-grayish-blue-lightmode dark:border-very-dark-grayish-blue rounded-full p-1.5 flex items-center justify-center "
                : "border border-transparent rounded-full p-2.5 flex items-center justify-center bg-very-light-gray dark:bg-very-dark-desaturated-blue"
            }
          >
            {isCompleted ? <img src={iconCheck} alt="check-icon"></img> : ""}
          </button>
        </div>
        <div className="w-[88%] border border-none outline-none bg-inherit">
          <p
            className={
              isCompleted
                ? "line-through text-light-grayish-blue-lightmode dark:text-dark-grayish-blue "
                : "text-dark-grayish-blue-lightmode dark:text-light-grayish-blue hover:text-very-dark-grayish-blue-lightmode dark:hover:text-light-grayish-blue-hover"
            }
          >
            {text}
          </p>
        </div>
      </section>
      <img
        className="h-3 w-3 cursor-pointer"
        onClick={() => onRemoveTodo()}
        src={iconCross}
        alt="cross-icon"
      ></img>
    </div>
  );
}
