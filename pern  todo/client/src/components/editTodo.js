import React, { useState } from "react";
import Axios from "axios";

const EditTodo = (props) => {
    const [description,setDescription] = useState(props.todo.description);

    const updateHandler = async (e) =>{
        e.preventDefault();
        try {
            const body = { discription: description  }
            console.log(body);
            console.log(props.todo.todo_id);
            const response = await Axios.put(`http://localhost:5000/todos/${props.todo.todo_id}`, body);
            console.log(response,"response");
        } catch (error) {
            console.error(error.message);
        }
        window.location = "/";
    
    }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${props.todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${props.todo.todo_id}`} >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Discription</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
                <input type="text" className="form-control" value={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={e=>{
                    updateHandler(e);
                }}
                
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
