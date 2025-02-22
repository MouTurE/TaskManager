import { useState, useEffect } from "react";
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


  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [textInput_visible, textInput_toggleVisibility] = useState(false);
  const [progress, setProgress] = useState(0);

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
    setTasks([...tasks, value]); // Add new category
    textInput_toggleVisibility(!textInput_visible);
  };

  

  return <div style={{display: visible ? "block" : "none"}}>
    <h1>{children}</h1>
    {CreateTaskButton}
    <ul className="taskList">
      {tasks.map((task, index) => (
        <TaskItem deleteTask={(value,boolean) => {
          setTasks(tasks.filter((task) => task !== value));
          if (boolean) {
            setProgress(progress - 1);
          }

        }} changeProgress={(value) => {
          if (progress + value < 0 || progress + value > tasks.length)
            return;
          setProgress(progress + value)
        }} key={index}>{task}</TaskItem>
      ))}
    </ul>

    <p> Completed: {progress} / {tasks.length} </p>
  </div>
}

interface taskItemProps {
  children: string;
  changeProgress: (value: number) => void;
  deleteTask: (value: string,decreaseProgress:boolean) => void;
}

function TaskItem ({children,changeProgress,deleteTask}:taskItemProps) {
  const [completed,toggleCompleted] = useState(false); 

  const TaskItemStyle = {
    cursor:"pointer",
    listStyleType: "none"
  }

  const circle = <span style={{marginLeft:"10px", cursor:"pointer"}}>⚪</span>
  const fullCircle = <span style={{marginLeft:"10px", cursor:"pointer"}}>⚫</span>
  const removeButton = <span onClick={()=> {completed? deleteTask(children,true):deleteTask(children,false)}} style={{marginLeft:"10px", cursor:"pointer"}}>|| Remove</span>


  const completedTask = <div style={{display:"flex"}}>
      {fullCircle}
      <li style={TaskItemStyle} onClick={()=>{toggleCompleted(!completed)
        toggleCompleted(!completed);
        if (!completed) {
          changeProgress(1);
        } else {
          changeProgress(-1);
        }
      }}><b><s>{children}</s></b></li>
      {removeButton}
    </div>

  const uncompletedTask = <div style={{display:"flex"}}>
    {circle}
  <li style={TaskItemStyle} onClick={()=>{
    toggleCompleted(!completed);
    if (!completed) {
      changeProgress(1);
    } else {
      changeProgress(-1);
    }}}><b>{children}</b></li>
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