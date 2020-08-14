import * as React from 'react';
import { connect } from 'react-redux';
import { Img } from 'react-image';
import './static/Room.css';
import * as RoomsBookingsStore from '../store/Rooms';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';

type RoomBookingProps =
    RoomsBookingsStore.RoomsBookingsState
    & typeof RoomsBookingsStore.actionCreators
    & RouteComponentProps<{ user: string, date: string, room: string }>



const BookingItem = (props) => {

    // rebook this room for a different date: all
    // cancel and edit: only for those bookings where the meeting is yet to happen (current date < meeting date.)

    const [dateInput, setDateInput] = React.useState('');
    const [showRebookForm, setShowReebookForm] = React.useState(false);

    const meetingDate = props.meetingDate;
    const currentDate = new Date().toISOString().slice(0, 10);

    const show = currentDate < meetingDate;

    const handleBookSubmit = (event) => {
        event.preventDefault();
        props.history.push(`/meetingrooms/user:53231/${dateInput}/${props.roomId}/`, '_self');
    }
        
    return (        
        <div className="roomDiv" style={{ backgroundColor: show ? '#D9E3F0' : 'light-grey' }}>
            <div className="roomInfoDiv" >
                <Img src="https://i0.wp.com/worldwellnessgroup.org.au/wp-content/uploads/2020/07/placeholder.png?w=1200&ssl=1" className="img-responsive roomImage" />
                < h3 className="roomName" > {props.roomId} </ h3 >
                < div className="roomDesc" >Booked on: {props.bookingDate}. Meeting Date and Time: {props.meetingDate}, {props.meetingTime} </ div >

            </div>

            <button className="btn btn-sm btn-danger booking-button" style={{ display: show ? 'block' : 'none' }} onClick={(event) => {
                event.preventDefault();
                let m = window.confirm("Are you sure you want to delete this booking? You will not be able to undo this change if you confirm. Click cancel if you don't want to cancel.");
                if (m) {

                    props.cancelBooking(props.bookingId);
                }

            }}> Cancel this booking </button>


            <button className="btn btn-sm btn-warning booking-button" style={{ display: show ? 'block' : 'none' }} onClick={(event) => {
                event.preventDefault();
                let editDecision = window.confirm("Are you sure you want to edit this booking?");
                if (editDecision) {
                    props.history.push(`/editbooking/${props.bookingId}`, '_self');
                }

            }}> Edit this booking </button>

          

            <button className="btn btn-sm btn-primary booking-button" onClick={(event) => {
                event.preventDefault();
                setShowReebookForm(true);

            }}> Book Again! </button>


            <form className="form-group rebookform" style={{ display: showRebookForm ? 'block' : 'none' }} onSubmit={handleBookSubmit}>

                <label> What date are you looking for?</label>
                <br />
                <input type="date"
                    id="date-input"
                    className="form-control-sm"
                    value={dateInput}
                    onChange={(event) => { setDateInput(event.target.value) }}
                    required />
                
                <button className="btn btn-light btn-sm">Check Availability</button>
                 
            </form>


        </div>
        
        );

}

class ViewBookings extends React.PureComponent<RoomBookingProps> {
    userParam = '';


    constructor(props) {
        super(props);
        this.userParam = props.match.params.user;
    }


    public componentDidMount() {
        this.props.requestBookings(this.userParam);
    }

    public render() {

        console.log(this.userParam.slice(1), this.props.bookings.length);

        if (this.userParam.slice(1) != sessionStorage.getItem("userid")) {
            
            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("loggedin");

            window.open('./notfound', '_self');
            return (
                <>
                </>
            );
        }

        return (

            <>

                {this.props.bookings.map((booking) => <BookingItem key={booking.bookingId} {...booking} history={this.props.history} cancelBooking={this.props.deleteBookingAction} />)}

            </>


        );
    }

}


export default connect(
    (state: ApplicationState) => state.rooms,// Selects which state properties are merged into the component's props
    RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(ViewBookings as any);
