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



class ConfirmedBooking extends React.PureComponent<RoomBookingProps> {
    dateParam = '';
    roomParam = '';
    timeParam = '';
    typeParam = '';
    bookingid = '';
    finallayout = '';
    finalreq = '';
    userParam = '';


    constructor(props) {
        super(props);
        
        this.dateParam = props.match.params.date;
        this.roomParam = props.match.params.room;
        this.timeParam = props.match.params.time;
        this.typeParam = props.match.params.type;
        this.finallayout = props.match.params.layout;
        this.userParam = props.match.params.user;
        this.finalreq = props.match.params.req ? props.match.params.req : "-" ;
    }

    public componentDidMount() {
        this.props.requestBookings("");
    }

    public render() {
        console.log(this.dateParam, this.props.bookings);
        let today = new Date().toISOString().slice(0, 10);

        // validate params

        if (today > this.dateParam) {
            // cannot search for past dates. route to error page
            window.open('./', '_self');
        }

        //This page is rendered after the post request of the booking has been completed. 
        // Before rendering, confirm the that post request was a success by doing a get on the same. This 
        // will also validate the qs params.


        return (

            <>
                < h1 > Thank you for booking with us! </ h1 >
                <h2> Following are the details for your booking:</h2>
                <br/>
                <div className="container">
                    <h4>Date: <span className="detailValue"> {this.dateParam} </span> </h4>  
                    <h4>Room: <span className="detailValue">  {this.roomParam} </span> </h4>
                    <h4>Time: <span className="detailValue">  {this.timeParam} </span></h4>  
                    <h4>Layout: <span className="detailValue">  {this.finallayout} </span></h4 >   
                    <h4>Additional Requirements: <span className="detailValue">  {this.finalreq}</span></h4 > 
                </div>

                <br />
                <br/>
                <button className="btn btn-primary btn-lg" onClick={(event) => {
                    event.preventDefault();
                    window.open(`./user${this.userParam}`, '_self');

                }}>Home</button>
            </>


        );
    }

}

export default connect(
    (state: ApplicationState) => state.rooms,// Selects which state properties are merged into the component's props
    RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(ConfirmedBooking);