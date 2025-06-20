import { useState } from "react";

//Category Item
interface categoryItemProps {
  children: string;
  deleteCategory: (value: string) => void;
  selectCategory: (value: string) => void;
}

function CategoryItem({
  children,
  deleteCategory,
  selectCategory,
}: categoryItemProps) {
  return (
    <div className="CategoryWrapper" style={{}}>
      <li
        style={{}}
        onClick={() => {
          selectCategory(children);
        }}
      >
        <b>{children}</b>
      </li>
      <div>
        <span
          style={{}}
          onClick={() => {
            deleteCategory(children);
          }}
        >
          Delete
        </span>
      </div>
    </div>
  );
}

//Wrapper for category
interface categoryWrapperProps {
  visible: boolean;
  children: string;
}

function CategoryWrapper({ visible, children }: categoryWrapperProps) {
  const [uncompletedTasks, setUncompletedTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [textInput_visible, textInput_toggleVisibility] = useState(false);

  const handleButtonClick = () => {
    console.log("Input Value:", inputValue);
    // You can call any other function here and pass inputValue as needed
    createNewTask(inputValue);
    setInputValue("");
  };

  const CreateTaskElement = (
    <div className="CreateButton-Task">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleButtonClick();
        }}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        value={inputValue || ""}
        autoFocus
      />

      <button onClick={handleButtonClick}>{">"}</button>
    </div>
  );

  const createNewTask = (value: string) => {
    if (value.trim() === "") {
      textInput_toggleVisibility(!textInput_visible);
      return;
    } // Prevent empty categories
    setUncompletedTasks([...uncompletedTasks, value]); // Add new category
    textInput_toggleVisibility(!textInput_visible);
  };

  const transferTask = (value: string, bool: boolean) => {
    if (bool) {
      setCompletedTasks([...completedTasks, value]);
      setUncompletedTasks(
        uncompletedTasks.filter((uncompletedTask) => uncompletedTask !== value)
      );
    } else {
      setUncompletedTasks([...uncompletedTasks, value]);
      setCompletedTasks(
        completedTasks.filter((completedTask) => completedTask !== value)
      );
    }
  };

  const progressPrecentage = (
    (completedTasks.length * 100) /
    (uncompletedTasks.length + completedTasks.length)
  ).toFixed(1);

  return (
    <div
      className="Wrapper"
      style={{
        display: visible ? "flex" : "none",
      }}
    >
      <div style={{ width: "90%" }}>
        <div className="HorizontalWrapper">
          <h1 className="Header" style={{}}>
            {children}
          </h1>
        </div>

        <div className="TasksContainer">
          <ul className="taskList">
            {/* List of uncompleted tasks */}
            {uncompletedTasks.map((uncompletedTask, index) => (
              <TaskItem
                completed={false}
                transferTask={transferTask}
                deleteTask={(value) => {
                  setUncompletedTasks(
                    uncompletedTasks.filter(
                      (uncompletedTask) => uncompletedTask !== value
                    )
                  );
                }}
                key={index}
              >
                {uncompletedTask}
              </TaskItem>
            ))}
            {/* A line that divides uncompleted and completed tasks visualy */}
            {completedTasks.length > 0 && uncompletedTasks.length > 0 ? (
              <hr />
            ) : null}
            {/* List of completed tasks */}
            {completedTasks.map((completedTask, index) => (
              <TaskItem
                completed={true}
                transferTask={transferTask}
                deleteTask={(value) => {
                  setCompletedTasks(
                    completedTasks.filter(
                      (completedTask) => completedTask !== value
                    )
                  );
                }}
                key={index}
              >
                {completedTask}
              </TaskItem>
            ))}
          </ul>
        </div>
      </div>

      <div className="Tools">
        {CreateTaskElement}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: "2%",
          }}
        >
          <p style={{ color: "#1E1E1E", marginRight: "5px" }}>
            {" "}
            [ {completedTasks.length > 0 ? progressPrecentage : 0}% ]
          </p>
          <div className="ProgressBar" style={{}}>
            <div
              style={{
                width:
                  completedTasks.length > 0 ? `${progressPrecentage}%` : "0%",
                height: "100%",
                backgroundColor: "#4EBE51",
                transition: "0.5s width",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface taskItemProps {
  children: string;
  completed: boolean;
  transferTask: (value: string, bool: boolean) => void;
  deleteTask: (value: string) => void;
}

function TaskItem({
  children,
  completed,
  transferTask,
  deleteTask,
}: taskItemProps) {
  const TaskItemStyle = {
    cursor: "pointer",
    listStyleType: "none",
  };

  const circle = <span className="Checkbox-unchecked"></span>;
  const fullCircle = <span className="Checkbox-checked"></span>;
  const removeButton = (
    <span
      className="DeleteTaskButton"
      onClick={() => {
        completed ? deleteTask(children) : deleteTask(children);
      }}
    >
      Delete
    </span>
  );

  const completedTask = (
    <div className="TaskElement" style={{ display: "flex" }}>
      {fullCircle}
      <li
        style={TaskItemStyle}
        onClick={() => {
          transferTask(children, false);
        }}
      >
        {" "}
        <b style={{ color: "gray" }}>
          <s>{children}</s>
        </b>{" "}
      </li>
      {removeButton}
    </div>
  );

  const uncompletedTask = (
    <div className="TaskElement" style={{ display: "flex" }}>
      {circle}
      <li
        style={TaskItemStyle}
        onClick={() => {
          transferTask(children, true);
        }}
      >
        <b>{children}</b>
      </li>
      {removeButton}
    </div>
  );

  return completed ? completedTask : uncompletedTask;
}

function App() {
  const [textInput_visible, textInput_toggleVisibility] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, selectCategory] = useState<string>("");
  const [categoryVisible, setCategoryVisible] = useState<boolean>(true);

  //const [tasks, setTasks] = useState<string[]>([]);

  // const [inputValue, setInputValue] = useState("");

  const createNewCategory = (value: string) => {
    if (value.trim() === "") {
      textInput_toggleVisibility(!textInput_visible);
      return;
    } // Prevent empty categories
    setCategories([...categories, value]); // Add new category
    textInput_toggleVisibility(!textInput_visible);
  };

  const CreateCategegoryButton = (
    <div
      style={{ display: categoryVisible == true ? "block" : "none" }}
      className="CreateButton"
    >
      <button
        onClick={() => {
          textInput_toggleVisibility(!textInput_visible);
        }}
      >
        +
      </button>
      {textInput_visible ? (
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter")
              createNewCategory((e.target as HTMLInputElement).value);
          }}
          type="text"
          autoFocus
        />
      ) : null}
    </div>
  );

  const deleteCategoryInList = (value: string) => {
    setCategories(categories.filter((category) => category !== value));
  };

  const Test = (
    <div className="ScreenHolder">
      <div
        style={{
          width: categoryVisible == true ? "100vw" : "4vw",
        }}
        className="Categories"
      >
        <div className="HorizontalWrapper">
          <h1
            style={{
              display: categoryVisible == true ? "block" : "none",
            }}
          >
            Task Manager
          </h1>

          <button
            onClick={() => {
              setCategoryVisible(!categoryVisible);
            }}
            className="ToggleVisibility"
          >
            {categoryVisible == true ? "<" : ">"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            border: "0px solid red",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              display: categoryVisible == true ? "block" : "none",
            }}
          >
            Categories
          </h2>
          {CreateCategegoryButton}
        </div>
        <ul
          style={{ display: categoryVisible == true ? "block" : "none" }}
          className="CategoryList"
        >
          {categories.map((category, index) => (
            <CategoryItem
              selectCategory={() => {
                selectCategory(category);
              }}
              deleteCategory={deleteCategoryInList}
              key={index}
            >
              {category}
            </CategoryItem>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            border: "0px solid red",
            justifyContent: "end",
          }}
        ></div>
      </div>

      <div
        className="Tasks"
        style={{
          filter: categoryVisible == true ? "blur(1px)" : "blur(0px)",
        }}
      >
        {categories.map((category, index) => (
          <>
            <CategoryWrapper
              key={index}
              visible={selectedCategory === category ? true : false}
            >
              {category}
            </CategoryWrapper>
          </>
        ))}
      </div>
    </div>
  );

  return Test;
}

export default App;
