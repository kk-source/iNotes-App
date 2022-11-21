import React from "react";
import Note from "./Note.js";
import AddNote from "./AddNote.js";

const Home = (props) => {
  return (
    <>
      <AddNote />
      <div>
        <h1>Your notes</h1>
        <Note />
      </div>
    </>
  );
};
export default Home;