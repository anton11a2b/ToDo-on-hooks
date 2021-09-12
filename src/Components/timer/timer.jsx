import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ min, sec }) => {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [minutesLeft, setMinutesLeft] = useState(min);
  const [secondsLeft, setSecondsLeft] = useState(sec);

  useEffect(() => () => clearInterval(timer), [timer]);

  const startTimer = () => {
    clearInterval(timer);

    setStarted(true);

    let seconds = secondsLeft;
    let minutes = minutesLeft;

    const newTimer = setInterval(() => {
      if (seconds !== '00') {
        seconds -= 1;
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
      } else if (minutes !== '00' && seconds === '00') {
        minutes -= 1;
        seconds = 59;
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
      } else if (minutes === '00' && seconds === '00') {
        clearInterval(timer);
        setStarted(false);
      }

      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
    }, 1000);

    return setTimer(newTimer);
  };

  const pauseTimer = () => {
    setStarted(false);

    clearInterval(timer);
  };

  let classNamePlay = 'icon icon-play';
  let classNamePause = 'icon icon-pause';

  if (started) {
    classNamePlay += ' hidden';
  } else {
    classNamePause += ' hidden';
  }

  return (
    <span className="description">
      <button type="button" className={classNamePlay} onClick={startTimer} />
      <button type="button" className={classNamePause} onClick={pauseTimer} />
      {minutesLeft}:{secondsLeft}
    </span>
  );
};

Timer.defaultProps = {
  min: '',
  sec: '',
};

Timer.propTypes = {
  min: PropTypes.string,
  sec: PropTypes.string,
};

export default Timer;
