import * as React from 'react';
import { connect } from 'react-redux';
import * as RoomsBookingsStore from '../store/Rooms';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import './static/Room.css';

type RoomBookingProps =
    RoomsBookingsStore.RoomsBookingsState
    & typeof RoomsBookingsStore.actionCreators
    & RouteComponentProps<{ user: string, date: string, room: string }>


const AdditionalReqForm = (props) => {


    let layoutOptions = [];
    if (props.type == "A") {

        layoutOptions = ["Rounds", "U-shape-cabinet", "Cabinet", "Auditorium"];
    }

    else if (props.type == "B") {
        layoutOptions = ["Chairs-in-circle", "Banked-cabinet", "Cabinet"];
    }

    else {
        layoutOptions = ["Auditorium", "Classroom", "U-shape-cabinet"];
    }

    console.log(layoutOptions);

    const handleSubmit = (event) => {
        event.preventDefault();
        let s = "";
        for (let i = 0; i < event.target.length; i++) {
            if (event.target[i].checked) {
                s = s + event.target[i].value;
                if (i != event.target.length - 1) {
                    s = s + ',';
                }
            }
        }
        let final_layout = s.split(',')[0];
        let final_req = s.split(',').splice(1).join('-');
        // booking id:
        let bookingid = props.date.split('-').join('') + props.time.split('-').join('').split(':').join('')


        //create post request here!
        let today = new Date().toISOString().slice(0, 10);
        let postBooking = `/bookingconfirmed/user${props.userid}/${bookingid}/${props.room}/${props.date}/${props.time}/${final_layout}/${final_req}`;
        let bookingArgs = {
            "bookingId": bookingid,
            "roomId": props.room,
            "bookingDate": today,
            "meetingDate": props.date,
            "meetingTime": props.time,
            "employeeId": props.userid.slice(1),
            "actionRequired": "",
            "equip": final_req,
            "layoutRequired": final_layout
        }

        //props.history.push(`/bookingconfirmed/user${props.userid}/${bookingid}/${props.room}/${props.date}/${props.time}/${final_layout}/${final_req}`, '_self');

        props.postURL(bookingArgs, postBooking);
    }

    return (
        <>
            <br />
            
            
            <form className="form-group additionalform" onSubmit={handleSubmit}>
                Please specify the layout for the room, and we will get it all set for you! You can select one from the following options:<br/>
                <h3>Layout options:</h3>
                <br/>
                {layoutOptions.map((item: string) =>
                    <div key={item}>
                        <input type="radio" id={item} name="layoutoption" value={item} required />
                        <label> {item}</label>
                    </div>
                )}

                <br />
                To make your meetings super smooth, we provide you with the options of availing additional equipment.<br /> 
                <h3>Equipment options:</h3>

                <br />

                <input type="checkbox" name="eqpoptions" value="printer" />
                <label>Printer</label>
                <br/>
                <input type="checkbox" name="eqpoptions" value="HDMI" />
                <label>HDMI Converter</label>
                <br/>
                <input type="checkbox" name="eqpoptions" value="TV" />
                <label>TV</label>

                <br />
                <br />
                <button type="submit" className="btn btn-primary btn-lg"> Confirm Booking</button>
            </form>
            <br />
            <br />
        </>
        
        );

}



class BookRoom extends React.PureComponent<RoomBookingProps> {
    dateParam = '';
    roomParam = '';
    timeParam = '';
    typeParam = '';
    userParam = '';

    constructor(props) {
        super(props);
        this.dateParam = props.match.params.date;
        this.roomParam = props.match.params.room;
        this.timeParam = props.match.params.time;
        this.typeParam = props.match.params.type;   
        this.userParam = props.match.params.user;
    }


    public componentDidMount() {
       
        const f2 = this.ensureRoomsFetched();
        const f1 = this.ensureBookingsFetched();

    }
    ensureBookingsFetched() {
        this.props.requestBookings("");
    }
    ensureRoomsFetched() {
        this.props.requestRooms(this.roomParam);
    }


    private checkTimeOverlap(dbTime: string, qsTime: string) {
        let fromTime = dbTime.split('-')[0];
        let toTime = dbTime.split('-')[1];


        let tempfrom = qsTime.split('-')[0];
        let tempto = qsTime.split('-')[1];

        if ((fromTime >= tempfrom && fromTime < tempto) || (toTime > tempfrom && toTime <= tempto) || (fromTime < tempfrom && toTime > tempto)) {
            return true;
        }
        return false;
    }

    private checkAlreadyBooked(booking_item: RoomsBookingsStore.Booking) {
       if (booking_item.roomId == this.roomParam && booking_item.meetingDate == this.dateParam && this.checkTimeOverlap(booking_item.meetingTime.toString(), this.timeParam)) {
                return true;                
        }

        return false;        
    }

    private checkDateFormat() {
        let m = this.dateParam.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
        if (!m) {
            window.open('/notfound', '_self');  
            return false;
        }
        return true;
    }

    private checkTimeFormat() {
        if (this.timeParam.split('-').length != 2) {
            return false;
        }
        let from = this.timeParam.split('-')[0];
        let to = this.timeParam.split('-')[1];

        let from_match = from.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
        let to_match = to.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);

        if (from_match && to_match && from_match < to_match) {
            return true;
        }
        return false;

}

    public render() {
        
        let today = new Date().toISOString().slice(0, 10);

        // VALIDATE INCOMING PARAMS
        if (today > this.dateParam) {
            // cannot search for past dates. route to error page
            window.open(`/index/user${this.userParam}`, '_self');
            //window.open('/index/user:52321', '_self');
        }

        if (this.checkDateFormat() &&
            this.checkTimeFormat() &&
            this.props.numRooms == 1 &&
            this.props.rooms.length == 1 &&
            this.props.rooms[0]["roomType"].localeCompare(this.typeParam) == 0 &&
            this.userParam.slice(1) == sessionStorage.getItem("userid") &&
            this.props.bookings.filter(item => this.checkAlreadyBooked(item)).length == 0 &&
            this.props.numBookings != -1
        ) {
            return (
                <>
                    < h1 > Great News! </ h1 >
                    <h3> {this.roomParam} is available on {this.dateParam}, {this.timeParam}</h3>
                    <AdditionalReqForm type={this.typeParam} room={this.roomParam} date={this.dateParam} time={this.timeParam} history={this.props.history} userid={this.userParam} postURL={this.props.postBooking}/>
                </>
            );
        }

        else if (this.props.numBookings == -1 || this.props.numRooms==-1 ) {
            return (
                <>
                    Loading...
                </>
            );
        }
        else {

            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("loggedin");

            window.open('./notfound', '_self');
            return (
                <>
                </>
                );
        }

    }

}

export default connect(
    (state: ApplicationState) => state.rooms,// Selects which state properties are merged into the component's props
    RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(BookRoom);