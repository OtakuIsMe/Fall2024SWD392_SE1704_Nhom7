import './CheckIn.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RxCross2 } from "react-icons/rx";
import user from '../../../Assets/user.jpg';
import { MdModeEditOutline } from "react-icons/md";
import { useState } from 'react';

const CheckIn: React.FC = () => {
    const [isDropDown, setIsDropDown] = useState<number>(0);
    const events = [
        { title: '3 Bookings', start: '2024-11-03T09:00:00', color: '#d9d2ff' }
    ];

    const bookings = [
        {
            userName: 'OtakuIsMe',
            user: user,
            roomName: 'POD Room 1',
            Period: '9:00 AM - 12:00 AM',
            PaymentMethod: 'Wallet',
            IsCheckIn: false,
        },
        {
            userName: 'OtakuIsMe',
            user: user,
            roomName: 'POD Room 1',
            Period: '9:00 AM - 12:00 AM',
            PaymentMethod: 'COD',
            IsCheckIn: true,
        },
        {
            userName: 'OtakuIsMe',
            user: user,
            roomName: 'POD Room 1',
            Period: '9:00 AM - 12:00 AM',
            PaymentMethod: 'PayPal',
            IsCheckIn: false,
        }
    ]

    const hanldePopupOnClick = (num: number) => {
        if (num != isDropDown) {
            setIsDropDown(num);
        } else {
            setIsDropDown(0);
        }
    }

    function formatTime(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    function renderEventContent(eventInfo: any) {
        return (
            <div className='event'>
                <p className='title'>{eventInfo.event.title}</p>
                <p className='time'>{formatTime(eventInfo.event.start)}</p>
            </div>
        );
    }

    function isEven(index: number): boolean {
        return index % 2 === 0;
    }

    return (
        <div id="check-in">
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                slotMinTime="07:00:00"
                slotMaxTime="18:00:00"
                events={events}
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'timeGridWeek,timeGridDay'
                }}
                eventDisplay="block"
                eventContent={renderEventContent}
                allDaySlot={false}
            />
            <div className="pop-up">
                <div className="pop-up-side-panel">
                    <div className="title-popup-out">
                        <span>Bookings</span>
                        <RxCross2 />
                    </div>
                    <div className="bookings">
                        <div className="head-table">
                            <div className="no">SI No</div>
                            <div className="user">User</div>
                            <div className="room">Room</div>
                            <div className="period">Period</div>
                            <div className="payment">Payment Method</div>
                            <div className="checkin">Check In</div>
                        </div>
                        {bookings.map((booking, index) => {
                            return (
                                <div className={`booking ${isEven(index) ? 'even' : ''}`} key={index}>
                                    <div className="no">{index + 1}</div>
                                    <div className="user">
                                        <img src={booking.user} alt="" />
                                        <span>{booking.userName}</span>
                                    </div>
                                    <div className="room">{booking.roomName}</div>
                                    <div className="period">{booking.Period}</div>
                                    <div className='payment'>{booking.PaymentMethod}</div>
                                    <div className="checkin">
                                        <div className="CheckIn-click" onClick={() => { hanldePopupOnClick(index + 1) }}>
                                            {booking.IsCheckIn ?
                                                <div className='Status True'>Already</div>
                                                :
                                                <div className='Status False'>Not Yet</div>
                                            }
                                        </div>
                                        {index + 1 === isDropDown && (
                                            <div className='checkin-dropdown'>
                                                <div className={`chosen-field ${booking.IsCheckIn ? 'chosen' : ''}`}>
                                                    <div className='Status True'>Already</div>
                                                </div>
                                                <div className={`chosen-field ${!booking.IsCheckIn ? 'chosen' : ''}`}>
                                                    <div className='Status False'>Not Yet</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckIn;