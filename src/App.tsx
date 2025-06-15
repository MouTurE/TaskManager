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
    <div style={{ display: "flex", borderBottom: "1px solid gray" }}>
      <li
        style={{ fontSize: "1.5vw", cursor: "pointer" }}
        onClick={() => {
          selectCategory(children);
        }}
      >
        <b>{children}</b>
      </li>
      <span
        style={{ fontSize: "1.5vw", cursor: "pointer" }}
        onClick={() => {
          deleteCategory(children);
        }}
      >
        Delete
      </span>
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

  // const [inputValue, setInputValue] = useState("");
  const [textInput_visible, textInput_toggleVisibility] = useState(false);

  const CreateTaskButton = (
    <div className="CreateButton-Task">
      <button
        onClick={() => {
          textInput_toggleVisibility(!textInput_visible);
        }}
      >
        New Task +
      </button>
      {textInput_visible ? (
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter")
              createNewTask((e.target as HTMLInputElement).value);
          }}
          type="text"
          autoFocus
        />
      ) : null}
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
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",

        display: visible ? "flex" : "none",
      }}
    >
      <div style={{ width: "90%" }}>
        <h1 style={{ fontSize: "2em", color: "#1E1E1E" }}>{children}</h1>
        {CreateTaskButton}

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

      <div
        style={{
          width: "90%",
          border: "0px solid red",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#1E1E1E", marginRight: "5px" }}>
          {" "}
          Completed: {completedTasks.length > 0 ? progressPrecentage : 0}%
        </p>
        <div className="ProgressBar">
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
        style={{ width: categoryVisible == true ? "100%" : "4%" }}
        className="Categories"
      >
        <h1
          style={{
            display: categoryVisible == true ? "block" : "none",
            fontSize: "3vw",
          }}
        >
          Task Manager
        </h1>
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
              fontSize: "2vw",
            }}
          >
            Categories
          </h2>
          {CreateCategegoryButton}
        </div>
        <ul
          style={{ display: categoryVisible == true ? "block" : "none" }}
          className="categoryList"
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
        >
          <button
            onClick={() => {
              setCategoryVisible(!categoryVisible);
            }}
            className="ToggleVisibility"
          >
            {categoryVisible == true ? "<" : ">"}
          </button>
        </div>
      </div>

      <div className="Tasks">
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
