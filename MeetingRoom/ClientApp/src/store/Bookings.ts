﻿import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';



// STATE
export interface BookingsState {
    bisLoading: boolean;
    bookings: Booking[];
}


export interface Booking {
    bookingId: string;
    bookingDate: string;
    meetingDate: string;
    meetingTime: number;
    employeeId: string;
    roomId: string;
    additionalEquipments: string,
    actionRequired: string; 
}


// ACTION

interface RequestBookingAction {
    type: 'REQUEST_BOOKINGS';
}

interface ReceiveBookingAction {
    type: 'RECEIVE_BOOKINGS';
    bookings: Booking[];
}

interface PostBookingAction {
    type: 'POST_BOOKINGS';
}

type KnownAction = ReceiveBookingAction | RequestBookingAction | PostBookingAction;


//ACTION CREATORS

export const actionCreators = {
    requestBookings: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();

        console.log("requestBookings Called!");
        fetch(`api/booking`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json() as Promise<Booking[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_BOOKINGS', bookings: data });
                console.log("[request log data]", data);
            });
        
        dispatch({ type: 'REQUEST_BOOKINGS' });
    },

    postBooking: (booking :object, successURL: string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        console.log("Postbooking Called!");

        fetch("api/booking", {
            method: 'POST',
            body: JSON.stringify(booking),
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {

                console.log(response.status);
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                else {
                    return response.text()
                }
            })
            .then(result => {
                console.log(result);
                window.open(successURL, '_self');
            })
            .catch(error => { alert("Error occured! Please try again."); window.open("./index") });

    }
};


const unloadedState: BookingsState = { bookings: [], bisLoading: false };

export const reducer: Reducer<BookingsState> = (state: BookingsState | undefined, incomingAction: Action): BookingsState=> {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_BOOKINGS':
            return {
                bookings: state.bookings,
                bisLoading: true
            };
        case 'RECEIVE_BOOKINGS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                bookings: action.bookings,
                bisLoading: false
            };
        default:
            return unloadedState;
    }
};
