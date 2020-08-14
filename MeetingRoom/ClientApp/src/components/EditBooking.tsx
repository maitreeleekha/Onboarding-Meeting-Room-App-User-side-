import * as React from 'react';
import { connect } from 'react-redux';
import * as RoomsBookingsStore from '../store/Rooms';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';


type RoomBookingProps =
    RoomsBookingsStore.RoomsBookingsState
    & typeof RoomsBookingsStore.actionCreators
    & RouteComponentProps<{ user: string, bookingid: string}> 


class EditBooking extends React.PureComponent<RoomBookingProps>  {


    //validate incoming URL.
    bookingId = '';


    constructor(props) {
        super(props);
        this.bookingId = props.match.params.bookingid;
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        // initiate a post request

        this.props.putActionRequired(this.props.match.params.bookingid, event.target[0].value);
        


    }

    public render() {

        return (

            <>
                < h1 > Edit Your Bookings </ h1 >
               <h5> Fill up the below form stating your requirements and we will get back to you with the updates on the matter shortly. </h5>
                
                <br />
                <form className="form-group edit-form" onSubmit={this.handleSubmit}>
                    <label>Please describe clearly what you want to edit regarding this booking:</label>
                    <input type="textarea" className="form-control" name="edit_desc" placeholder="" />
                    <button className="btn btn-primary btn-md" type = "submit">Submit Request</button>
                </form>


            </>


        );
    }

}

export default connect(
    (state: ApplicationState) => state.rooms,// Selects which state properties are merged into the component's props
    RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(EditBooking);