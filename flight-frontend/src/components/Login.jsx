import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: email,
          password: password,
        }
      );

      if (response.status === 200) {
        const authToken = response.data.token;
        setToken(authToken); // Update the token in the App component
        localStorage.setItem("authToken", authToken); // Store the token in localStorage
      
        console.log("Login successful!");
        // Perform any further actions like redirecting to a dashboard
        window.location.href = "/dashboard";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-200 text-primary-content shadow-lg">
        <div className="card-body ">
          <h1 className="card-title text-3xl">Login</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="form-group ">
              <label>Username:</label>
              <input
                placeholder="FlexAir"
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                placeholder="••••••••"
                className="input input-bordered w-full max-w-xs"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="card-actions justify-center">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
          <div>
        </div>
        </div>
        <div className="divider mx-4 my-0"></div>
        <div className="flex flex-col space-y-3 mb-4 p-[1rem]">
          <p className="text-center">Dont have an account?</p>
          <Link className=" justify-center mx-auto" to={"/signup"}>
          <button
            className="btn btn-sm btn-secondary"
            type=""
          >
            Sign up
          </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
