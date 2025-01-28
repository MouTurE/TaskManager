import TaskItem from "./TaskItem";

interface Props {

    categoryName : string;
    Tasks : string[];
    
}



function CategoryItem ({categoryName,Tasks}:Props)  {


    
    return (

        <div className="category-task-holder"  id={categoryName}> {Tasks.map((Task,index) => ( <TaskItem key={`${categoryName} Task ${index}`} >{Task}</TaskItem> ))}  </div>
    );
}

export default CategoryItem;