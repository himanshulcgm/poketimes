import React, { useState } from 'react'
import Axios from 'axios'
const InputTodo = () => {
    const [discription, setDiscription] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const body = { discription }
            const response = await Axios.post("http://localhost:5000/todos",body);
        } catch (error) {
            console.error(error.message);
        }
        window.location = "/";
    }
    return (
        <>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitHandler}>
                <input type="text" className="form-control" value={discription} onChange={(e)=>{
                    setDiscription(e.target.value);
                }} />
                <button className="btn btn-success">Add</button>
            </form>
        </>
    )
}

export default InputTodo
