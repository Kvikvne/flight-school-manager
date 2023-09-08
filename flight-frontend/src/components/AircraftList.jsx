import React, { useState, useEffect } from "react";
import axios from "axios";

const AircraftList = () => {
  const [aircraftRequests, setAircraftRequests] = useState([]);

  useEffect(() => {
    fetchAircraftRequests();
  }, []);

  const fetchAircraftRequests = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/submit-aircraft-availability/"
      );
      setAircraftRequests(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleDeleteAircraftRequest = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/submit-aircraft-availability/${id}/`
      );
      fetchAircraftRequests(); // Refresh the list after deletion
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
              <th>Name</th>
              <th>Category</th>
              <th>Available Day</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {aircraftRequests.map((aircraftRequest) => (
              <tr className="hover">
                <th>{aircraftRequest.id}</th>
                <td>{aircraftRequest.aircraft_name}</td>
                <td>{aircraftRequest.aircraft_category}</td>
                <td>{aircraftRequest.aircraft_availability_day}</td>
                <td>{aircraftRequest.aircraft_start_time}</td>
                <td>{aircraftRequest.aircraft_end_time}</td>

                <td>
                  <button className="btn btn-sm btn-warning">Edit</button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDeleteAircraftRequest(aircraftRequest.id)
                    }
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

export default AircraftList;
