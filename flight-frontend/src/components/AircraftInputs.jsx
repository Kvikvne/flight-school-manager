import React, { useState } from "react";
import axios from "axios";

const AircraftInputs = () => {
  const [aircraftCategory, setAircraftCategory] = useState("");
  const [aircraftAvailabilityDay, setAircraftAvailabilityDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [aircraftName, setAircraftName] = useState([]);

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/submit-aircraft-availability/",
        {
          aircraft_category: aircraftCategory,
          aircraft_availability_day: aircraftAvailabilityDay,
          aircraft_start_time: startTime,
          aircraft_end_time: endTime,
          aircraft_name: aircraftName,
        }
      );

      if (response.status === 201) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      
      <div className="shadow-lg bg-base-300 py-5 px-10 w-fit rounded-lg">
      <h2 className="text-4xl font-thin">Aircraft input</h2>
        <form
          className="request-form grid justify-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label className="label font-semibold">Aircraft name</label>
            <input
              placeholder="Type here"
              className="input input-bordered w-full "
              type="text"
              value={aircraftName}
              onChange={(e) => setAircraftName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="label font-semibold">Aircraft category</label>
            <select
              className="select select-bordered w-full "
              value={aircraftCategory}
              onChange={(e) => setAircraftCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="label font-semibold">Day of week</label>
            <select
              className="select select-bordered w-full "
              value={aircraftAvailabilityDay}
              onChange={(e) => setAircraftAvailabilityDay(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="label font-semibold">Time of day</label>
            <div className="space-x-2">
              <input
                type="time"
                className="w-max px-2 py-1 border rounded input input-bordered cursor-pointer"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <span className="text-gray-600">to</span>
              <input
                type="time"
                className="w-max px-2 py-1 border rounded input input-bordered cursor-pointer"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn btn-wide btn-primary mx-auto mt-6"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AircraftInputs;
