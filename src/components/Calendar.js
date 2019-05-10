import React, {Component} from 'react';
import dateFns from 'date-fns';
import './Calendar.css'
import Popup from 'reactjs-popup';
import PopupForm from './PopupForm'

class Calendar extends Component{

    state = {
        currentMonth: new Date(),
        currentDay: new Date(),
        selectedDate: new Date(),
        value: '',
        description: null,
    };

    renderHeader() {
        const dateFormat = 'MMMM YYYY';

        return (
            <div className='header row'>
                <div className='col col-start'>
                    <b>{dateFns.format(this.state.currentDay, 'dddd, MMMM D, YYYY')}</b>
                </div>
                <div className='col col-center'>
                    <div className='icon' onClick={this.prevMonth}>
                        chevron_left
                    </div>
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                    <div className='icon' onClick={this.nextMonth}>
                        chevron_right
                    </div>
                </div>
                <div className='col col-end'>
                    <Popup
                        trigger={<a className='btn add_event' href='#' title='Choose date'> Add event</a>}
                        position='bottom center'
                        closeOnDocumentClick
                        contentStyle={{
                            width: '300px',
                        }}
                        value={this.state.value}
                        key={Math.random()}
                    >
                        <PopupForm
                            getValue={(event) => this.inputChangeHandler(event)}
                            value={this.state.value}
                        />
                    </Popup>
                    <a className='btn update' href='#' title='Choose date'> Update</a>
                    <div style={{display: 'inline-block'}}>
                        <span className='icon' style={{marginLeft: '20px'}}> search </span>
                        <input className='search' type="text" placeholder='Event, date of person'/>
                    </div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = 'dddd';
        const days = [];

        let startDate = dateFns.startOfWeek((this.state.currentMonth),{weekStartsOn: 1});
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className='col col-center' key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            )
        }

        return <div className='days row'>{days}</div>
    }

    renderCells() {
        const { currentMonth, selectedDate} = this.state;
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
                const cloneDay = day;
                days.push(
                    <Popup
                        trigger={
                            <div
                                className={`col cell
                                    ${!dateFns.isSameMonth(day, monthStart)
                                        ? 'disabled'
                                        : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''}
                                    ${dateFns.isToday(day) ? 'today' : '' }`}
                                key={day}
                                onClick={ () => this.onDateClick(cloneDay)}
                            >
                                <span className='number'> {formattedDate} </span>
                            </div>}
                        position='bottom center'
                        closeOnDocumentClick
                        contentStyle={{
                            width: '300px',
                        }}
                        key={day}
                    >
                        <PopupForm
                            date={dateFns.format(day, 'DD MMMM YYYY')}
                            getValue={(event) => this.inputChangeHandler(event)}
                            value={this.state.value}
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

        return <div className='body'> {rows} </div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    };

    inputChangeHandler = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    render() {
        return (
            <div className='calendar'>
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar