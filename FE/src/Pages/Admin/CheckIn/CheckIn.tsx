import './CheckIn.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RxCross2 } from "react-icons/rx";
import user from '../../../Assets/user.jpg';

const CheckIn: React.FC = () => {
    const events = [
        { title: '3 Bookings', start: '2024-11-03T09:00:00', color: '#d9d2ff' }
    ];

    const bookings = [
        {
            userName: 'OtakuIsMe',
            user: user,
            roomName: 'POD Room 1',
            Period: '9:00 AM - 12 AM',
            IsCheckIn: false,
        },
        {
            userName: 'OtakuIsMe',
            user: user,
            roomName: 'POD Room 1',
            Period: '9:00 AM - 12 AM',
            IsCheckIn: false,
        },
        {
            userName: 'OtakuIsMe',
            user: user,
            roomName: 'POD Room 1',
            Period: '9:00 AM - 12 AM',
            IsCheckIn: false,
        }
    ]

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
                            <div className="checkin">Check In</div>
                            <div className="action">Action</div>
                        </div>
                        {bookings.map((booking, index) => {
                            return (
                                <div className={`booking ${isEven(index) ? 'even' : ''}`} key={index}>
                                    <div className="no">{index}</div>
                                    <div className="user">
                                        <img src={booking.user} alt="" />

                                    </div>
                                    <div className="room">Room</div>
                                    <div className="period">Period</div>
                                    <div className="checkin">Check In</div>
                                    <div className="action">Action</div>
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