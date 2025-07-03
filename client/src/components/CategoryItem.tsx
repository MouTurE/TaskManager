import { useState } from "react";
import TaskItem from "./TaskItem";

interface Props {
  categoryName: string;
  Tasks: string[];
}

function CategoryItem({ categoryName, Tasks }: Props) {
  const [completedTask, setCompletedTask] = useState(1);

  const decrease = () => {
    setCompletedTask(completedTask - 1);
    console.log("Completed task:", completedTask);
  };

  const increase = () => {
    setCompletedTask(completedTask + 1);
    console.log("Completed task:", completedTask);
  };

  return (
    <div className="category-task-holder" id={categoryName}>
      {" "}
      {Tasks.map((Task, index) => (
        <TaskItem
          taskID={`${categoryName} - Task ${index}`}
          key={`${categoryName} - Task ${index}`}
          taskChangedToCompleted={increase}
          taskChangedToDefault={decrease}
        >
          {Task}
        </TaskItem>
      ))}{" "}
    </div>
  );
}

export default CategoryItem;
