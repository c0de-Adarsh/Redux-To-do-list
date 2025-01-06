import { React, useState, useEffect } from 'react';
import { Todo } from '../Components/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IsLogin } from '../Actions/userAction';
import { getTodos, createTodo } from '../Actions/todoAction';

export const Todos = () => {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.user);
  const { allTodos } = useSelector((state) => state.todo);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [todoData, setTodoData] = useState([]);  // Initialize with empty array

  // Check login status
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
      toast.info("Please Login to add Todo's");
    }
  }, [isLogin, navigate]);

  // Get todos from redux store
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  // Update todoData when allTodos changes
  useEffect(() => {
    // Debug log for API response
    if (Array.isArray(allTodos)) {
      // Filter out invalid objects
      const validTodos = allTodos.filter(todo => todo && todo._id && todo.title && todo.desc);
      
      setTodoData(validTodos); // Update state with filtered todos
    } else {
      setTodoData([]); 
    }
  }, [allTodos]);

  const addTodo = (e) => {
    e.preventDefault();
    const data = {
      title,
      desc,
    };

    dispatch(createTodo(data));

    setTitle('');
    setDesc('');
  };

  return (
    <>
      <div className='min-h-screen flex justify-center pt-20 bg-gradient-to-b from-blue-900 to-purple-500'>
        <div className='md:w-1/2 w-full md:pt-0 pt-3 md:px-0 px-7'>
          <h1 className='font-bold md:text-6xl text-center text-5xl py-4 text-white'>Todos List</h1>

          <div className='pb-8 pt-5 w-full text-center text-white'>
            <p className='font-bold pb-4 pt-2 md:text-4xl text-3xl'>Add your todo </p>
            <form onSubmit={addTodo} className='flex w-full flex-col gap-3'>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                name='title'
                placeholder='Title'
                className='outline-none placeholder-bold rounded text-black px-2 py-1'
              />

              <input
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type='text'
                name='desc'
                placeholder='Description'
                className='outline-none placeholder-bold rounded text-black px-2 py-1'
              />

              <div className='flex justify-center items-center'>
                <button className='font-bold text-md bg-blue-500 hover:bg-blue-600 py-1 rounded w-1/2'>Add Todo</button>
              </div>
            </form>

            {todoData.length !== 0 ? (
              <p className='font-bold pt-8 pb-4 md:text-3xl text-2xl'>Task's List</p>
            ) : null}

            <div>
              <div className='flex flex-col gap-2'>
                {todoData.length !== 0 ? (
                  <>
                    {todoData.map((e) => (
                      <Todo num={e._id} id={e._id} title={e.title} desc={e.desc} key={e._id} />
                    ))}
                  </>
                ) : (
                  <div className='pt-16 text-2xl font-medium'>You don't have any todos</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
