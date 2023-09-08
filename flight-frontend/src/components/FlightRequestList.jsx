import React, { useState, useEffect } from "react";
import axios from "axios";

const FlightRequestList = () => {
  const [flightRequests, setFlightRequests] = useState([]);

  useEffect(() => {
    fetchFlightRequests();
  }, []);

  const fetchFlightRequests = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/flight-requests/"
      );
      setFlightRequests(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleDeleteFlightRequest = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/flight-requests/${id}/`);
      fetchFlightRequests(); // Refresh the list after deletion
    } catch (error) {
      console.error("An error occurred while deleting:", error);
    }
  };

  return (
    <div className="">
      <div className="overflow-x-auto w-[90%] mx-auto">
        <table className="table">
          <thead className="text-lg">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Day</th>
              <th>Time</th>
              <th>Flying Amount</th>
              <th>Instructor</th>
              <th>Instuctor Time</th>
              <th>Training Type</th>
              <th>Special requests</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {flightRequests.map((flightRequest) => (
              <tr className="hover">
                <th>{flightRequest.id}</th>
                <td>{flightRequest.email}</td>
                <td>{flightRequest.day_of_week}</td>
                <td>{flightRequest.time_of_day}</td>
                <td>{flightRequest.flying_amount}</td>
                <td>{flightRequest.instructor}</td>
                <td>{flightRequest.time_with_instructor}</td>
                <td>{flightRequest.training_type}</td>
                <td>{flightRequest.special_requests}</td>
                <td>
                  <button className="btn btn-sm btn-warning">Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteFlightRequest(flightRequest.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightRequestList;
