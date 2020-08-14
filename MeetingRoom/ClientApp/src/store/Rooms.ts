import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
// import store from '../store';



// STATE
export interface RoomsBookingsState {
    roomisLoading: boolean;
    bookingisLoading: boolean;
    rooms: Room[];
    bookings: Booking[];
    numRooms: number;
    numBookings: number;
}


export interface Room {
    roomId: string;
    RoomType: string;
    Location: string;
    Capacity: number;
    Description: string;
    Status: string;
}

enum roomStatus {
    'N' = 1, //normal
    'U' = 0 //under maintenance
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

interface RequestRoomsAction {
    type: 'REQUEST_ROOMS';
}

interface ReceiveRoomsAction {
    type: 'RECEIVE_ROOMS';
    rooms: Room[];
}
type KnownAction = ReceiveBookingAction | RequestBookingAction | RequestRoomsAction | ReceiveRoomsAction;



//ACTION CREATORS

export const actionCreators = {
    requestRooms: (roomId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        // call only when current does not exist.

        if (appState && appState.rooms && appState.rooms.bookings.length==0) {

            console.log("rooom ", roomId);
            fetch(`api/room?roomId=${roomId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json() as Promise<Room[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ROOMS', rooms: data });
                    console.log("[request message]", data)
                });
        }
        dispatch({ type: 'REQUEST_ROOMS' });
    },

    requestBookings: (empId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        if (empId != "") {
            empId = empId.slice(1);
        }

        console.log("requestBookings Called!", empId);
        fetch(`api/booking?empId=${empId}`, {
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

    //checkRoomExists: (roomId: string): boolean => {
    //    console.log("[checking room existence]", roomId);
    //    const all_rooms = store.getState().rooms.rooms;
    //    if (all_rooms.filter((item: Room) => item.roomId == roomId).length > 0) {
    //        return true;
    //    }
    //    return false;
    //}


    postBooking: (booking: object, successURL: string): AppThunkAction<KnownAction> => (dispatch, getState) => {

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

    },

    putActionRequired: (bookingid: string, actionrqd: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        console.log("Putting action required!");

        fetch(`api/booking?bookingid=${bookingid}&actionRequired=${actionrqd}`, {
            method: 'PUT',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {

                console.log(result)
                if (result == bookingid) {
                    alert("Your request has been submitted successfully. We shall reach out to you with an update shortly.");
                    window.open(`./index`, '_self');
                }
                else {
                    alert("Sorry we could not process your request! please try again later!");
                }
            })
            .catch(error => console.log('error', error));

    },

    deleteBookingAction: (bookingid: string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        fetch(`api/booking?bookingid=${bookingid}`, {
            method: 'DELETE',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {

                console.log(result)
                if (result == "1") {
                    alert("Booking has been cancelled");
                    window.open(`./user:${sessionStorage.getItem("userid")}`, '_self');
                }
                else {
                    alert("Sorry we could not process your request! please try again later!");
                }
            })
            .catch(error => console.log('error', error));

    }

};


const unloadedState: RoomsBookingsState = { rooms: [], roomisLoading: false, bookingisLoading: false, bookings: [], numRooms: -1, numBookings: -1 };

export const reducer: Reducer<RoomsBookingsState> = (state: RoomsBookingsState | undefined, incomingAction: Action): RoomsBookingsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ROOMS':
            return {
                rooms: state.rooms,                
                roomisLoading: true,
                bookingisLoading: state.bookingisLoading,
                bookings: state.bookings,
                numRooms: state.numRooms,
                numBookings: state.numBookings
            };
        case 'RECEIVE_ROOMS':

            return {
                rooms: action.rooms,
                roomisLoading: false,
                bookingisLoading: state.bookingisLoading,
                bookings: state.bookings,
                numRooms: action.rooms.length,
                numBookings: state.numBookings
            };

        case 'REQUEST_BOOKINGS':
            return {
                rooms: state.rooms,
                roomisLoading: state.roomisLoading,
                bookings: state.bookings,
                bookingisLoading: true,
                numRooms: state.numRooms,
                numBookings: state.numBookings
            };
        case 'RECEIVE_BOOKINGS':

            return {
                roomisLoading: state.roomisLoading,
                rooms: state.rooms,
                bookings: action.bookings,
                bookingisLoading: false,
                numRooms: state.numRooms,
                numBookings: action.bookings.length
            };





        default:
            return unloadedState;
            }
};
