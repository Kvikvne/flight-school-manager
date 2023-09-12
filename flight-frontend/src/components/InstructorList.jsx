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
              <th>Email</th>
              <th>Name</th>
              <th>Blocks</th>
              <th>Days</th>
              <th>Available Times</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {instructorData.map((instructor) => (
              <tr key={instructor.id} className="hover">
                <td>{instructor.Instructor_email}</td>
                <td>{instructor.Instructor_name}</td>
                <td>
                  Ground: {instructor.ground_blocks}, Duel:{" "}
                  {instructor.duel_blocks}
                </td>
                <th>{instructor.day_available}</th>
                <th>{instructor.instructor_times}</th>

                <td>
                  <button className="btn btn-sm btn-warning">Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteInstructorRequest(instructor.id)}
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
