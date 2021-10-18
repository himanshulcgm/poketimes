import React, { useEffect, useState } from "react";
import Axios from "axios";

import EditTodo from "./editTodo";
const ListTodo = () => {
  const [todoList, setTodoList] = useState([]);
  const getTodo = async () => {
    const response = await Axios.get("http://localhost:5000/todos");
    setTodoList(response.data);
  };
  useEffect(() => {
    getTodo();
  }, []);
  const deleteTodo = async (id) => {
    const response = await Axios.delete(`http://localhost:5000/todos/${id}`);
    setTodoList(todoList.filter(todo=>todo.todo_id !== id));
  }
  return (
    <table className="table table-striped mt-5 text-center">
      <thead>
        <tr>
          <th>Discription</th>
          <th></th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map((list) => {
          return (
            <tr key={list.todo_id}>
              <td>{list.description}</td>
              <td><EditTodo todo={list}></EditTodo></td>
              <td><button className="btn btn-danger" onClick={()=>{deleteTodo(list.todo_id)}}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListTodo;
