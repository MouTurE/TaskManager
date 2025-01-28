
interface Props {
    children: string;
    
  }


const TaskItem = ({children}:Props) => {
  

  return ( 
    <li className = "tasks-list-item"><div>{children}</div> </li>
  );
}

export default TaskItem;
