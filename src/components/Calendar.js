import React, {Component} from 'react';
import dateFns from 'date-fns';
import './Calendar.css'
import Header from "./containers/Header/Header";
import WeekDays from './containers/WeekDays/WeekDays';
import CalendarCells from './containers/CalendarCells/CalendarCells';

class Calendar extends Component{

    state = {
        currentMonth: new Date(),
        currentDay: new Date(),
        selectedDate: new Date(),
        value: '',
        event: '',
        persons: ''
    };


    changeMonth = next => {
        const updateMonth = next ? dateFns.addMonths : dateFns.subMonths;
        this.setState({
            currentMonth: updateMonth(this.state.currentMonth, 1)
        })
    };

    changeValue = event => {
        this.setState({
            value: event.target.value,

        });
    };

    changeEvent = event => {
        this.setState({
            event: event.target.value
        })
    };

    changePersons = event => {
      this.setState({
          persons:event.target.value
      })
    };

    getDescriptionValue = (day, date) => {
        this.setState({
            selectedDate: day
        });
        console.log(this.state.event, this.state.value);
        alert('Event: ' + this.state.event + ', with: ' + this.state.persons + ', added on: ' + date );
        this.setState({
            value: ''
        })
    };

    render() {
        return (
            <div className='calendar'>
                <Header
                    currentDay={this.state.currentDay}
                    currentMonth={this.state.currentMonth}
                    changeMonth={(next) => this.changeMonth(next)}
                />
                <WeekDays
                    currentMonth={this.state.currentMonth}
                />
                <CalendarCells
                    currentMonth={this.state.currentMonth}
                    selectedDate={this.state.selectedDate}
                    changeValue={this.changeValue}
                    changeEvent={this.changeEvent}
                    changePersons={this.changePersons}
                    add={this.getDescriptionValue}
                    value={this.state.value}
                    event={this.state.event}
                    persons={this.state.persons}
                />
            </div>
        );
    }
}

export default Calendar