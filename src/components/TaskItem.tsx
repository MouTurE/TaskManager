
interface Props {
    children: string;
    completed: boolean;
  }


const completedText = {

  color: "gray",
}

function TaskItem ({children,completed}:Props) {
  
  const uncompletedTask = (
    <li className = {"tasks-list-item"}><div>{children}</div> </li>
  );


  const completedTask = (
    <li className = {"tasks-list-item"}><div> <s style={completedText}>{children}</s> </div> </li>
  );

  return <>
    {completed == true ? completedTask : uncompletedTask}
  </>
}

export default TaskItem;
