import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Timer = (props) => {
  const { initialMinute = 0 } = props;
  const [minutes, setMinutes] = useState(60 * initialMinute);
  const history = useHistory();

  useEffect(() => {
    let timmerInterval = setInterval(() => {
      setMinutes((minutes) => minutes - 1);
    }, 1000);
    return () => {
      clearInterval(timmerInterval);
    };
  }, [minutes]);

  useEffect(() => {
    if (minutes < 0) {
      setMinutes(0);
      history.push('/');
    }
  }, [history, minutes]);

  return (
    <>
      <div className="time_clock">
        {String(Math.floor(minutes / 60)).padStart(2, 0)}:{String(minutes % 60).padStart(2, 0)}
      </div>
    </>
  );
};

export default Timer;
