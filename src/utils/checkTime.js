export const checkSeconds = (minutes, seconds) => {
  if (seconds !== '00') {
    return seconds <= 10 ? `0${seconds - 1}` : seconds - 1;
	}

  return minutes === '00' ? '00' : 59;
};

export const checkMinutes = (minutes, seconds, timer, setStarted) => {
  if (minutes !== '00' && seconds === 59) {
    return minutes <= 10 ? `0${minutes - 1}` : minutes - 1;
  }

  if (minutes === '00' && seconds === '00') {
    clearInterval(timer);
    setStarted(false);
  }

  return minutes;
};
