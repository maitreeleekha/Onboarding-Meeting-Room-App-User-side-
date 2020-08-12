import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// STATE
export interface UserState {
    userIsLoading: boolean;
    loginuser: User[];
    isLogged: boolean;
}

export interface User {
    userId: string;
    userName: string;
    emailId: string;
}

interface RequestUserAction {
    type: 'REQUEST_USER';

    //data: string;
}

interface ReceiveUserAction {
    type: 'RECEIVE_USER';
    loginuser: User[];
}

type KnownAction = ReceiveUserAction | RequestUserAction;

const unloadedUser: User = {
    userId: '',
    userName: '',
    emailId: ''

}
const unloadedState: UserState = {
    loginuser: [], userIsLoading: false, isLogged: false
};


export const actionCreators = {
    requestUser:  (userid: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appstate = getState();
        if (appstate && appstate.user) {
            fetch(`api/user?userid=${userid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json() as Promise<User[]>)
                .then(data => {

                    dispatch({ type: 'RECEIVE_USER', loginuser: data });
                    console.log("[response message]", data)

                });
            dispatch({ type: 'REQUEST_USER' });  
        }
    }
}



export const reducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action): UserState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
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