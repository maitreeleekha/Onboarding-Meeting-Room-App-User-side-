import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DateFormState from '../store/createNewBookingForm';
import * as UserStore from '../store/User';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

type DateFormProps =
    DateFormState.ShowDateFormState &
    typeof DateFormState.actionCreators &
    RouteComponentProps<{}>;

type UserProps = 
    UserStore.UserState
    & typeof UserStore.actionCreators
    & RouteComponentProps<{}> 

type CustomProps = 
    DateFormState.ShowDateFormState &
    UserStore.UserState &
    typeof UserStore.actionCreators &
    typeof DateFormState.actionCreators &
    RouteComponentProps<{}>;

const DateInputForm = (props) => {


    const [dateInput, setDateInput] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dateInput);
        props.history.push(`/meetingrooms/user${props.userid}/${dateInput}`, '_self');
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

class MeetingHome extends React.PureComponent<CustomProps>
{

    userParam = false;
    userid: any;
    

    constructor(props) {
        super(props);
        this.userParam = props.match.params.user ? true : false;
        this.userid = props.match.params.user
    }


    public render() {
        console.log(this.userParam, sessionStorage.getItem("userid"));
        if (this.userParam) {
            if (this.userid.slice(1) == sessionStorage.getItem("userid")) {
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

                        <DateInputForm showDateForm={this.props.dateFormState} history={this.props.history} userid={this.userid} />

                        <br />
                        <br />
                        <button
                            className="btn btn-info btn-lg" onClick={(event) => {
                                event.preventDefault();
                                this.props.history.push(`/viewbookings/user${this.userid}/`, '_self');
                            }}
                        >
                            View previous Booking
        </button>
                    </>);
            }

            else {
                window.open("./login", "_self");
                return (
                    <>
                    </>
                    );
            }
        }
    

    else{

            if (sessionStorage.getItem("userid")) {
                this.props.history.push(`./index/user${sessionStorage.getItem("userid")}`);
                return (
                    <>
                    </>
                    )
            }

    return (
        <>
            <h1>Welcome to the Meeting Room App!</h1>
            <div>We help you book and manage your meetings effortlessly. To get started, you may choose to book a new meeting room, or can checkout your previous bookings to manage them.</div>

            <br />

            <button className="btn btn-lg btn-primary" onClick={(event) => {
                event.preventDefault();
                window.open('./login', '_self');
            }}> Please Login to continue </button>
            <br />
            <br />
            <button className="btn btn-lg btn-light" onClick={(event) => {
                event.preventDefault();
                window.open('./signup', '_self');
            }}> New User? Sign Up</button>
        </>
        
        );
}

    }


}



function mapDispatchToProps(dispatch) {
    return {
        dateFormActions: bindActionCreators(DateFormState.actionCreators, dispatch),
        userActions: bindActionCreators(UserStore.actionCreators , dispatch)
    }
}

function mapDispatchToProps2(dispatch) {
    return bindActionCreators({ ...DateFormState.actionCreators, ...UserStore.actionCreators}, dispatch);
}

export default connect(
    (state: ApplicationState) => (
        { ...state.user, ...state.dateFormState }
    ),
    mapDispatchToProps2
)(MeetingHome);