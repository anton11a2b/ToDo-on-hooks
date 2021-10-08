import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { checkSeconds, checkMinutes } from '../../utils/checkTime';

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
      seconds = checkSeconds(minutes, seconds);
      minutes = checkMinutes(minutes, seconds, timer, setStarted);

      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
    }, 1000);

    return setTimer(newTimer);
  };

  const pauseTimer = () => {
    setStarted(false);

    clearInterval(timer);
  };

  const classNamePlay = cn('icon icon-play', { hidden: started });
  const classNamePause = cn('icon icon-pause', { hidden: !started });

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
