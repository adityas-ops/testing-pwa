"use client";
import Layout from "@/components/common/Layout";
import React, { useEffect, useState } from "react";
import todoData from "@/data/todoData";
import { IoMdAdd } from "react-icons/io";
import TodoCard from "@/components/todo/ToddCard";
import { FaSort } from "react-icons/fa";

function Page() {
  const [todos, setTodos] = useState(todoData);
  const [tempData, setTempData] = useState(todoData);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [notCompletedTodos, setNotCompletedTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [newTodo, setNewTodo] = useState({
    id: "",
    text: "",
    completed: false,
    priority: "",
  });
  const [showAdd, setShowAdd] = useState(false);
  const handleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleInComplete = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    let completed = todos.filter((todo) => todo.completed === true);
    let notCompleted = todos.filter((todo) => todo.completed === false);
    setCompletedTodos(completed);
    setNotCompletedTodos(notCompleted);
  }, [todos]);

  // const sortingByPriority = (count) => {
  //   // high > medium > low
  //   let tempCount = count % 3;
  //   if (tempCount === 0) {
  //     let high = todos.filter((todo) => todo.priority === "high");
  //     let medium = todos.filter((todo) => todo.priority === "medium");
  //     let low = todos.filter((todo) => todo.priority === "low");
  //     return [...high, ...medium, ...low];
  //   } else if (tempCount === 1) {
  //     let high = todos.filter((todo) => todo.priority === "high");
  //     let medium = todos.filter((todo) => todo.priority === "medium");
  //     let low = todos.filter((todo) => todo.priority === "low");
  //     return [...low, ...medium, ...high];
  //   } else {
  //     // put as it is first time render
  //     return tempData;
  //   }
  // };
  const sortingByPriority = (count) => {
    // Pre-categorize todos by priority
    const priorityGroups = {
      high: [],
      medium: [],
      low: [],
    };

    todos.forEach((todo) => {
      if (priorityGroups[todo.priority]) {
        priorityGroups[todo.priority].push(todo);
      }
    });
    // Determine order based on count
    const orders = [
      ["high", "medium", "low"], // tempCount === 0
      ["low", "medium", "high"], // tempCount === 1
      ["temp"], // tempCount === 2 (as it is)
    ];

    const tempCount = count % 3;

    return tempCount === 2
      ? tempData // Use tempData directly
      : orders[tempCount].flatMap((priority) => priorityGroups[priority]); // Merge sorted groups
  };

  const handleAddTodo = () => {
    if (newTodo.text === "" || newTodo.priority === "") {
      alert("Please fill all fields");
      return;
    }
    let newTodos = { ...newTodo, id: new Date().getTime().toString() };
    setTodos((prevTodos) => [newTodos, ...prevTodos]); // Use prevTodos for the current state
    setNewTodo({
      id: "",
      text: "",
      completed: false,
      priority: "",
    });
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setTempData(newTodos);
  }

  const  handleEdit = (id,editText) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.text = editText;
        }
        return todo;
      });
      setTodos(newTodos);
      setTempData(newTodos);
    
  }


  return (
    <Layout>
      <div className="w-full h-full px-[50px] pt-[30px]">
        <div className=" flex w-full justify-end ">
          <button
            className="bg-teal-900 cursor-pointer flex items-center gap-x-1 text-white px-8 py-2 rounded-md hover:scale-[1.05] duration-300"
            onClick={() => {
              setShowAdd(!showAdd);
            }}
          >
            <IoMdAdd />
            Add
          </button>
        </div>
        <div className=" w-full">
          <button
            onClick={() => {
              setCount(count + 1);
              setTodos(sortingByPriority(count));
            }}
            className=" flex border-[1px] border-black items-center justify-center gap-1 px-8 py-2 rounded-md bg-gray-200 hover:bg-gray-700 duration-300 text-black hover:text-white"
          >
            <p className="  ">Sort by Priority</p>
            <FaSort className="" />
          </button>
        </div>
        <div className="mt-[20px]  w-full grid grid-cols-1 gap-y-[20px] sm:gap-y-0 pb-[200px] sm:pb-0 sm:grid-cols-3 gap-x-[50px]">
          {/* render all todos   */}
          <div className=" w-full border-[2px] rounded-md border-blue-700  flex flex-col ">
            <div className=" relative w-full h-[50px] bg-blue-700 flex items-center justify-center">
              <h1 className="text-white text-2xl">All Todos</h1>
            </div>
            <div className=" w-full h-full px-2 py-2 flex   flex-col space-y-2 max-h-[65vh] overflow-y-scroll">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  handleComplete={handleComplete}
                  handleInComplete={handleInComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}  //
                />
              ))}
            </div>
          </div>
          {/* render not completed todos */}
          <div className=" w-full">
            {completedTodos.length > 0 && (
              <div className=" w-full border-[2px] rounded-md border-green-700  flex flex-col ">
                <div className=" w-full h-[50px] bg-green-700 flex items-center justify-center">
                  <h1 className="text-white text-2xl">Completed Todos</h1>
                </div>
                <div className=" w-full h-full px-2 py-2 flex flex-col space-y-2 max-h-[65vh] overflow-y-scroll">
                  {completedTodos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      handleComplete={handleComplete}
                      handleInComplete={handleInComplete}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* render completed todos */}
          <div className=" w-full">
            {notCompletedTodos.length > 0 && (
              <div className=" w-full border-[2px] rounded-md border-red-700  flex flex-col ">
                <div className=" w-full h-[50px] bg-red-700 flex items-center justify-center">
                  <h1 className="text-white text-2xl">Not Completed Todos</h1>
                </div>
                <div className=" w-full h-full px-2 py-2 flex flex-col space-y-2 max-h-[65vh] overflow-y-scroll">
                  {notCompletedTodos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      handleComplete={handleComplete}
                      handleInComplete={handleInComplete}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}  //
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {
          // render add todo form
          showAdd && (
            <div className=" w-screen bg-black/60 top-[-20px] left-0 right-0 bottom-0 h-screen fixed flex items-center justify-center  mt-[20px]">
              <div className=" w-[400px]  h-fit bg-white px-[30px] rounded-md pt-[40px] pb-[40px] flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder="Enter Todo"
                  className="w-full border-[1px] border-gray-400 rounded-md px-2 py-2"
                  value={newTodo.text}
                  onChange={(e) => {
                    setNewTodo({
                      ...newTodo,
                      text: e.target.value,
                    });
                  }}
                />
                <select
                  name="priority"
                  id="priority"
                  className="w-full border-[1px] border-gray-400 rounded-md px-2 py-2"
                  value={newTodo.priority}
                  onChange={(e) => {
                    setNewTodo({
                      ...newTodo,
                      priority: e.target.value,
                    });
                  }}
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <div className=" w-full flex justify-end gap-[10px]">
                  <button
                    className="bg-red-900 w-fit cursor-pointer flex items-center gap-x-1 text-white px-8 py-2 rounded-md hover:scale-[1.05] duration-300"
                    onClick={() => {
                      setNewTodo({
                        id: "",
                        text: "",
                        completed: false,
                        priority: "",
                      });
                      setShowAdd(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-900 w-fit cursor-pointer flex items-center gap-x-1 text-white px-8 py-2 rounded-md hover:scale-[1.05] duration-300"
                    onClick={handleAddTodo}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  );
}

export default Page;
