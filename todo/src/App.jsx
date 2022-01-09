import { useEffect, useState } from "react";
import { RiCloseCircleLine  } from 'react-icons/ri';
import { MdDoneOutline} from "react-icons/md"
import "./App.css";
function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const handleAdd = () => {
    if(!text.trim())return false;
    const payload = {
      title: text,
      id: Date.now(),
      status: false,
    };
    setList([...list, payload]);
    setText("")
    localStorage.setItem("todoList", JSON.stringify(list));
  };
  const handleToogle = (id) => {
    setList(
      list.map((e) => {
        if (e.id === id) {
          return { ...e, status: e.status ? false : true };
        }
        return e;
      })
    );
    handlels()
  };
  const handlels = ()=>{
    localStorage.setItem("todoList", JSON.stringify(list));
  }
  const handleDelete = (id) => {
    const newData = list.filter((e) => {
      return e.id !== id;
    });
    setList(newData);
  };
  useEffect(() => {
    try {
      let data = localStorage.getItem("todoList");
      data = JSON.parse(data);
      setList(data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="todo-app">
      <h1>Add Your Tasks</h1>
      <div className="App" className="todo-form">
        <input
          type="text"
          value={text}
          className="todo-input"
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              // Cancel the default action, if needed
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Add todo here"
          name=""
          onChange={(e) => setText(e.target.value)}
          id=""
        />
        <button
          className="todo-button"
          onClick={() => handleAdd()}
          type="submit"
        >
          Submit
        </button>
      </div>
      <div>
        {list ? (
          <div>
            {list.map((e) => (
              <div
                className={e.status ? "todo-row complete" : "todo-row"}
                key={e.id}
              >
                <p>{e.title}</p>
                <div className="icons">
                  {e.status ? "" : <MdDoneOutline className="delete-icon" onClick={() => handleToogle(e.id)}/>}
                  <RiCloseCircleLine onClick={() => handleDelete(e.id)} className="delete-icon"  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
