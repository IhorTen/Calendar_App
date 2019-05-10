import React from 'react';
import './PopupForm.css';

const PopupForm = props => (
    <div className='popupForm'>
        <input type="text" className='popup_input inEvent' placeholder='Event' />
        <input type="text"className='popup_input inDate' placeholder='Day, month, year' value={props.date? props.date:null} />
        <input type="text" className='popup_input inNames' placeholder='Persons' />
        <br/>
        <span className='popup_description'> Description: </span>
        <br/>
        <textarea name="description" value={props.value} id="event_description" cols="34" rows="5" maxLength={150} onChange={props.getValue} > </textarea>
        <br/><br/>
        <div className='popup_btn'>
            <button className="btn_done" onClick={props.getValue}> Done </button>
            <button className='btn_delete'> Delete </button>
        </div>
    </div>
);

export default PopupForm;
