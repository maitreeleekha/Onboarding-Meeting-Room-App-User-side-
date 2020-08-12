import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import MeetingHome from './components/MeetingHome';
import Rooms from './components/Rooms';
import BookRoom from './components/BookRoom';
import ConfirmedBooking from './components/ConfirmedBooking';
import ViewBookings from './components/viewBookings';
import NotFound from './components/NotFound';
import EditBooking from './components/EditBooking';
import Login from './components/Login';
import Signup from './components/signup';
import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={MeetingHome} />
        <Route path='/user:user' component={MeetingHome} />
        <Route path='/meetingrooms/user:user/:date/:room?' component={Rooms} />
        <Route path='/bookroom/user:user/:date/:time/:room/:type/confirm' component={BookRoom} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/viewbookings/user:user/' component={ViewBookings} />
        <Route path='/bookingconfirmed/user:user/:bookingid/:room/:date/:time/:layout/:req?' component={ConfirmedBooking} />
        <Route path='/notfound/' component={NotFound} />
        <Route path='/editbooking/:bookingid' component={EditBooking} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
    </Layout>
);
