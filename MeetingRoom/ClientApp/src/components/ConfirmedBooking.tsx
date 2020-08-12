import * as React from 'react';
import { connect } from 'react-redux';



class ConfirmedBooking extends React.PureComponent {
    dateParam = '';
    roomParam = '';
    timeParam = '';
    typeParam = '';
    bookingid = '';
    finallayout = '';
    finalreq = '';


    constructor(props) {
        super(props);
        
        this.dateParam = props.match.params.date;
        this.roomParam = props.match.params.room;
        this.timeParam = props.match.params.time;
        this.typeParam = props.match.params.type;
        this.finallayout = props.match.params.layout;
        this.finalreq = props.match.params.req;
    }

    public render() {
        console.log(this.dateParam);
        let today = new Date().toISOString().slice(0, 10);

        // validate params

        if (today > this.dateParam) {
            // cannot search for past dates. route to error page
            window.open('/index', '_self');
        }
        return (

            <>
                < h1 > Thank you for booking with us! </ h1 >
                <h2> Following are the details for your booking:</h2>
                <br/>
                <div className="container">
                    <h4>Date: {this.dateParam} </h4>  
                    <h4>Room: {this.roomParam} </h4>
                <h4>Time: {this.timeParam} </h4>  
            <h4>Layout: { this.finallayout } </h4 >   
            <h4>Additional Requirements: { this.finalreq }</h4 > 
                </div>

            </>


        );
    }

}

export default connect()(ConfirmedBooking);