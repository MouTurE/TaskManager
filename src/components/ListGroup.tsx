import TaskItem from "./TaskItem";
import CategoryItem from "./CategoryItem";
function ListGroup() {
    const categories = ["Category 1", "Category 2", "Category 3"];

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

            /* Automate this part*/

            {categories.map(category => (
              <CategoryItem key={category} categoryName={category} Tasks={[`A task created for "${category}"`]}></CategoryItem>
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
