"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ACTION CREATORS
exports.actionCreators = {
    requestBookings: function () { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        console.log("requestBookings Called!");
        fetch("api/booking", {
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
    }; }
};
var unloadedState = { bookings: [], bisLoading: false };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
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
//# sourceMappingURL=Bookings.js.map