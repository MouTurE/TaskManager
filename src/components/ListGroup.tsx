import CategoryItem from "./CategoryItem";
import {useState} from "react";

function ListGroup() {

  // Category creation
    
   
  const [visible, toggleVisibility] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
    
  function changeVisibility () {
    toggleVisibility(!visible);
  }


  const createNewCategory = (value: string) => {
    if (value.trim() === "") 
      {
        changeVisibility();
        return;
      } // Prevent empty categories
    setCategories([...categories, value]); // Add new category
    changeVisibility();
  };
  
  
  const CreateCategegoryButton = (
     <div>
            <button onClick={changeVisibility}>Create New Category</button>
            {visible? <input onKeyDown={(e) => {
        if (e.key === "Enter")
          createNewCategory((e.target as HTMLInputElement).value);
          
        }} type="text" autoFocus /> : null}

       
          </div>
  )

  const CreateTaskButton = (
    <div>
           <button onClick={changeVisibility}>Create New Task</button>
           {visible? <input onKeyDown={(e) => {
       if (e.key === "Enter")
         createNewCategory((e.target as HTMLInputElement).value);
         
       }} type="text" autoFocus /> : null}

      
         </div>
 )



  
  // Rest of the code

    const selectCategory = (selectedCategory:string) => {
        const taskHolders = document.querySelectorAll<HTMLElement>(".category-task-holder");
        taskHolders.forEach(taskHolder => {

            if (taskHolder.id == selectedCategory) {

                taskHolder.style.display = "block";
                const taskHeader = document.getElementById("tasks-header");
                if (taskHeader)
                    taskHeader.textContent = `Tasks [${selectedCategory}]`;
            }else {

                taskHolder.style.display = "none";
            }
        });
    };

  return (
    <>
      <div className="tasks-container">
        <div className="tasks-categories">
          <ul className="list-group">
            <h1>Categories</h1>

            {CreateCategegoryButton}

            {categories.map((category) => (
              <li onClick={() => selectCategory(category)} key={category} className="categories-list-item">
                {category}
              </li>
            ))}

          </ul>
        </div>

        <div className="tasks-items">
          <ul className="list-group">
            <h1 id="tasks-header">Tasks</h1>

            {CreateTaskButton}

            {categories.map(category => (
              <CategoryItem key={category} categoryName={category} Tasks={tasks}></CategoryItem>
            ))};
           
           
          </ul>
          <div className="progress-bar-container">
            <p>Progress[50%]:</p>
            <div className="progress-bar">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListGroup;
