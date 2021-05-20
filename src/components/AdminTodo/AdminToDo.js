import React, { useEffect, useState } from "react";
import "./styles.css";

const AdminToDo = (props) => {
  const { firstName, lastName, todolist } = props;
  const [toggleState, setToggleState] = useState("Completed");
  const [filteredArray, setFilteredArray] = useState([]);

  const filteringToDo = (toggleState) => {
    var desc = [];
    todolist.map((el) => {
      if (el.status === toggleState) {
        desc.push(el.description);
      }
    });
    setFilteredArray(desc);
  };

  const toggleTab = (e) => {
    setToggleState(e.target.value);
    filteringToDo(e.target.value);
  };

  useEffect(() => {
    filteringToDo("Completed");
  }, []);

  return (
    <div className="cart">
      <div className="bloc-tabs">
        <div className="name">{`${firstName} ${lastName}'s to do list`}</div>
        <button
          value="Completed"
          className={toggleState === "Completed" ? "tabs active-tabs" : "tabs"}
          onClick={toggleTab}
        >
          Completed
        </button>
        <button
          value="Uncompleted"
          className={
            toggleState === "Uncompleted" ? "tabs active-tabs" : "tabs"
          }
          onClick={toggleTab}
        >
          Uncompleted
        </button>
        <button
          value="Deleted"
          className={toggleState === "Deleted" ? "tabs active-tabs" : "tabs"}
          onClick={toggleTab}
        >
          Deleted
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={
            toggleState === "Completed" ? "content  active-content" : "content"
          }
        >
          {filteredArray.map((el) => (
            <li>{el}</li>
          ))}
        </div>

        <div
          className={
            toggleState === "Uncompleted"
              ? "content  active-content"
              : "content"
          }
        >
          {filteredArray.map((el) => (
            <li>{el}</li>
          ))}
        </div>

        <div
          className={
            toggleState === "Deleted" ? "content  active-content" : "content"
          }
        >
          {filteredArray.map((el) => (
            <li>{el}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminToDo;
