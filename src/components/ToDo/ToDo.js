import React, { useEffect } from "react";
import "./styles.css";

const ToDo = (props) => {
  const { postToDo, clickedToDo, clickedToDos, setClickedToDos } = props;

  const deleteClicked = () => {
    const postedToDo = clickedToDos.map((item) => {
      if (item.id === clickedToDo.id) {
        return {
          ...item,
          status: "Deleted",
        };
      }
      return item;
    });
    setClickedToDos(postedToDo);
    postToDo(postedToDo);
  };

  const doneClicked = () => {
    const postedToDo = clickedToDos.map((item) => {
      if (item.id === clickedToDo.id) {
        return {
          ...item,
          status: "Completed",
        };
      }
      return item;
    });
    setClickedToDos(postedToDo);
    postToDo(postedToDo);
  };

  return (
    <div className="mx-auto mt-1 addedToDo">
      <input
        type="text"
        value={clickedToDo.description}
        className={`${
          clickedToDo.status === "Uncompleted"
            ? "form-controlff"
            : clickedToDo.status === "Completed"
            ? "form-green"
            : "form-red"
        }`}
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        disabled
      />
      <button
        className="btn btn-danger"
        type="button"
        id="button-addon2 endpo"
        onClick={deleteClicked}
      >
        Delete
      </button>
      <button
        className="btn btn-success"
        type="button"
        id="button-addon2"
        onClick={doneClicked}
      >
        Done
      </button>
    </div>
  );
};

export default ToDo;
