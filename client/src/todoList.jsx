import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
// import $ from 'jquery';



function TodoList() {
    // Inital fetch
    useEffect(() => {
        showTodos();
        toast.promise(connectionTest(), {
            duration: 5000,
            position: 'bottom-center',
            loading: 'Loading...',
            success: (data) => {
                return `${data}`;
            },
            error: 'Problem with fetching from free tier back-end service',
        });
        // connectionTest().then((message)=>{
        //     console.log(message);
        // }).catch((message)=>{
        //     console.log(message);
        // });

    }, []);


    const [tasks, setTasks] = useState([
        // { key: 1, itemName: "Pray and Read Bible" }, { key: 2, itemName: "Workout" }, { key: 3, itemName: "Take Bath" }
    ]);
    const [newTask, setNewTask] = useState("");
    function inputChange(event) {
        setNewTask(event.target.value);
    }
    // Simple code to see if the connection is established with the back end
    const connectionTest = () => {
        return new Promise((resolve, reject) => {
            axios.get('https://localhost:3000/api/test').then((message) => {
                resolve("Connection to back-end established!");
            }).catch((message) => {
                reject("Something wrong with the connection");
            })
        });
    }
    const showTodos = async () => {
        try {
            const { data } = await axios.get('https://todolistwithmern.onrender.com/api/getData');
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
            const add = await axios.post('https://todolistwithmern.onrender.com/api/addData', { item: newTask });
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
            const add = await axios.post('https://todolistwithmern.onrender.com/api/delete', { key: key });
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
            const add = await axios.post('https://todolistwithmern.onrender.com/api/update', { key: key, itemName: newItemName });
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
            <Toaster />
            <center>
                <h2>To-do List</h2>
            </center>
            <div className="listHeading">
                <input type="text" className="todoInput" placeholder='Enter a task' onKeyDown={onKeyDown} onChange={inputChange} value={newTask} required />
                <button ref={addBtnRef} type='submit' onClick={addTask}>Add Task</button>
            </div>
            <div className="listContainer">
                {listItems}
            </div>
        </div>
    )
}
export default TodoList;