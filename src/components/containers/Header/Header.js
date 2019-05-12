import React from 'react';
import dateFns from 'date-fns';
import './Header.css'
import Popup from 'reactjs-popup';


const Header = props => {
    const dateFormat = 'MMMM YYYY';

    return (
        <div className='header row'>
            <div className='col col-start'>
                <b>{dateFns.format(props.currentDay, 'dddd, MMMM D, YYYY')}</b>
            </div>
            <div className='col col-center'>
                <div className='icon' onClick={() => props.changeMonth(false)}>
                    chevron_left
                </div>
                <span>
                        {dateFns.format(props.currentMonth, dateFormat)}
                    </span>
                <div className='icon' onClick={() => props.changeMonth(true)}>
                    chevron_right
                </div>
            </div>
            <div className='col col-end'>
                <Popup
                    trigger={<button className='btn add_event' title='Choose date'> Add event</button>}
                    position={'bottom center'}
                    closeOnDocumentClick
                    contentStyle={{
                        width: '300px',
                        textAlign: 'center'
                    }}
                    key={Math.random()}
                    children={'To make event click the date on the calendar'}
                />
                <button className='btn update' title='Choose date'> Update</button>
                <div style={{display: 'inline-block'}}>
                    <span className='icon' style={{marginLeft: '20px'}}> search </span>
                    <input className='search' type="text" placeholder='Event, date of person'/>
                </div>
            </div>
        </div>
    )
};

export default Header;