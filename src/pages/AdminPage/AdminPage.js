import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import AdminToDo from "../../components/AdminTodo/AdminToDo";

function AdminPage(props) {
  const [memberInfo, setMemberInfo] = useState([]);
  const [adminCheck, setAdminCheck] = useState("user");
  const [loading, setLoading] = useState(true);

  const localToken = localStorage.getItem("token");

  const getToDo = async () => {
    await axios
      .get("/todolist/admin", {
        headers: {
          Authorization: localToken,
        },
      })
      .then((result) => {
        setAdminCheck(result.data.role);
        setMemberInfo(result.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setLoading(false);
  };

  useEffect(() => {
    getToDo();
  }, []);

  return (
    <div classname="bigCart">
      {adminCheck === "Admin" ? (
        <>
          <h1 class="blurredCard vertical">
            You are a admin who can see all members with their to do lists.
          </h1>

          {loading ? (
            <Spinner animation="border" />
          ) : (
            memberInfo.map((member) => (
              <AdminToDo
                firstName={member.firstName}
                lastName={member.lastName}
                todolist={member.todolist}
              />
            ))
          )}
          <div class="mb-4 vrfg"></div>
        </>
      ) : (
        <h1 class="blurredCard vertical">Only admin can see this page.</h1>
      )}
    </div>
  );
}

export default AdminPage;
