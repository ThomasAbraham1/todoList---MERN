import TodoList from "./todoList.jsx";
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    setTimeout(() => {
      toast.info("Double click on an item to edit it and save", {
        duration: 10000,
        position: 'top-center',
      })
    }, 5000);
  }, [])
  return (
    <>
      <Toaster />
      <div className="flexContainer">
        <TodoList />
        {/* <TodoList /> */}
      </div>
    </>
  )
}

export default App
