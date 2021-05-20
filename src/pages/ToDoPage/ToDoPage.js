import React, { useCallback, useEffect, useState } from "react";
import ToDo from "../../components/ToDo/ToDo";
import "./styles.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function ToDoPage() {
  const [inputToDo, setInputToDo] = useState("");
  const [clickedToDos, setClickedToDos] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Filter your tasks");
  const [loading, setloading] = useState(true);
  const [error, setError] = useState();
  const localToken = localStorage.getItem("token");

  const getToDo = async () => {
    await axios
      .get("/todolist", {
        headers: {
          Authorization: localToken,
          selectedStatus: selectedStatus ? selectedStatus : "Filter your tasks",
        },
      })
      .then((result) => {
        setClickedToDos(result.data.user);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
    setloading(false);
  };

  useEffect(() => {
    getToDo();
  }, [, selectedStatus]);

  const postToDo = (postedToDo) => {
    axios
      .post("/todolist", {
        token: localToken,
        todolist: postedToDo,
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const addClicked = () => {
    let postedToDo = [];
    if (inputToDo) {
      postedToDo = [
        ...clickedToDos,
        {
          description: inputToDo,
          status: "Uncompleted",
          id: Math.random() * 100000000000,
        },
      ];
      setClickedToDos(postedToDo);
      postToDo(postedToDo);
    } else {
      setError("You must write your to do list in order to add");
    }
    setInputToDo("");
  };

  const handleEvent = (e) => {
    setInputToDo(e.target.value);
    setError();
  };

  const selectEvent = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="containerBox">
      <div className="planCart">
        <div className="displaying">
          <div class="col-sm-12 input-group planSection">
            <input
              name="list"
              type="text"
              value={inputToDo}
              class="form-control"
              placeholder="What are you planning to do?"
              onChange={handleEvent}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-info"
              type="button"
              id="button-addon2"
              onClick={addClicked}
            >
              Add
            </button>{" "}
            <div></div>
          </div>
        </div>

        <div>
          {error && (
            <div class="ml-3 errorMessage" role="alert">
              Error: {error}.
            </div>
          )}
        </div>
      </div>
      <div class="mt-5 toDoCart">
        <div class="sameCard">
          <select
            onChange={selectEvent}
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option selected>Filter your tasks</option>
            <option value="Completed">Completed</option>
            <option value="Uncompleted">Uncompleted</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>

        <div class="spaceBottom">
          {loading ? (
            <Spinner animation="border" className="spinner" />
          ) : (
            clickedToDos.map((clickedToDo) => (
              <ToDo
                postToDo={postToDo}
                clickedToDo={clickedToDo}
                clickedToDos={clickedToDos}
                setClickedToDos={setClickedToDos}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
