import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token an redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully ", "Success")

    } else {
      props.showAlert("Invalid Credentials", "danger")
    }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.email]: e.target.password });
    };
  };
  return (
    <div className="container mt-2">
      <h2 className="my-2">Create an Account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlfor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-name"
            id="name"
            onChange={onchange}
            name="name"
            aria-describedby="namehelp"
          />
        </div>
        <div class="mb-3">
          <label htmlfor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-email"
            id="email"
            onChange={onchange}
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label htmlfor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
            name="password"
            minLength={5}
            required
          />
        </div>
        <div class="mb-3">
          <label htmlfor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onchange}
            name="cpassword"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
