import './CheckIn.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RxCross2 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { useState } from 'react';
import { ApiGateway } from '../../../Api/ApiGateway';
import { useRef } from 'react';

const CheckIn: React.FC = () => {
    const calendarRef = useRef(null);
    const [isDropDown, setIsDropDown] = useState<number>(0);
    const [schedule, setSchedule] = useState<any>([]);
    const [focusBooking, setFocusBooking] = useState<any>(null);
    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)

    const events = schedule.map((booking: any, index: number) => ({
        title: `${booking.amount} Bookings`,
        start: `${booking.startBooking}`,
        color: '#d9d2ff',
        extendedProps: { index }
    }));

    const fetchSchedule = async (startDate: string, endDate: string) => {
        const data = await ApiGateway.ScheduleManager(startDate, endDate);
        console.log(data)
        setSchedule(data);
    }

    const handleDateChange = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            const view = calendarApi.view;
            const start = view.currentStart;
            const end = view.currentEnd;
            fetchSchedule(formatDateToYYYYMMDD(start), formatDateToYYYYMMDD(end))
            setStartDate(formatDateToYYYYMMDD(start));
            setEndDate(formatDateToYYYYMMDD(end));
        } else {
            console.error("calendarRef is not set.");
        }
    };

    function formatDateToYYYYMMDD(date: string): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

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
        const handleEventClick = (index: any) => {
            console.log(index)
            setFocusBooking(index);
        };
        return (
            <div className='event' onClick={() => { handleEventClick(eventInfo.event.extendedProps.index) }}>
                <p className='title'>{eventInfo.event.title}</p>
                <p className='time'>{formatTime(eventInfo.event.start)}</p>
            </div>
        );
    }

    function isEven(index: number): boolean {
        return index % 2 === 0;
    }

    function formatPeriod(startDate: string, timeBooking: string): string {
        const start = new Date(startDate);
        const [hours, minutes, seconds] = timeBooking.split(':').map(Number);

        const end = new Date(start);
        end.setHours(start.getHours() + hours, start.getMinutes() + minutes, start.getSeconds() + seconds);

        const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedStart = start.toLocaleTimeString([], options);
        const formattedEnd = end.toLocaleTimeString([], options);

        return `${formattedStart} - ${formattedEnd}`;
    }

    function handlePaymentType(indexType: number): string {
        switch (indexType) {
            case 0:
                return "PayPal";
            case 1:
                return "COD";
            case 2:
                return "Wallet";
            default:
                return "Unknown";
        }
    }

    const fetchHanldeCheckIn = async (bookingId: string, IsCheckIn: boolean) => {
        const response = await ApiGateway.CheckIn(bookingId, IsCheckIn);
        fetchSchedule(startDate, endDate);
        setIsDropDown(0)
    }

    return (
        <div id="check-in">
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                slotMinTime="07:00:00"
                slotMaxTime="18:00:00"
                events={events}
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'timeGridWeek'
                }}
                eventDisplay="block"
                eventContent={renderEventContent}
                allDaySlot={false}
                datesSet={handleDateChange}
            />
            {focusBooking !== null && (
                <div className="pop-up">
                    <div className="pop-up-side-panel">
                        <div className="title-popup-out">
                            <span>Bookings</span>
                            <RxCross2 onClick={() => { setFocusBooking(null) }} />
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
                            {schedule[focusBooking]?.bookings.map((booking, index) => {
                                return (
                                    <div className={`booking ${isEven(index) ? 'even' : ''}`} key={index}>
                                        <div className="no">{index + 1}</div>
                                        <div className="user">
                                            <img src={booking.user.image.url} alt="" />
                                            <span>{booking.user.name}</span>
                                        </div>
                                        <div className="room">{booking.room.name}</div>
                                        <div className="period">{formatPeriod(booking.dateBooking, booking.timeBooking)}</div>
                                        <div className='payment'>{handlePaymentType(booking.paymentRefunds[0]?.paymentType)}</div>
                                        <div className="checkin">
                                            <div className="CheckIn-click" onClick={() => { hanldePopupOnClick(index + 1) }}>
                                                {booking.isCheckIn ?
                                                    <div className='Status True'>Already</div>
                                                    :
                                                    <div className='Status False'>Not Yet</div>
                                                }
                                            </div>
                                            {index + 1 === isDropDown && (
                                                <div className='checkin-dropdown'>
                                                    <div className={`chosen-field ${booking.isCheckIn ? 'chosen' : ''}`}
                                                        onClick={() => fetchHanldeCheckIn(booking.id, true)

                                                        }>
                                                        <div className='Status True'>Already</div>
                                                    </div>
                                                    <div className={`chosen-field ${!booking.isCheckIn ? 'chosen' : ''}`}
                                                        onClick={() => fetchHanldeCheckIn(booking.id, false)

                                                        }>
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
            )}
        </div>
    )
}
export default CheckIn;