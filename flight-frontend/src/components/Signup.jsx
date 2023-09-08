import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/", // Replace with your login API endpoint
        {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          username: company,
        }
        
      );
      

      if (response.status === 201) {
        console.log("Signup successful!");
        window.location.href = "/login";
        // Perform any further actions like redirecting to a dashboard
      } else {
        console.error("Signup failed");
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
          <h1 className="card-title text-3xl">Sign up</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group ">
              <label>First name:</label>
              <input
                placeholder="John"
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group ">
              <label>Last name:</label>
              <input
                placeholder="Doe"
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group ">
              <label>Email:</label>
              <input
                placeholder="johndoe@example.com"
                className="input input-bordered w-full max-w-xs"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group ">
              <label>Company:</label>
              <input
                placeholder="This will be your username"
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <p className="text-sm text-warning">
                Must have at least 8 characters
              </p>
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
                signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
