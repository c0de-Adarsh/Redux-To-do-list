import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { VscSaveAs } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { updateTodo, deleteTodo } from '../Actions/todoAction'

export const Todo = ({ num, title, desc, id }) => {

    const [newTitle, setTitle] = useState('');
    const [newDesc, setDesc] = useState('');
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    const open = () => {
        setToggle(!toggle);
    }

    const del = (e) => {
        e.preventDefault();
        dispatch(deleteTodo(id));
    }

    const update = (e) => {
        e.preventDefault();
    
        if (!newTitle || !newDesc) {
            toast.error("Title and description are required");
            return;
        }
    
        const data = {
            title: newTitle,
            desc: newDesc
        };
    
        // Log to check what data is being passed
        console.log("Updating Todo with data:", id);
    
        // Dispatch the updateTodo action with the correct data
        dispatch(updateTodo(id, data));
    
        // Clear the input fields after dispatch
        setTitle("");
        setDesc("");
    
        // Close the form (toggle false) after update
        setToggle(false);
    };
    

    // useEffect to update title and description when toggle state changes
    useEffect(() => {
        if (toggle) {
            setTitle(title);  // Set initial title from props
            setDesc(desc);  // Set initial description from props
        }
    }, [toggle, title, desc]);  // Dependencies to reset when toggle changes

    return (
        <div className='flex flex-col w-full bg-gray-800 rounded-md pb-2  text-left  text-white gap-0'>
            <p className=' py-3 px-3 text-lg min-w-full text-white'>
                <span className='pr-3 font-bold'>{num})</span> 
                <span className='font-bold'>{title}</span> 
                <span>-</span> 
                <span>{desc}</span>
            </p>
            <div className='flex gap-3 justify-end pb-1 px-3 items-center'>
                <span> 
                    <FiEdit size={20} onClick={() => { open() }} className='cursor-pointer hover:text-blue-500' />
                </span> 
                <span onClick={del}>
                    <AiOutlineDelete size={22} className='cursor-pointer hover:text-red-500' />
                </span>
            </div>

            <form onSubmit={update} className={` grid-cols-3 ${toggle ? 'grid' : 'hidden'}  gap-2 px-3 pt-2`} >
                <input
                    required
                    placeholder='New Title'
                    value={newTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name='title'
                    className='rounded-md placeholder-bold px-1 py-1 text-black outline-none'
                />
                <input
                    required
                    placeholder='New Description'
                    value={newDesc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='rounded-md px-1 py-1 text-black placeholder-bold outline-none'
                    type="text"
                    name='desc'
                />
                <button className='flex items-center justify-left'>
                    <VscSaveAs className='cursor-pointer hover:text-blue-500' size={25} />
                </button>
            </form>
        </div>
    );
}
