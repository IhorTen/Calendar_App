import React from 'react';
import dateFns from 'date-fns';
import './WeekDays.css';

const WeekDays = props => {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = dateFns.startOfWeek((props.currentMonth),{weekStartsOn: 1});
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='col col-center' key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
        )
    }

  return (
      <div className='days row'>{days}</div>
  )
};

export default WeekDays;