import * as React from 'react';
import { connect } from 'react-redux';
import  './static/Room.css';
import * as UserStore from '../store/User';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as Promise from 'bluebird';
import { Redirect } from 'react-router-dom'

//react-router-dom...
// form submisison with react router.


type UserProps =
    UserStore.UserState
    & typeof UserStore.actionCreators
    & RouteComponentProps<{}> 


class Login extends React.PureComponent<UserProps> {


    //validate incoming URL.

    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        this.props.requestUser("");
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        //console.log(event.target[0].value);
        //this.props.requestUser(event.target[0].value);
        //.then(() => console.log('logger', this.props.loginuser));

        if (this.props.numUsers == -1) {
            //wait
        }

        else if (this.props.allUsers.filter(item => item.userId == event.target[0].value).length == 0) {
            //user not registered!
            alert("Looks like you haven't registered with us yet!")
            this.props.history.push('./signup')
        }
        else if (this.props.allUsers.filter(item => item.userId == event.target[0].value).length == 1) {
            console.log('LoggedIn Successfullyy');
            //this.props.setLoggedIn();
            console.log(this.props);
            sessionStorage.setItem("loggedin", "true");
            sessionStorage.setItem("userid", event.target[0].value);
            sessionStorage.setItem("username", this.props.allUsers.filter(item => item.userId == event.target[0].value)[0].userName);
            this.props.history.push(`./user:${event.target[0].value}`)
            
        }

    }
 

    public render() {
        console.log('logger', this.props.allUsers, this.props.userIsLoading, this.props.isLogged);

        if (!sessionStorage.getItem("username")) {
            return (

                <>
                    <h1>Login</h1>
                    <div className="login-body">
                        <h4> Hi! Please Enter your username </h4>
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <input className="form-control" placeholder="UserID" required />
                            <br />
                            <button className="btn-lg btn btn-primary" type="submit">Login</button>

                        </form>
                        <button className="btn-lg btn btn-light" onClick={(event) => {
                            event.preventDefault();
                            window.open('./signup', '_self');
                        }}>SignUp?</button>
                    </div>
                </>

            );
        }

        else {
            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("loggedin");

            window.open('./login', '_self');
            return (
                <>
                </>
                
                )
        }
     }
}

export default connect(
    (state: ApplicationState) => state.user,
    UserStore.actionCreators
)(Login);