"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unloadedUser = {
    userId: '',
    userName: '',
    emailId: ''
};
var unloadedState = {
    loginuser: [], userIsLoading: false, isLogged: false
};
exports.actionCreators = {
    requestUser: function (userid) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appstate = getState();
        if (appstate && appstate.user) {
            fetch("api/user?userid=" + userid, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_USER', loginuser: data });
                console.log("[response message]", data);
            });
            dispatch({ type: 'REQUEST_USER' });
        }
    }; }
};
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_USER':
            return {
                loginuser: state.loginuser,
                userIsLoading: true,
                isLogged: true
            };
        case 'RECEIVE_USER':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                loginuser: action.loginuser,
                userIsLoading: false,
                isLogged: false
            };
        default:
            return unloadedState;
    }
};
//function requestUserFunction(userid: string): Promise<any> {
//    return dispatch => {
//        // const appState = getState();
//        console.log("[request message]", userid);
//        var op = fetch(`api/user?userid=${userid}`, {
//            headers: {
//                'Content-Type': 'application/json',
//                'Accept': 'application/json'
//            }
//        }).then(response => { console.log("response object", response); return response.json() as Promise<User[]>; })
//            .then(data => {
//                console.log("[response message]", data)
//                dispatch({ type: 'RECEIVE_USER', loginuser: data });
//            }).catch(function (error) {
//                console.log(error);
//            })
//        dispatch({ type: 'REQUEST_USER' });
//        return op;
//    }
//}
//# sourceMappingURL=User.js.map