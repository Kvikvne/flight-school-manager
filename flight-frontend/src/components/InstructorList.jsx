import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorList = () => {
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    fetchInstructorData();
  }, []);

  const fetchInstructorData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/submit-insturctor-blocks/"
      );
      setInstructorData(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleDeleteInstructorRequest = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/submit-insturctor-blocks/${id}/`
      );
      fetchInstructorData(); // Refresh the list after deletion
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
              <th>Name</th>
              <th>Blocks</th>
              <th>Days</th>
              <th>Available Time</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {instructorData.map((instructorsData) => (
              <tr className="hover">
                <th>{instructorsData.id}</th>
                <td>{instructorsData.Instructor_email}</td>
                <td>{instructorsData.Instructor_name}</td>
                <td>Ground: {instructorsData.ground_blocks}, Duel: {instructorsData.duel_blocks}</td>
                <th>{instructorsData.day_available}</th>
                <th>{instructorsData.instructor_start_time} - {instructorsData.instructor_end_time}</th>
                
                <td>
                  <button className="btn btn-sm btn-warning">Edit</button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDeleteInstructorRequest(instructorsData.id)
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

export default InstructorList;
