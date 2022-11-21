import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";

const host = "http://localhost:5000";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { showAlert, setUser } = useContext(NoteContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.Success) {
      localStorage.setItem("token", json.authtoken);
      showAlert("Account Created Successfully", "success");
      setUser(data.email);
      navigate("/");
      //   console.log(json);
    } else {
      // console.log("Incorrect Credentials");
      showAlert("Invalid data. Please try again", "danger");
    }
  };
  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <form className="container my-1">
      <h1>Signup to iNotes</h1>
      <div className="form-group my-2">
        <label htmlFor="exampleInputName1">Name</label>
        <input
          type="name"
          name="name"
          className="form-control"
          id="exampleInputName1"
          aria-describedby="emailHelp"
          placeholder="Enter name"
          onChange={handleChange}
          value={data.name}
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleChange}
          value={data.email}
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
