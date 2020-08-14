"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var unloadedUser = {
    userId: '',
    userName: '',
    emailId: '',
    password: ''
};
var unloadedState = {
    allUsers: [], userIsLoading: false, isLogged: false, numUsers: -1
};
exports.actionCreators = {
    requestUser: function (userid) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appstate = getState();
        fetch("api/user?userid=" + userid, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_USER', allUsers: data });
            console.log("[response message]", data);
        });
        dispatch({ type: 'REQUEST_USER' });
    }; },
    setLoggedIn: function () { return function (dispatch, getState) {
        dispatch({ type: 'REQUEST_USER' });
        dispatch({ type: 'SET_USER_LOGIN_STATE' });
        // dispatch({ type: 'REQUEST_USER' })
    }; },
    requestUser_Login: function (userloginid, passwordentered) { return function (dispatch, getState) {
        fetch("api/user?userid=" + userloginid, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) { return response.json(); })
            .then(function (data) {
            console.log("[response message]", data.length);
            if (data.length == 0) {
                alert("Incorrect UserId! Please signup if you haven't yet!");
                window.open('./login', '_self');
            }
            else if (passwordentered != data[0].password) {
                alert("Incorrect password!");
            }
            else {
                sessionStorage.setItem("loggedin", "true");
                sessionStorage.setItem("userid", userloginid);
                sessionStorage.setItem("username", data[0].userName);
                window.open("./user:" + userloginid, '_self');
            }
        });
    }; },
    postUser: function (user) { return function (dispatch, getState) {
        fetch("api/user", {
            method: 'POST',
            body: JSON.stringify(user),
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
            if (result == "") {
                alert("looks like you were already signed up!");
            }
            else {
                alert("Signed in successfully. Please login to continue.");
                window.open('./login', '_self');
            }
        })
            .catch(function (error) {
            alert("Error occured! Please try again.");
            //window.open("./signup", "_self")
        });
    }; }
};
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_USER':
            return __assign(__assign({}, state), { allUsers: state.allUsers, userIsLoading: true, isLogged: state.isLogged, numUsers: state.numUsers });
        case 'RECEIVE_USER':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return __assign(__assign({}, state), { allUsers: action.allUsers, userIsLoading: false, isLogged: state.isLogged, numUsers: action.allUsers.length });
        case 'SET_USER_LOGIN_STATE':
            return __assign(__assign({}, state), { allUsers: state.allUsers, userIsLoading: false, isLogged: true, numUsers: state.numUsers });
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