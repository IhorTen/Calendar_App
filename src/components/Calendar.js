import React, {Component} from 'react';
import dateFns from 'date-fns';
import './Calendar.css'
import Header from "./containers/Header/Header";
import WeekDays from './containers/WeekDays/WeekDays';
import CalendarCells from './containers/CalendarCells/CalendarCells';
import eventList from '../eventList'

class Calendar extends Component{

    state = {
        currentMonth: new Date(),
        currentDay: new Date(),
        selectedDate: new Date(),
        event: "",
        persons: "",
        description: "",
    };


    changeMonth = next => {
        const updateMonth = next ? dateFns.addMonths : dateFns.subMonths;
        this.setState({
            currentMonth: updateMonth(this.state.currentMonth, 1)
        })
    };

    changeValue = event => {
        this.setState({
            description: event.target.value,

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

    getEventValues = (day, date) => {
        this.setState({
            selectedDate: day
        });

        eventList.events.push({
            "event": this.state.event,
            "date": date,
            "persons": this.state.persons,
            "description": this.state.description
        });

        alert('Event: ' + this.state.event + ', with: ' + this.state.persons + ', added on: ' + date );
        this.setState({
            value: "",
            event: "",
            persons: "",
            description: ""
        })
    };
    
    renderEvents = (date, arr) => {
        for (let i = 0; i < arr.length; i++){
            if (date === arr[i].date) {
                return <div
                    className='events'
                >
                    <br/>
                    Event: <span className='bold'> {arr[i].event} </span>
                    <br/>
                    Persons: <span className='bold'>{arr[i].persons}</span>
                    <br/>
                    <span> {arr[i].description} </span>
                </div>
            }
        }
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
                    getEventValues={this.getEventValues}
                    event={this.state.event}
                    persons={this.state.persons}
                    description={this.state.description}
                    events={eventList.events}
                    renderEvents={this.renderEvents}
                />
            </div>
        );
    }
}

export default Calendar