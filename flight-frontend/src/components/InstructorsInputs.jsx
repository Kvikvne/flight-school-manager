import React, { useState } from "react";
import axios from "axios";

const InstructorInput = () => {
  const [groundBlocks, setGroundBlocks] = useState("0");
  const [duelBlocks, setDuelBlocks] = useState("0");
  const [instructorName, setInstructorName] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");
  const [isGroundChecked, setIsGroundChecked] = useState(false);
  const [isDualFlightChecked, setIsDualFlightChecked] = useState(false);
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayOfWeekChange = (day, isChecked) => {
    if (isChecked) {
      // Add the selected day to the array
      setDayOfWeek([...dayOfWeek, day]);
    } else {
      // Remove the deselected day from the array
      setDayOfWeek(dayOfWeek.filter((d) => d !== day));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dayOfWeekString = dayOfWeek.join(", ");
    const selectedTypesString = selectedTrainingTypes.join(", ");
    console.log("Selected Training Types:", selectedTypesString);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/submit-insturctor-blocks/",
        {
          Instructor_email: instructorEmail,
          Instructor_name: instructorName,
          training_type: selectedTypesString,
          duel_blocks: duelBlocks,
          ground_blocks: groundBlocks,
          day_available: dayOfWeekString,
          instructor_start_time: startTime,
          instructor_end_time: endTime,
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

  const handleCheckboxChange = (value) => {
    if (selectedTrainingTypes.includes(value)) {
      setSelectedTrainingTypes(
        selectedTrainingTypes.filter((type) => type !== value)
      );
    } else {
      setSelectedTrainingTypes([...selectedTrainingTypes, value]);
    }
  };

  return (
    <div>
      <div
        className="requests-container grid grid-cols-1 justify-center p-5 rounded-xl max-w-full 
      shadow-2xl w-[28rem] mx-auto bg-base-300"
      >
        <h2 className="text-4xl font-thin text-center">CFI Scheduling Bids</h2>
        <h3 className="font-thin">
          Please complete your request before Wednesday at 11:59pm
        </h3>

        <form className="request-form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="label font-semibold">Email</label>
            <input
              required
              placeholder="johndoe@example.com"
              className="input input-bordered w-full "
              type="text"
              value={instructorEmail}
              onChange={(e) => setInstructorEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="label font-semibold">Name</label>
            <input
              required
              placeholder="Type here"
              className="input input-bordered w-full "
              type="text"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="label font-semibold">
              What do you want to bid, per week?
            </label>
            <div className="flex space-x-1 py-2 w-full">
              <input
                onChange={() => {
                  handleCheckboxChange("GROUND");
                  setIsGroundChecked(!isGroundChecked);
                }}
                checked={selectedTrainingTypes.includes("GROUND")}
                type="checkbox"
                className="checkbox"
              />
              <p>GROUND</p>
            </div>
            {isGroundChecked && (
              <div className=" mb-2 bg-base-100 p-2 rounded ">
                <h4 className="text-lg">How many Ground Blocks?</h4>
                <p className="text-sm font-sm max-w-full">
                  Ground blocks are classroom or simulator training sessions.
                  One block is a 2-hour period.
                </p>
                <select
                  className="select select-bordered w-full mt-2"
                  value={groundBlocks}
                  onChange={(e) => setGroundBlocks(e.target.value)}
                >
                  <option disabled selected>
                    BLOCKS
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            )}

            <div className="flex space-x-1 py-2 w-full">
              <input
                onChange={() => {
                  handleCheckboxChange("DUEL FLIGHT");
                  setIsDualFlightChecked(!isDualFlightChecked);
                }}
                checked={selectedTrainingTypes.includes("DUEL FLIGHT")}
                type="checkbox"
                className="checkbox"
              />
              <p>DUAL FLIGHT</p>
            </div>

            {isDualFlightChecked && (
              <div className=" mb-2 bg-base-100 p-2 rounded ">
                <h4 className="text-lg">How many DUAL Blocks?</h4>
                <p className="text-sm font-sm max-w-full">
                  Dual instruction events are a pre-briefing, flight training in
                  an aircraft, and debriefing. One block is a 2-hour period.
                </p>
                <select className="select select-bordered w-full mt-2"
                  value={duelBlocks}
                  onChange={(e) => setDuelBlocks(e.target.value)}>
                  <option disabled selected>
                    BLOCKS
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            )}
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-light">
              When are you available to train next week?
            </h4>
            <label className="label font-semibold">Day of Week</label>
            <div className="flex flex-wrap space-x-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex space-x-1 items-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={day}
                    checked={dayOfWeek.includes(day)}
                    onChange={(e) =>
                      handleDayOfWeekChange(day, e.target.checked)
                    }
                  />
                  <p>{day}</p>
                </div>
              ))}
            </div>
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
          <div className="flex justify-center mt-8">
          <button
            className="btn btn-wide btn-primary"
            type="submit"
          >
            Submit
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default InstructorInput;
