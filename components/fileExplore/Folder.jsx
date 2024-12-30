"use client";
import React, { useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

function Folder({ exploreData,handleInsertNode,handleDeleteNode }) {
  if (exploreData.isFolder) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [name, setName] = useState("");
    const [showInput, setShowInput] = useState({
      show: false,
      isFolder: null,
    });
    const handleShowInput = (isFolder) => {
      setShowInput({
        show: true,
        isFolder: isFolder,
      });
      setIsOpen(true);
    };

    const onAddFolder = (e) => {
      if (e.key === "Enter" && e.target.value) {
        handleInsertNode(exploreData.id, e.target.value, showInput.isFolder);
        setShowInput({
          ...showInput,
          show: false,
        });
        setName("");
      }
    };
    console.log(exploreData)
    return (
      <div className="relative cursor-pointer pl-4 w-full">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setShowInput({
              show: false,
              isFolder: null,
            });
          }}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="flex w-full items-center duration-300 gap-[4px]"
        >
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <FaFolderOpen className=" text-amber-600" /> {exploreData.name}
          {isHover && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-[70px] flex items-center   h-[20px] "
            >
              <button onClick={() => handleShowInput(true)}>
                <AiOutlineFolderAdd className=" text-green-700 cursor-pointer" />
              </button>
              <button onClick={() => handleShowInput(false)}>
                <AiOutlineFileAdd className=" text-green-700 cursor-pointer" />
              </button>
              {exploreData.name !== "root" && (
                <button
                  onClick={() => {
                    handleDeleteNode(exploreData.id);
                  }}
                  >
                  <MdDeleteOutline className=" text-red-500 cursor-pointer" />
                </button>
              )}
            </div>
          )}
        </div>
        {showInput.show && (
          <div className="pl-6 relative flex items-center gap-[4px]">
            {showInput.isFolder ? (
              <FaFolderOpen className=" text-amber-600" />
            ) : (
              <FaFileAlt />
            )}
            <input
              type="text"
              autoFocus
              onKeyDown={onAddFolder}
              value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
              onBlur={() => {
                setShowInput({
                  ...showInput,
                  show: false,
                });
              }}
              className="w-[120px] text-[14px] outline-none focus:border-[1px] focus:border-teal-500 border-black h-[25px] pl-2 mt-1 border-[1px] rounded-[3px]"
            />
            <div className=" w-[1px] absolute top-0 left-[6px]  bg-gray-400 h-full" />
          </div>
        )}
        {isOpen && (
          <div className="">
            {exploreData.items.map((item) => {
              return <Folder handleInsertNode={handleInsertNode}  key={item.id} exploreData={item} handleDeleteNode={handleDeleteNode} />;
            })}
          </div>
        )}
        {exploreData.name !== "root" && (
          <div className=" w-[1px] absolute top-0 left-[6px]  bg-gray-400 h-full" />
        )}
      </div>
    );
  } else {
    return (
      <div className="pl-4 relative">
        <div className="flex items-center gap-[4px]">
          <FaFileAlt />
          {exploreData.name}
        </div>
        <div className=" w-[1px] absolute top-0 left-[6px]   bg-gray-400 h-full" />
      </div>
    );
  }
}

export default Folder;
