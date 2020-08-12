import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DateFormState from '../store/createNewBookingForm';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

type DateFormProps =
    DateFormState.ShowDateFormState &
    typeof DateFormState.actionCreators &
    RouteComponentProps<{}>;



const DateInputForm = (props) => {


    const [dateInput, setDateInput] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dateInput);
        window.open(`/meetingrooms/user:53231/${dateInput}`, '_self');
        }
    
    return (
        // add logic to check that the date entered is of future only
        // 
        // 
        <form className="form-group" onSubmit={handleSubmit}
            style={{ display: props.showDateForm  === true
                ? 'block': 'none'}}>

            <label> What date are you looking for?</label>
            <br/>
            <input type="date"
                id="date-input"
                className="form-control-sm"
                value={dateInput}
                onChange={(event) => {setDateInput(event.target.value)}}
                required />
            <br />
            <br/>
            <button type="submit" className="btn btn-light">Search rooms </button>
        </form>

    );
    
}

class MeetingHome extends React.PureComponent<DateFormProps>
{





    public render() {

        return (
            <>
                <h1>Welcome to the Meeting Room App!</h1>
                <div>We help you book and manage your meetings effortlessly. To get started, you may choose to book a new meeting room, or can checkout your previous bookings to manage them.</div>

                <br />

                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => { this.props.showDateForm(); }}
                >
                    Create a new Booking
        </button>
                <br />
                <br />

         <DateInputForm showDateForm={this.props.dateFormState}/>

                <br />
                <br />
                <button
                    className="btn btn-info btn-lg" onClick={(event) => {
                        event.preventDefault();
                        window.open(`/viewbookings/user:53231/`, '_self');
                    }}
                >
                    View previous Booking
        </button>
            </>);

    }


}

export default connect(
    (state: ApplicationState) => state.dateFormState,
    DateFormState.actionCreators
)(MeetingHome);