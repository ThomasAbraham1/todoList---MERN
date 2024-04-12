import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios';
// import $ from 'jquery';



function TodoList() {
    // Inital fetch
    useEffect(() => {
        showTodos();
    }, []);


    const [tasks, setTasks] = useState([
        // { key: 1, itemName: "Pray and Read Bible" }, { key: 2, itemName: "Workout" }, { key: 3, itemName: "Take Bath" }
    ]);
    const [newTask, setNewTask] = useState("");
    function inputChange(event) {
        setNewTask(event.target.value);
    }


    const showTodos = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/getData');
            var hello = data.map((e, i) => ({ key: e._id, itemName: e.item }));
            // console.log(hello);
            setTasks(hello);
        } catch (error) {
            console.log(error);
        }
    }


    const addTask = async (e) => {
        // e.preventDefault();
        try {
            const add = await axios.post('http://localhost:3000/api/addData', { item: newTask });
            if (add.status === 200) {
                showTodos();
                setNewTask("");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const onDelete = async (key) => {
        try {
            // console.log("hello")
            const add = await axios.post('http://localhost:3000/api/delete', { key: key });
            if (add.status === 200) {
                showTodos();
            }
        } catch (error) {
            console.log(error);
        }
        // var newList = tasks.filter((task, i) => i !== index);
        // setTasks(newList);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    function editMode(key, itemName, event) {
        var spanElement = event.target;
        var inputElement = event.target.nextSibling;
        console.log(inputElement);
        inputElement.value = itemName;
        spanElement.style.display = 'none';
        inputElement.style.display = 'block';
        inputElement.focus();

    }
    const addBtnRef = React.useRef(null);
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            addBtnRef.current.click();
        }
    }
    const onInputFocusOff = async (key, itemName, event) => {
        var spanElement = event.target.previousSibling;
        var inputElement = event.target;
        spanElement.style.display = 'block';
        inputElement.style.display = 'none';
        var newItemName = inputElement.value;
        // console.log(inputElement.value);
        // Sending post req to update api
        try {
            const add = await axios.post('http://localhost:3000/api/update', { key: key, itemName: newItemName });
            if (add.status === 200) {
                showTodos();
            }
        } catch (error) {
            console.log(error);
        }
    }


    var listItems = tasks.map((element, index) =>
        <li key={element.key}>
            <span onDoubleClick={() => editMode(element.key, element.itemName, event)}>{element.itemName}</span>
            <input className="listItem" onBlur={() => onInputFocusOff(element.key, element.itemName, event)} type="text" name="listItem"></input>
            <button onClick={() => onDelete(element.key)}>Delete</button>
            {/* <button onClick={() => moveUp(index)}>👆</button>
            <button onClick={() => moveDown(index)}>👇</button> */}
        </li>);
    return (


        <div className="todoListForm" onSubmit={onSubmit}>
            <center>
                <h2>To-do List</h2>
            </center>
            <div className="listHeading">
                <input type="text" className = "todoInput" placeholder='Enter a task' onKeyDown={onKeyDown} onChange={inputChange} value={newTask} required />
                <button ref={addBtnRef} type='submit' onClick={addTask}>Add Task</button>
            </div>
            <div className="listContainer">
                {listItems}
            </div>
        </div>
    )
}
export default TodoList;