import * as React from 'react';
import { Img } from 'react-image';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
//export default connect()(Rooms);
import { bindActionCreators } from 'redux';
import { ApplicationState } from '../store';
import * as BookingStore from '../store/Bookings';
import * as RoomsBookingsStore from '../store/Rooms';
import './static/Room.css';

//type RoomsProps =
//    RoomsStore.RoomsState // ... state we've requested from the Redux store
//    & typeof RoomsStore.actionCreators // ... plus action creators we've requested
//    & RouteComponentProps<{date: string}>; // ... plus incoming routing parameters

type RoomBookingProps=
    RoomsBookingsStore.RoomsBookingsState
    & typeof RoomsBookingsStore.actionCreators
    & RouteComponentProps<{ user:string, date: string , room:string }> 


const test_rooms = [

    { roomId: 'ND-B1-A4-09', RoomType: 'A', Location: 'Noida', Capacity: 8, Description: '', Status: 'N' },
    { roomId: 'ND-B1-A3-02', RoomType: 'B', Location: 'Noida', Capacity: 15, Description: '', Status: 'N' },
    { roomId: 'HYD-B2-B4-03', RoomType: 'A', Location: 'Hyderabad', Capacity: 6, Description: '', Status: 'U' },
    { roomId: 'HYD-B1-A5-16', RoomType: 'C', Location: 'Hyderabad', Capacity: 9, Description: '', Status: 'N' },
    { roomId: 'BLR-B1-A3-05', RoomType: 'A', Location: 'Bangalore', Capacity: 7, Description: '', Status: 'N' },
    { roomId: 'BLR-B2-A4-09', RoomType: 'B', Location: 'Bangalore', Capacity: 8, Description: '', Status: 'U' },
]

const test_bookings = [
    { bookingId: 'XHSDJ17H', bookingDate: '2020-08-01', meetingDate: '2020-08-17', meetingTime: '11:00-13:30', empId: '785445', roomId: 'ND-B1-A4-09', AdditionalEquipments: [], ActionRequired: '' },
    { bookingId: 'XIUDU27N', bookingDate: '2020-08-03', meetingDate: '2020-09-08', meetingTime: '14:00-17:30', empId: '283973', roomId: 'HYD-B1-A5-16', AdditionalEquipments: ['Printer'], ActionRequired: '' }
]

const room_desc = {
    A: 'Equipments provided: Printer, TV, Projector, HDMI Converter, Mic. Layouts supported: Rounds, U-shape-cabinet, cabinet, auditorium.',
    B: 'Equipments provided: Projector, TV, HDMI Converter. Layouts supported: Chairs in circle, banked cabinet, cabinet.',
    C: 'Equipments provided: Mic, TV. Layouts supported: Auditorium, classroom, u-shape-cabinet.'
};



const BuzyTime = (props) => {
    if (props.buzy.length == 0) {
        return <span></span>
    }

    return (
        <>
            <br />
            <br />
            <span className="label labelWarning">This room is already booked for: {props.buzy.join(', ')}</span>
        </>
    );
}

