"use client";
import React, { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { TbFlag3Filled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";

const TodoCard = ({ todo, handleComplete, handleInComplete, handleDelete, handleEdit }) => {

  const [editText, setEditText] = useState(todo.text);
  const [editSelect, setEditSelect] = useState(todo.priority);
  const [showEdit, setShowEdit] = useState(false);
  const onDelete = (id) => {
    handleDelete(id);
  };

  const onEdit = (e,id) => {
    console.log('enter-------->')
    console.log("key",e.key)
    if(e.key === "Enter" && e.target.value){
      handleEdit(id, editText);
      setShowEdit(false);
    }
  }

  return (
    <div className="bg-gray-100 shadow-md relative p-4 rounded-md">
      <div className=" mt-2">
        {todo.completed ? (
          <div className=" flex items-center gap-x-[10px]">
            {" "}
            {showEdit ? (
              <div className=" w-full relative">
              <input
                type="text"
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
                onBlur={() => {
                  setShowEdit(false);
                  setEditText(todo.text);
                }}
                className="w-full h-[40px] border-[1px] border-gray-400 rounded-md px-2 py-2"
                onKeyDown={(e) => onEdit(e, todo.id)} 
                autoFocus
              />
              <button
                onClick={() => {
                 setShowEdit(false);
                  setEditText(todo.text);
                }}
                className="text-black absolute top-[10px] right-[10px]"
            
              >
               <RxCross1 />
              </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleInComplete(todo.id);
                  }}
                  className="text-green-500"
                >
                  <SiTicktick />
                </button>
                <p>{editText}</p>
              </>
            )}{" "}
          </div>
        ) : (
          <div className=" flex items-center gap-x-[10px]">
            <div className="">
              <input
                type="radio"
                name="todo"
                id="todo"
                className="text-green-500 scale-[1.4] cursor-pointer rounded-md"
                onChange={() => {
                  handleComplete(todo.id);
                }}
              />
            </div>
            <div className=" w-full">
              {showEdit ? (
                <div className=" w-full relative">
              <input
                type="text"
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
                onBlur={() => {
                  setShowEdit(false);
                  setEditText(todo.text);
                }}
                className="w-full h-[40px] border-[1px] border-gray-400 rounded-md px-2 py-2"
                onKeyDown={(e) => onEdit(e, todo.id)} 
                autoFocus
              />
              <button
                onClick={() => {
                 setShowEdit(false);
                  setEditText(todo.text);
                }}
                className="text-black absolute top-[10px] right-[10px]"
              >
               <RxCross1 />
              </button>
              </div>
              ) : (
                <p>{todo.text}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full absolute  top-[2px] left-0 h-[20px]  flex justify-end px-[15px]">
        <div className=" mr-4">
          {todo.priority === "high" ? (
            <div className=" flex items-center gap-[2px]">
              <TbFlag3Filled className="text-rose-700" />
              <p className="text-rose-700 text-[12px] font-bold">High</p>
            </div>
          ) : todo.priority === "medium" ? (
            <div className=" flex items-center gap-[2px]">
              <TbFlag3Filled className="text-yellow-500" />
              <p className="text-yellow-500 text-[12px] font-bold">Medium</p>
            </div>
          ) : (
            <div className=" flex items-center justify-center">
              <TbFlag3Filled className="text-green-500" />
              <p className="text-green-500 text-[12px] font-bold">Low</p>
            </div>
          )}
        </div>
        <div className=" flex  items-center gap-[10px] ">
          <button
            onClick={() => {
              setShowEdit(true);
            }}
            className="text-blue-500 cursor-pointer"
          >
            <LiaEditSolid />
          </button>
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => {
              onDelete(todo.id);
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
