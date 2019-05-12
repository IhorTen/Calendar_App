import React from 'react';
import './PopupForm.css';


const PopupForm = props => (
    <div className='popupForm'>
        <input
            type="text"
            className='popup_input inEvent'
            placeholder='Event'
            value={props.event}
            onChange={props.changeEvent}
        />
        <input
            type="text"
            className='popup_input inDate'
            placeholder='Day, month, year'
            readOnly={props.readOnly}
            value={props.date ? props.date:null}
        />
        <input
            type="text"
            className='popup_input inNames'
            placeholder='Persons'
            value={props.persons}
            onChange={props.changePersons}
        />
        <br/>
        <label htmlFor="event_description"> Description
            <textarea
                name="description"
                value={props.description}
                id="event_description"
                cols="34" rows="5"
                maxLength={150}
                onChange={props.changeValue}
            />
            <br/><br/>
            <div className='popup_btn'>
                <button className="btn_add" onClick={props.getEventValues}
                > Add </button>
                <button className='btn_delete'> Delete </button>
            </div>
        </label>
    </div>
);

export default PopupForm;