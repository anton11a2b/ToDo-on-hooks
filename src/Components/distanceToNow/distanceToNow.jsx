import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const DistanceToNow = ({ date }) => {
  const [time, setTime] = useState(
    formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        () =>
          formatDistanceToNow(date, {
            addSuffix: true,
            includeSeconds: true,
          }),
        1000
      );
    });

    return () => clearInterval(timer);
  }, [date]);

  return <span className="created">{time}</span>;
};

DistanceToNow.defaultProps = {
  date: new Date(),
};

DistanceToNow.propTypes = {
  date: PropTypes.instanceOf(Date),
};

export default DistanceToNow;
