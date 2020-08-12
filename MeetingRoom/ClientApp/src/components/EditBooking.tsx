import * as React from 'react';
import { connect } from 'react-redux';



class EditBooking extends React.PureComponent {


    //validate incoming URL.
    bookingId = '';


    constructor(props) {
        super(props);
        this.bookingId = props.match.params.bookingid;
    }

    private handleSubmit = (event) => {
        event.preventDefault();
        // initiate a post request



        alert("Your request has been submitted successfully. We shall reach out to you with an update shortly.");
        // window.open(`./`, '_self');

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

export default connect()(EditBooking);