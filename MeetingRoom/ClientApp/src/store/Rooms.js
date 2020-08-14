"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roomStatus;
(function (roomStatus) {
    roomStatus[roomStatus["N"] = 1] = "N";
    roomStatus[roomStatus["U"] = 0] = "U"; //under maintenance
})(roomStatus || (roomStatus = {}));
//ACTION CREATORS
exports.actionCreators = {
    requestRooms: function (roomId) { return function (dispatch, getState) {
        var appState = getState();
        // call only when current does not exist.
        if (appState && appState.rooms && appState.rooms.bookings.length == 0) {
            console.log("rooom ", roomId);
            fetch("api/room?roomId=" + roomId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_ROOMS', rooms: data });
                console.log("[request message]", data);
            });
        }
        dispatch({ type: 'REQUEST_ROOMS' });
    }; },
    requestBookings: function (empId) { return function (dispatch, getState) {
        var appState = getState();
        if (empId != "") {
            empId = empId.slice(1);
        }
        console.log("requestBookings Called!", empId);
        fetch("api/booking?empId=" + empId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_BOOKINGS', bookings: data });
            console.log("[request log data]", data);
        });
        dispatch({ type: 'REQUEST_BOOKINGS' });
    }; },
    //checkRoomExists: (roomId: string): boolean => {
    //    console.log("[checking room existence]", roomId);
    //    const all_rooms = store.getState().rooms.rooms;
    //    if (all_rooms.filter((item: Room) => item.roomId == roomId).length > 0) {
    //        return true;
    //    }
    //    return false;
    //}
    postBooking: function (booking, successURL) { return function (dispatch, getState) {
        console.log("Postbooking Called!");
        fetch("api/booking", {
            method: 'POST',
            body: JSON.stringify(booking),
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
            console.log(response.status);
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            else {
                return response.text();
            }
        })
            .then(function (result) {
            console.log(result);
            window.open(successURL, '_self');
        })
            .catch(function (error) { alert("Error occured! Please try again."); window.open("./index"); });
    }; },
    putActionRequired: function (bookingid, actionrqd) { return function (dispatch, getState) {
        console.log("Putting action required!");
        fetch("api/booking?bookingid=" + bookingid + "&actionRequired=" + actionrqd, {
            method: 'PUT',
            redirect: 'follow'
        })
            .then(function (response) { return response.text(); })
            .then(function (result) {
            console.log(result);
            if (result == bookingid) {
                alert("Your request has been submitted successfully. We shall reach out to you with an update shortly.");
                window.open("./index", '_self');
            }
            else {
                alert("Sorry we could not process your request! please try again later!");
            }
        })
            .catch(function (error) { return console.log('error', error); });
    }; },
    deleteBookingAction: function (bookingid) { return function (dispatch, getState) {
        fetch("api/booking?bookingid=" + bookingid, {
            method: 'DELETE',
            redirect: 'follow'
        })
            .then(function (response) { return response.text(); })
            .then(function (result) {
            console.log(result);
            if (result == "1") {
                alert("Booking has been cancelled");
                window.open("./user:" + sessionStorage.getItem("userid"), '_self');
            }
            else {
                alert("Sorry we could not process your request! please try again later!");
            }
        })
            .catch(function (error) { return console.log('error', error); });
    }; }
};
var unloadedState = { rooms: [], roomisLoading: false, bookingisLoading: false, bookings: [], numRooms: -1, numBookings: -1 };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
//# sourceMappingURL=Rooms.js.map