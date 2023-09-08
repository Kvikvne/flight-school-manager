import React from "react";
import axios from "axios";

const LogoutButton = ({ authToken }) => {
  const handleLogout = async () => {
    console.log(authToken)
    try {
      await axios.post("http://127.0.0.1:8000/api/logout/", null, {
        headers: {
          Authorization: `Token ${authToken}` // Include the token in the request header
        }
      });

      // Clear token from localStorage
      localStorage.removeItem("authToken");
      // Perform any further actions after successful logout
      console.log("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;
