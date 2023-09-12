import React, { useState } from 'react';

function DayCheckBoxes({ selectedDays, onDayChange }) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayChange = (day, isChecked) => {
    if (isChecked) {
      onDayChange([...selectedDays, day]);
    } else {
      onDayChange(selectedDays.filter((d) => d !== day));
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-light">
        When are you available to train next week?
      </h4>
      <label className="label font-semibold">Day of Week</label>
      <div className="flex flex-col space-y-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex space-x-1 items-center">
            <input
              type="checkbox"
              className="checkbox"
              value={day}
              checked={selectedDays.includes(day)}
              onChange={(e) => handleDayChange(day, e.target.checked)}
            />
            <p>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayCheckBoxes;
