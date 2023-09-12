import React from "react";
import FlightRequestList from "./FlightRequestList";
import AircraftList from "./AircraftList";
import AircraftInputs from "./AircraftInputs";
import InstructorsInputs from "./InstructorsInputs";
import InstructorList from './InstructorList';

const InstructorDash = () => {
  return (
    <div>
      <div className="bg-base-200 my-8 p-4 rounded-lg">
        <h2 className="text-4xl p-8">Data</h2>
        <div className="collapse collapse-arrow my-5 bg-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-center text-xl font-medium">
            Student Requests
          </div>
          <div className="collapse-content">
            <FlightRequestList />
          </div>
        </div>
        {/* <div className="collapse collapse-arrow my-5 bg-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-center text-xl font-medium">
            Available Aircraft
          </div>
          <div className="collapse-content">
            <AircraftList />
          </div>
        </div> */}
        <div className="collapse collapse-arrow my-5 bg-base-300">
          <input type="checkbox" />
          <div className="collapse-title text-center text-xl font-medium">
            Instructors
          </div>
          <div className="collapse-content">
            <InstructorList />
          </div>
        </div>
      </div>
      <div className="bg-base-200 rounded-lg">
        <h2 className="text-4xl p-8">Inputs</h2>
        <div className="flex justify-center space-x-5 p-8">
          {/* <AircraftInputs /> */}
          <InstructorsInputs />
        </div>
      </div>
    </div>
  );
};

export default InstructorDash;
