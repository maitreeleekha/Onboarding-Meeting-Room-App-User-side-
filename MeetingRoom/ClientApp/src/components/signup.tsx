import * as React from 'react';
import { connect } from 'react-redux';
import './static/Room.css';



class Signup extends React.PureComponent {


    //validate incoming URL.

    constructor(props) {
        super(props);
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        //post request here.

        console.log("submit details");

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
                        <button className="btn-lg btn btn-primary" type="submit">Submit Details</button>

                    </form>
                    
                </div>
            </>

        );
    }
}

export default connect()(Signup);