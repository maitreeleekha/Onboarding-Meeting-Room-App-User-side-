import * as React from 'react';
import { connect } from 'react-redux';
import  './static/Room.css';
import * as UserStore from '../store/User';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as Promise from 'bluebird';

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
        //this.props.requestUser('52321');
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        //console.log(event.target[0].value);
        this.props.requestUser(event.target[0].value);
        //.then(() => console.log('logger', this.props.loginuser));
        if (this.props.isLogged && !this.props.userIsLoading) {
            console.log('logger', this.props.loginuser, this.props.userIsLoading, this.props.isLogged);
        }
       

    }

    private ensureUserFetched = (id: string) => new Promise((resolve, reject) => {
        this.props.requestUser(id);

        

        resolve();
    });    

    public render() {
        console.log('logger', this.props.loginuser, this.props.userIsLoading, this.props.isLogged);

    return (
        <>
            <h1>Login</h1>
            <div className="login-body">
                <h4> Hi! Please Enter your username </h4>
                <form className="form-group" onSubmit={this.handleSubmit}>
                <input className="form-control" placeholder="UserID" required  />
                <br/>
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
}

export default connect(
    (state: ApplicationState) => state.user,
    UserStore.actionCreators
)(Login);