const Room = (props) => {

   // console.log("ROOM STATUS", props.Status)
    const buzyInit: string[] = [];
    const [bookingForm, setBookingForm] = React.useState(false);
    const [fromTime, setFromTime] = React.useState('');
    const [toTime, setToTime] = React.useState('');
    const [buzy, setBuzy] = React.useState(buzyInit);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fromTime, toTime);
        console.log(buzy);

         
        // check if the user has entered a valid time slot, and that the room is not already occupied
        if (fromTime > toTime) {
            alert("Please enter a valid time slot for the meeting!");
            return;
        }


        // optimize? depending on whether the incoming array is sorted.
        for (let i = 0; i < buzy.length; i++) {
            let tempfrom = buzy[i].split('-')[0];
            let tempto = buzy[i].split('-')[1];


            if ((fromTime >= tempfrom && fromTime < tempto) || (toTime > tempfrom && toTime <= tempto) || (fromTime < tempfrom && toTime > tempto)) {
                console.log(tempfrom, tempto);  
                    alert("The room is already occupied for " + tempfrom + '-' + tempto + " on " + props.inputDate + ". Please choose a different time slot, or try another room!");
                    return;
            }
        }

        window.open(`/bookroom/user:53231/${props.inputDate}/${fromTime}-${toTime}/${props.roomId}/${props.roomType}/confirm`, '_self');
        //route to confirmation page where the user chooses a layout, additional equipment before finalizing the booking!
    }


    if (props.status == 'N') 
    {
        return (

            <div className="roomDiv" >
                < div className="roomInfoDiv" >
                    <Img src="https://i0.wp.com/worldwellnessgroup.org.au/wp-content/uploads/2020/07/placeholder.png?w=1200&ssl=1" className="img-responsive roomImage" />
                    < h3 className="roomName" > {props.roomId} ({props.location}) </ h3 >
                    < div className="roomDesc" >Capacity: {props.capacity}. {room_desc[props.roomType]}  </ div >
                </div>

                <button className="btn btn-primary btn-sm bookRoom" onClick={(event) => {
                    setBookingForm(true);

                    // check all bookings to see when this room is booked on the current date
                    // Complexity: O(Total Bookings)
                    //  OPTIMIZE THIS -- 

                    for (let i = 0; i < props.books.length; i++) {
                        if (props.books[i].meetingDate == props.inputDate && props.books[i].roomId == props.roomId) {
                            setBuzy([...buzy, props.books[i].meetingTime]);
                        }
                    }
                }}> Book </button>

                <form className="form-group" onSubmit={handleSubmit} style={{
                    display: bookingForm === true
                        ? 'block' : 'none'
                }}>
                    <label className="timeLabel">Please enter the start and end time for the meeting.</label><br />
                    <input type="time" className="form-control-md timeInput" required value={fromTime}
                        onChange={(event) => { setFromTime(event.target.value) }} />
                    <label> to </label>
                    <input type="time" className="form-control-md timeInput" required value={toTime}
                        onChange={(event) => { setToTime(event.target.value) }} />
                    <button type="submit" className="btn btn-info btn-sm">Check Availability</button>
                    <BuzyTime buzy={buzy} />
                </form>

            </div>
        );

    }

    return (
        <>
        </>
    );
}

const getDisplayRooms = (rooms: RoomsBookingsStore.Room[], roomID: any) => {

    if (!roomID) {
        return rooms;
    }
    let filteredRooms = rooms.filter(item => item.roomId == roomID);
    return filteredRooms;
}

class Rooms extends React.PureComponent<RoomBookingProps> {
    routeParam = '';
    roomParam = '';
    

    constructor(props) {
        super(props);
        this.routeParam = props.match.params.date;
        this.roomParam = props.match.params.room;
    }


    public componentDidMount() {        
       const f2 = this.ensureRoomsFetched();
       const f1 =  this.ensureBookingsFetched();

        if (this.roomParam) {
            this.setState({ _displayRooms: this.props.rooms.filter(item => item.roomId == this.roomParam) });
        }

        else {
            this.setState({ _displayRooms: this.props.rooms });
        }

    }

    ensureBookingsFetched() {
        if (this.roomParam) {
            console.log(this.roomParam);
            this.props.requestRooms(this.roomParam)
        }
        else {
            this.props.requestRooms("");
        }
    }
    ensureRoomsFetched() {
        this.props.requestBookings("");
    }


    public componentDidUpdate() {

    }

    public render() {

        console.log(this.routeParam, this.roomParam);

        // VALIDATE INCOMING URL
        let today = new Date().toISOString().slice(0, 10);
        if (today > this.routeParam) {
            // cannot search for past dates. route to error page
            //alert("Please enter a valid date to check available rooms.")
            window.open('/index/user:52321', '_self');
        }       
        if (this.roomParam && this.props.numRooms == 0) {
            // the room was deleted from the database.
            window.open('/notfound', '_self');
        }
        //VALIDATE USER ENTRY

            return (
                <>
                    < h1 > Rooms  </ h1 >
                    {this.props.rooms.map((room: RoomsBookingsStore.Room) => <Room key={room.roomId} {...room} inputDate={this.routeParam} books={this.props.bookings} />)}
                </>
            );
   
    }

}



export default connect(
    (state: ApplicationState) => state.rooms,// Selects which state properties are merged into the component's props
     RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(Rooms as any);
 