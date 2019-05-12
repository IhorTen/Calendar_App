import React from 'react';
import dateFns from 'date-fns';
import './CalendarCells.css'
import Popup from 'reactjs-popup';
import PopupForm from '../PopupForm/PopupForm'

const CalendarCells = props => {
    const { currentMonth, selectedDate} = props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(currentMonth);
    const startDate = dateFns.startOfWeek((monthStart),{weekStartsOn: 1});
    const endDate = dateFns.endOfWeek((monthEnd),{weekStartsOn: 1});

    const dateFormat = 'D';
    const rows = [];


    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cls = !dateFns.isSameMonth(day, monthStart)? 'disabled': dateFns.isSameDay(day, selectedDate)? 'selected' : '' ;
            const cls_today = dateFns.isToday(day) ? 'today' : '';
            const date = dateFns.format(day, 'DD MMMM YYYY') ;
            // const cloneDay = day;

            days.push(
                <Popup
                    trigger={
                        <div className={`col cell ${cls} ${cls_today}`} key={day}>
                            <span className='number'> {formattedDate} </span>
                        </div>}
                    position={'bottom center'}
                    closeOnDocumentClick
                    contentStyle={{
                        width: '300px'
                    }}
                    key={day}
                >
                    <PopupForm
                    date={date}
                    readOnly={true}
                    value={props.value}
                    changeValue={(event) => props.changeValue(event)}
                    changeEvent={(event) => props.changeEvent(event)}
                    changePersons={(event) => props.changePersons(event)}
                    add={() => props.add(day, date)}
                    event={props.event}
                    persons={props.persons}
                />
                </Popup>

            );
            day = dateFns.addDays(day, 1)
        }
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = []
    }

    return (
        <div className='body'> {rows} </div>
    )
};

export default CalendarCells;