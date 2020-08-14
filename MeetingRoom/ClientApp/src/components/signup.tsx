import * as React from 'react';
import { connect } from 'react-redux';
import './static/Room.css';
import * as UserStore from '../store/User';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';

type UserProps =
    UserStore.UserState
    & typeof UserStore.actionCreators
    & RouteComponentProps<{}> 


class Signup extends React.PureComponent<UserProps>  {


    //validate incoming URL.

    constructor(props) {
        super(props);
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        //post request here.

        //this.props.postUser()
        let userobj = {
            "userId": event.target[0].value,
            "userName": event.target[1].value,
            "emailId": event.target[2].value,
            "password": event.target[3].value
        }
        console.log("submit details", userobj);
        this.props.postUser(userobj)
        // console.log("submit details", event.target[0].value);

    }
    public render() {

        return (
            <>                
                <h1> Sign Up! </h1>
                <div className='signup-body form-group'>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <input className="form-control" name="Employee ID" type="text" placeholder="Employee ID" required />
                        <input className="form-control" name="Full Name" type="text" placeholder="Full Name" required/>
                        <input className="form-control" name="Email ID" type="email" placeholder="Email ID" required />
                        <input className="form-control" name="Password" type="password" placeholder="Password" required />
                        <button className="btn-lg btn btn-primary" type="submit">Submit Details</button>

                    </form>
                    
                </div>
            </>

        );
    }
}

export default connect(
    (state: ApplicationState) => state.user,
    UserStore.actionCreators
)(Signup);