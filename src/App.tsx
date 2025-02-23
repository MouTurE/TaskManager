import { useState } from "react";
import ListGroup from "./components/ListGroup";


//Category Item
interface categoryItemProps{
  children: string;
  deleteCategory: (value: string) => void;
  selectCategory: (value: string) => void;
}

function CategoryItem ({children,deleteCategory,selectCategory}:categoryItemProps) {
  return <div style={{display: "flex"}}>
    <li style={{cursor:"pointer"}} onClick={()=>{selectCategory(children)}}><b>{children}</b></li>
    <span style={{marginLeft : "10px", cursor:"pointer"}} onClick={()=>{deleteCategory(children)}}>|| Remove</span>
  </div>
}


//Wrapper for category
interface categoryWrapperProps {
  visible: boolean;
  children: string;
}

function CategoryWrapper ({visible, children}:categoryWrapperProps) {

  const [uncompletedTasks, setUncompletedTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [textInput_visible, textInput_toggleVisibility] = useState(false);

  const CreateTaskButton = (
    <div>
           <button onClick={()=>{textInput_toggleVisibility(!textInput_visible)}}>Create New Task</button>
           {textInput_visible? <input onKeyDown={(e) => {
       if (e.key === "Enter")
        createNewTask((e.target as HTMLInputElement).value);
         
       }} type="text" autoFocus /> : null}

      
         </div>
 )

  const createNewTask = (value: string) => {
    if (value.trim() === "") 
      {
        textInput_toggleVisibility(!textInput_visible);
        return;
      } // Prevent empty categories
    setUncompletedTasks([...uncompletedTasks, value]); // Add new category
    textInput_toggleVisibility(!textInput_visible);
  };

  const transferTask = (value: string, bool: boolean) => {
    if (bool) {
      setCompletedTasks([...completedTasks, value]);
      setUncompletedTasks(uncompletedTasks.filter((uncompletedTask) => uncompletedTask !== value));
    } else {
      setUncompletedTasks([...uncompletedTasks, value]);
      setCompletedTasks(completedTasks.filter((completedTask) => completedTask !== value));
    }
  }

  const progressBar = {
    width:"100px",
    height:"10px",
    border:"2px solid black",
    padding:"2px"
  }

  const progressPrecentage = ((completedTasks.length * 100) / (uncompletedTasks.length + completedTasks.length)).toFixed(1);

  return <div style={{display: visible ? "block" : "none"}}>
    <h1>{children}</h1>
    {CreateTaskButton}

    
    <ul className="taskList">

      {/* List of uncompleted tasks */}
      {uncompletedTasks.map((uncompletedTask, index) => (
        <TaskItem completed={false} transferTask={transferTask} deleteTask={(value) => {setUncompletedTasks(uncompletedTasks.filter((uncompletedTask) => uncompletedTask !== value));}} 
           key={index}>{uncompletedTask}</TaskItem>
      ))}

      {/* A line that divides uncompleted and completed tasks visualy */}
      { completedTasks.length > 0 && uncompletedTasks.length > 0 ? <hr /> : null}

      {/* List of completed tasks */}
      {completedTasks.map((completedTask, index) => (
        <TaskItem completed={true} transferTask={transferTask} deleteTask={(value) => {setCompletedTasks(completedTasks.filter((completedTask) => completedTask !== value));}} 
           key={index}>{completedTask}</TaskItem> ))}
    </ul>
    
      

    <div style={{display:"flex",alignItems:"center"}}>

      <p style={{marginRight:"5px"}}> Completed: {completedTasks.length > 0? progressPrecentage : 0}%</p>
      <div style={progressBar}>
        <div style={{width: completedTasks.length > 0 ? `${progressPrecentage}%` : '0%', height: "100%", backgroundColor: "black",transition:"0.5s width"}}></div>
      </div>
    </div>
    

  </div>
}

interface taskItemProps {
  children: string;
  completed: boolean;
  transferTask: (value: string, bool: boolean) => void;
  deleteTask: (value: string) => void;
}

function TaskItem ({children,completed,transferTask,deleteTask}:taskItemProps) {
  

  const TaskItemStyle = {
    cursor:"pointer",
    listStyleType: "none"
  }

  const circle = <span style={{marginLeft:"10px", cursor:"pointer"}}>⚪</span>
  const fullCircle = <span style={{marginLeft:"10px", cursor:"pointer"}}>⚫</span>
  const removeButton = <span onClick={()=> {completed? deleteTask(children):deleteTask(children)}} style={{marginLeft:"10px", cursor:"pointer"}}>|| Remove</span>
  

  const completedTask = <div style={{display:"flex"}}>
      {fullCircle}
      <li style={TaskItemStyle} onClick={()=>{transferTask(children,false); } }> <b><s>{children}</s></b> </li>
      {removeButton}
    </div>

  const uncompletedTask = <div style={{display:"flex"}}>
    {circle}
  <li style={TaskItemStyle} onClick={()=>{transferTask(children,true)}}><b>{children}</b></li>
  {removeButton}
</div>
  
  return completed ?  completedTask: uncompletedTask;
} 

function App () {

  const MainPage = <>
    <header> 
      <div className="header-box">
        <h1>Task Manager App</h1> 
      </div>
      
      
    
    </header>
    
    <ListGroup></ListGroup>
    
  </>

  const [textInput_visible, textInput_toggleVisibility] = useState(false);
  
 

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory,selectCategory] = useState<string>("");

  const [tasks, setTasks] = useState<string[]>([]);
  
  const [inputValue, setInputValue] = useState("");
  

  const createNewCategory = (value: string) => {
    if (value.trim() === "") 
      {
        textInput_toggleVisibility(!textInput_visible);
        return;
      } // Prevent empty categories
    setCategories([...categories, value]); // Add new category
    textInput_toggleVisibility(!textInput_visible);
  };

  

  const CreateCategegoryButton = (
    <div>
           <button onClick={()=>{textInput_toggleVisibility(!textInput_visible)}}>Create New Category</button>
           {textInput_visible? <input onKeyDown={(e) => {
       if (e.key === "Enter")
         createNewCategory((e.target as HTMLInputElement).value);
         
       }} type="text" autoFocus /> : null}

      
         </div>
 )

 

 const deleteCategoryInList = (value: string) => {
  setCategories(categories.filter((category) => category !== value));
 };

 

  const Test = <div>
    <h1>Categories</h1> 
    {CreateCategegoryButton}   
    <ul className="categoryList">
      {categories.map((category, index) => (
        <CategoryItem selectCategory={()=>{selectCategory(category)}} deleteCategory={deleteCategoryInList} key={category}>{category}</CategoryItem>))}
    </ul>

    {categories.map((category, index) => (
     <>
     <CategoryWrapper key={category} visible={selectedCategory === category?true:false}> 
      {category}</CategoryWrapper>
     </>
      
      
    ))}
  </div>

    return Test;
}



export default App;