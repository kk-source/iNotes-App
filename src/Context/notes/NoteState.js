import { useState } from "react";
import NoteContext from "./NoteContext";
const host = "http://localhost:5000";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // get all notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    const newNote = {
      title,
      description,
      tag,
    };
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(newNote), // body data type must match "Content-Type" header
    });
    const temp = await response.json();
    setNotes((prev) => prev.concat(temp));
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      setNotes((prev) => {
        return prev.filter((note) => {
          return note._id !== id;
        });
      });
    } else {
      console.log("Operation unsuccessful");
    }
  };

  // edit a note
  const editNote = async (updatedNote) => {
    const { title, description, tag, _id } = updatedNote;
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    updatedNote = await response.json();
    if (response.status === 200) {
      setNotes((prev) => {
        return prev.map((note) => {
          if (note._id !== _id) {
            return note;
          } else {
            return updatedNote;
          }
        });
      });
    } else {
      console.log("Operation unsuccessful");
    }
  };
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const [User, setUser] = useState("");
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        alert,
        showAlert,
        User,
        setUser
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
