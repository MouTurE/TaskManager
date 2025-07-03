import { useState } from "react";

interface Props {
  children: string;
  taskID: string;
  taskChangedToCompleted: () => void;
  taskChangedToDefault: () => void;
}

const completedText = {
  color: "gray",
};

function TaskItem({
  children,
  taskChangedToCompleted,
  taskChangedToDefault,
}: Props) {
  const [completed, toggleCompleted] = useState(false);

  const toggleState = () => {
    toggleCompleted(!completed);

    if (completed) {
      taskChangedToCompleted();
    } else {
      taskChangedToDefault();
    }
  };

  const checkBox = (
    <div
      onClick={toggleState}
      className={
        completed === false ? "task-checkbox" : "task-checkbox-completed"
      }
    ></div>
  );

  const uncompletedTask = (
    <li className={"tasks-list-item"}>
      {checkBox} <div>{children}</div>{" "}
    </li>
  );

  const completedTask = (
    <li className={"tasks-list-item"}>
      {checkBox}
      <div>
        {" "}
        <s style={completedText}>{children}</s>{" "}
      </div>{" "}
    </li>
  );

  return <>{completed == true ? completedTask : uncompletedTask}</>;
}

export default TaskItem;
