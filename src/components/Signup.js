import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {

    let history = useNavigate();
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, password} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
   
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, email, password
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token', json.authtoken);
        history("/")
        props.showAlert("Account created successfully", "success")
    }
    else{
      props.showAlert("Invalid Details", "danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div className="container mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className="container mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name= "email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className=" container mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className=" container mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
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
