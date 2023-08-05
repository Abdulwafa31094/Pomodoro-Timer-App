import React, { useState, useRef, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Settings from './Settings';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [workDuration, setWorkDuration] = useState(25 * 60); // 25 minutes in seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // 5 minutes in seconds
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60); // 15 minutes in seconds
  const [currentDuration, setCurrentDuration] = useState(workDuration);
  const [initialWorkDuration, setInitialWorkDuration] = useState(workDuration);
  const [initialBreakDuration, setInitialBreakDuration] = useState(breakDuration);
  const [initialLongBreakDuration, setInitialLongBreakDuration] = useState(longBreakDuration);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const timerRef = useRef();

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };
  

    // Store the initial duration values in state variables
    useEffect(() => {
      setInitialWorkDuration(workDuration);
      setInitialBreakDuration(breakDuration);
      setInitialLongBreakDuration(longBreakDuration);
    }, [workDuration, breakDuration, longBreakDuration]);


  const handleBreakClick = () => {
    setCurrentDuration(breakDuration);
    setIsActive(true);
  };

  const handleWorkClick = () => {
    setCurrentDuration(workDuration);
    setIsActive(true);
  };

  const handleLongBreakClick = () => {
    setCurrentDuration(longBreakDuration);
    setIsActive(true);
  };

  const completeTimer = () => {
    setIsActive(false);
    if (currentDuration === workDuration) {
      setCurrentDuration(breakDuration);
    } else {
      setCurrentDuration(workDuration);
    }
  };

  const handleSettingsClick = () => {
    setSettingsVisible((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false); // Pause the timer
    if (currentDuration === workDuration) {
      setCurrentDuration(initialWorkDuration);
    } else if (currentDuration === breakDuration) {
      setCurrentDuration(initialBreakDuration);
    } else {
      setCurrentDuration(initialLongBreakDuration);
    }
    if (timerRef.current) {
      timerRef.current.getInstance().forceUpdate(); // Reset the CountdownCircleTimer instance
    }
  };

  const handleWorkDurationChange = (event) => {
    const value = event.target.value;
    setWorkDuration(value * 60);
    if (currentDuration === workDuration) {
      setCurrentDuration(value * 60);
      if (isActive) {
        resetTimer();
      }
    }
  };

  const handleBreakDurationChange = (event) => {
    const value = event.target.value;
    setBreakDuration(value * 60);
    if (currentDuration === breakDuration) {
      setCurrentDuration(value * 60);
      if (isActive) {
        resetTimer();
      }
    }
  };

  const handleLongBreakDurationChange = (event) => {
    const value = event.target.value;
    setLongBreakDuration(value * 60);
    if (currentDuration === longBreakDuration) {
      setCurrentDuration(value * 60);
      if (isActive) {
        resetTimer();
      }
    }
  };

  return (
    <div className="w-80 p-6 bg-transparent rounded-md shadow-xl shadow-cyan-800 hover:shadow-2xl hover:shadow-cyan-950 m-auto">
      <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="flex justify-center space-x-2 mb-4">
        <button
          onClick={handleWorkClick}
          className="px-3 py-2 bg-blue-500 text-white hover:rounded-2xl rounded-xl"
        >
          Work
        </button>
        <button
          onClick={handleBreakClick}
          className="px-3 py-2 bg-yellow-500 hover:rounded-2xl text-white rounded-xl"
        >
          Break
        </button>
        <button
          onClick={handleLongBreakClick}
          className="px-3 py-2 bg-green-500 text-white rounded-xl hover:rounded-2xl"
        >
          Long Break
        </button>
        <button
          onClick={handleSettingsClick}
          className="px-3 py-2 bg-purple-700 hover:rounded-2xl text-white rounded-xl"
        >
          {settingsVisible ? 'Close Settings' : 'Settings'}
        </button>
      </div>
      {settingsVisible && (
        <Settings
          workDuration={workDuration}
          breakDuration={breakDuration}
          longBreakDuration={longBreakDuration}
          onWorkDurationChange={handleWorkDurationChange}
          onBreakDurationChange={handleBreakDurationChange}
          onLongBreakDurationChange={handleLongBreakDurationChange}
        />
      )}
      <CountdownCircleTimer
        ref={timerRef}
        key={currentDuration} // Key prop ensures re-rendering on reset
        isPlaying={isActive}
        duration={currentDuration}
        colors={[
          ['#F87171'], // Work Timer Color
          ['#60A5FA'], // Break Timer Color
          ['#34D399'], // Long Break Timer Color
        ]}
        size={200}
        strokeWidth={15}
        onComplete={completeTimer}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-2">
              {Math.floor(remainingTime / 60)}:{remainingTime % 60}
            </div>
            <div className="flex">
              <button
                onClick={isActive ? pauseTimer : startTimer}
                className="w-24 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full mr-2"
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetTimer}
                className="w-24 p-2 bg-red-500 hover:bg-red-700 text-white rounded-full"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default PomodoroTimer;