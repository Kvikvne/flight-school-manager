import React, { useState } from 'react';

function TimeCheckBoxes({ selectedTimes, onTimeChange }) {
  const [timeRequest, setTimeRequest] = useState([]);
  const times = ["0700-0900", "0800-1000", "1000-1200", "1200-1400", "1400-1600", "1600-1800", "1800-2000", "1900-2100"];

  const handleTimeRequestChange = (time, isChecked) => {
    if (isChecked) {
      setTimeRequest([...timeRequest, time]);
    } else {
      setTimeRequest(timeRequest.filter((d) => d !== time));
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-light">
        What times are you available to train next week?
      </h4>
      <label className="label font-semibold">Times</label>
      <div className="flex flex-col space-y-1">
        {times.map((time) => (
          <div key={time} className="flex space-x-1 items-center">
            <input
              type="checkbox"
              className="checkbox"
              value={time}
              checked={selectedTimes.includes(time)}
              onChange={(e) => onTimeChange(time, e.target.checked)}
            />
            <p>{time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeCheckBoxes;
