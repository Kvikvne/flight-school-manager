import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeCheckBoxes from "./TimeCheckBoxes";
import DayOfWeekCheckBoxes from "./DayCheckBoxes";

const FlightRequestForm = () => {
  const [email, setEmail] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [instructor, setInstructor] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState([]);
  const [isGroundChecked, setIsGroundChecked] = useState(false);
  const [isDualFlightChecked, setIsDualFlightChecked] = useState(false);
  const [isSoloTimeBuildChecked, setIsSoloTimeBuildChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [instructorNames, setInstructorNames] = useState([]);
  const [studentGroundBlocks, setStudentGroundBlocks] = useState("");
  const [studentDuelBlocks, setStudentDuelBlocks] = useState("");
  const [timeRequest, setTimeRequest] = useState([]);

  useEffect(() => {
    // Fetch instructor data from the server
    async function fetchInstructorData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/submit-insturctor-blocks/"
        );

        if (response.status === 200) {
          // Extract instructor names from the fetched data
          const instructorData = response.data;
          const instructorNames = instructorData.map(
            (instructor) => instructor.Instructor_name
          );
          setInstructorNames(instructorNames);
        } else {
          console.error("Failed to fetch instructor names");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchInstructorData();
  }, []);

  const handleCheckboxChange = (value) => {
    if (selectedTrainingTypes.includes(value)) {
      setSelectedTrainingTypes(
        selectedTrainingTypes.filter((type) => type !== value)
      );
    } else {
      setSelectedTrainingTypes([...selectedTrainingTypes, value]);
    }
  };

  const handleTimeRequestChange = (time, isChecked) => {
    if (isChecked) {
      setTimeRequest([...timeRequest, time]);
    } else {
      setTimeRequest(timeRequest.filter((d) => d !== time));
    }
  };
  const handleDayOfWeekChange = (selectedDays) => {
    setDayOfWeek(selectedDays);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedTypesString = selectedTrainingTypes.join(", ");
    const selectedTimesString = timeRequest.join(", ");
    const dayOfWeekString = dayOfWeek.join(", ");
    console.log("Selected Training Types:", selectedTypesString);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/submit-flight-request/",
        {
          email: email,
          day_of_week: dayOfWeekString,
          instructor: instructor,
          training_type: selectedTypesString,
          special_requests: specialRequests,
          student_ground_blocks: studentGroundBlocks,
          student_duel_blocks: studentDuelBlocks,
          time_request: selectedTimesString,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
      } else {
        setFailed(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="requests-container grid grid-cols-1 justify-items-center p-5 rounded-xl max-w-full w-[40rem] my-16 mx-auto bg-base-200">
      <h2 className="text-4xl font-thin">Student Scheduling Request</h2>

      <div className="shadow-lg bg-base-300 mt-5 py-5 px-10 w-[35rem] rounded-lg">
        <form className="request-form" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h4 className="text-lg font-light">
              What's your student email address on file with us?
            </h4>
            <label className="label font-semibold">Email</label>
            <input
              placeholder="johndoe@example.com"
              className="input input-bordered w-full "
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <DayOfWeekCheckBoxes
            selectedDays={dayOfWeek}
            onDayChange={handleDayOfWeekChange}
          />
          <TimeCheckBoxes
            selectedTimes={timeRequest}
            onTimeChange={handleTimeRequestChange}
          />

          <div className="mb-6">
            <label className="label font-semibold">Instructor</label>
            <select
              type="text"
              placeholder="Type here"
              className="select select-bordered w-full "
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            >
              <option value="">Instructor</option>
              {instructorNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="label font-semibold">Training Type</label>
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
                  Ground blocks are classroom or simulator training sessions
                  with an instructor. One block is a 2-hour period.
                </p>
                <select
                  className="select select-bordered w-full mt-2"
                  value={studentGroundBlocks}
                  onChange={(e) => setStudentGroundBlocks(e.target.value)}
                >
                  <option value="">BLOCKS</option>

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

            <div className="flex space-x-1 py-2">
              <input
                onChange={() => {
                  handleCheckboxChange("DUEL FLIGHT");
                  setIsDualFlightChecked(!isDualFlightChecked);
                }}
                checked={selectedTrainingTypes.includes("DUEL FLIGHT")}
                type="checkbox"
                className="checkbox"
              />
              <p>DUEL FLIGHT</p>
            </div>
            {isDualFlightChecked && (
              <div className=" mb-2 bg-base-100 p-2 rounded ">
                <h4 className="text-lg">How many Dual Blocks?</h4>
                <p className="text-sm font-sm max-w-full">
                  Dual instruction events are a pre-briefing, flight training in
                  an aircraft, and debriefing with an instructor. One block is a
                  2-hour period.
                </p>
                <select
                  className="select select-bordered w-full mt-2"
                  value={studentDuelBlocks}
                  onChange={(e) => setStudentDuelBlocks(e.target.value)}
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
                <div className="flex space-x-2 my-4">
                  <input
                    onChange={
                      () => handleCheckboxChange("D-cross-country") // Update the state here
                    }
                    checked={selectedTrainingTypes.includes("D-cross-country")}
                    type="checkbox"
                    className="checkbox"
                  />
                  <p>I need cross-country flight training</p>
                </div>
                <div className="flex space-x-2 my-4">
                  <input
                    onChange={
                      () => handleCheckboxChange("D-night") // Update the state here
                    }
                    checked={selectedTrainingTypes.includes("D-night")}
                    type="checkbox"
                    className="checkbox"
                  />
                  <p>I need night flight training</p>
                </div>
              </div>
            )}
            <div className="flex space-x-1 py-2">
              <input
                onChange={() => {
                  handleCheckboxChange("SOLO");
                  setIsSoloTimeBuildChecked(!isSoloTimeBuildChecked);
                }}
                checked={selectedTrainingTypes.includes("SOLO")}
                type="checkbox"
                className="checkbox"
              />
              <p>SOLO or TIME-BUILD</p>
            </div>
            {isSoloTimeBuildChecked && (
              <div className=" mb-2 bg-base-100 p-2 rounded ">
                <h4 className="text-lg">How many Solo blocks?</h4>
                <p className="text-sm font-sm max-w-full">
                  Solo blocks are students flying an aircraft for training alone
                  under the supervision of an instructor on the ground.
                  Time-building events pair you with another solo-qualified
                  student for training purposes. One block is a 2-hour period.
                </p>
                <select className="select select-bordered w-full mt-2">
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
                <div className="flex space-x-2 my-4">
                  <input
                    onChange={
                      () => handleCheckboxChange("S/T-cross-country") // Update the state here
                    }
                    checked={selectedTrainingTypes.includes(
                      "S/T-cross-country"
                    )}
                    type="checkbox"
                    className="checkbox"
                  />
                  <p>I need solo (or time-building) cross-country flights</p>
                </div>
                <div className="flex space-x-2 my-4">
                  <input
                    onChange={
                      () => handleCheckboxChange("S/T-night") // Update the state here
                    }
                    checked={selectedTrainingTypes.includes("S/T-night")}
                    type="checkbox"
                    className="checkbox"
                  />
                  <p>I need solo (or time-building) night flights</p>
                </div>
              </div>
            )}
          </div>
          <div className="f">
            <h4 className="text-lg font-light">
              Any other special requests for next week?
            </h4>
            <label className="label font-semibold">Special requests</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder=""
            ></textarea>
            <div className="flex justify-center ">
              <button className="btn btn-wide btn-primary mt-10" type="submit">
                Submit
              </button>
            </div>
            {success && (
              <div className="alert alert-success mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your request has been submitted!</span>
              </div>
            )}
            {failed && (
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Somthing went wrong</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightRequestForm;
