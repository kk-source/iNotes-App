import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";

const host = "http://localhost:5000";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {showAlert, setUser} = useContext(NoteContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (json.Success) {
      localStorage.setItem("token", json.authtoken);
      showAlert("Logged in Successfully", "success")
      setUser(data.email);
      navigate("/");
    } else {
      showAlert("Incorrect Credentials", "danger")
    }
  };
  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <form className="container my-1">
    <h1>Login to iNotes</h1>
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
          placeholder="Enter Password"
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
