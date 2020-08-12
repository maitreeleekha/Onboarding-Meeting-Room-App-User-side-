import * as React from 'react';
import { connect } from 'react-redux';



const NotFound = (props)=>{
   

    

        return (

            <>
                < h1 > Sorry! We couldn't find what you were looking for.</ h1 >
                <br />
                <br />
                <button className="btn btn-primary btn-lg" onClick={(event) => {
                    event.preventDefault();
                    window.open('./', '_self');

                }}>Home</button>
            </>


        );
    }



export default connect()(NotFound);