import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem("toDos")) || []
  );
  const [showFinished, setShowFinished] = useState(true);

  // useEffect(() => {
  //   let toDoString = localStorage.getItem("toDos");

  //   if (toDoString) {
  //     let toDos = JSON.parse(localStorage.getItem("toDos"));
  //     setToDos(toDos);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let newToDo = toDos.filter((item) => item.id === id);

    setToDo(newToDo[0].toDo);
    let newToDos = toDos.filter((item) => {
      return item.id !== id;
    });

    setToDos(newToDos);
  };

  const handleDelete = (e, id) => {
    let newToDos = toDos.filter((item) => {
      return item.id !== id;
    });
    setToDos(newToDos);
  };

  const handleAdd = () => {
    setToDos([...toDos, { id: uuidv4(), toDo, isCompleted: false }]);

    setToDo("");
  };

  const handleChange = (e) => {
    setToDo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = toDos.findIndex((item) => {
      return item.id === id;
    });
    let newToDos = [...toDos];
    newToDos[index].isCompleted = !newToDos[index].isCompleted;
    setToDos(newToDos);
  };

  return (
    <>
      <Navbar />
      <div className="containe mx-auto  my-5 rounded-xl p-5 bg-orange-200 min-h-[80vh] w-3/4">
        <h1 className="font-bold text-center text-xl">
          Mange your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={toDo}
            type="text"
            className="w-full mt-4 rounded-lg py-1 px-5"
          />
          <button
            onClick={handleAdd}
            disabled={toDo.length <= 3}
            className="bg-orange-300 hover:bg-orange-400 p-2 py-1 text-sm font-bold text-white rounded-md my-4"
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos align-middle">
          {toDos.length === 0 && <div className="m-5">No Todos to display</div>}
          {toDos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full justify-between my-2"
                >
                  <div className="flex gap-3 w-1/2">
                    <input
                      className="h-7"
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.toDo}
                    </div>
                  </div>
                  <div className="buttons flex h-full w-1/2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-orange-300 hover:bg-orange-400 p-2 py1 text-sm font-bold text-white rounded-md mr-6"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-orange-300 hover:bg-orange-400 p-2 py1 text-sm font-bold text-white rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
