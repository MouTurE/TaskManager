import TaskItem from "./TaskItem";

interface Props {

    categoryName : string;
    Tasks : string[];
    
}



function CategoryItem ({categoryName,Tasks}:Props)  {


    
    return (

        <div className="category-task-holder"  id={categoryName}> {Tasks.map((Task,index) => (
            <>
            <TaskItem completed={false} key={`${categoryName} Task ${index}`} >{Task}</TaskItem>
            <TaskItem completed={true} key={`${categoryName} Task ${index}`} >{Task}</TaskItem> 
            </>
        ))}  </div>
    );
}

export default CategoryItem;