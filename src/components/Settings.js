import React from 'react';

const Settings = ({ workDuration, breakDuration, longBreakDuration, 
                    onWorkDurationChange, onBreakDurationChange, onLongBreakDurationChange }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <label className="mb-2">
        Work Duration (minutes):
        <input
          type="number"
          value={workDuration / 60}
          onChange={onWorkDurationChange}
          className="border border-gray-400 px-2 py-1 rounded-xl ml-2"
        />
      </label>
      <label className="mb-2">
        Break Duration (minutes):
        <input
          type="number"
          value={breakDuration / 60}
          onChange={onBreakDurationChange}
          className="border  border-gray-400 px-2 py-1 rounded-xl ml-2"
        />
      </label>
      <label className="mb-2">
        Long Break Duration (minutes):
        <input
          type="number"
          value={longBreakDuration / 60}
          onChange={onLongBreakDurationChange}
          className="border border-gray-400 px-2 py-1 rounded-xl ml-2"
        />
      </label>
    </div>
  );
};

export default Settings;



