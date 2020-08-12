import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// STATE
export interface UserState {
    userIsLoading: boolean;
    allUsers: User[];
    isLogged: boolean;
    numUsers: number;
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
    allUsers: User[];
}

interface SetLoggedInState {
    type: 'SET_USER_LOGIN_STATE';
}

type KnownAction = ReceiveUserAction | RequestUserAction | SetLoggedInState;

const unloadedUser: User = {
    userId: '',
    userName: '',
    emailId: ''

}
const unloadedState: UserState = {
    allUsers: [], userIsLoading: false, isLogged: false, numUsers: -1
};


export const actionCreators = {
    requestUser:  (userid: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appstate = getState();

            fetch(`api/user?userid=${userid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json() as Promise<User[]>)
                .then(data => {

                    dispatch({ type: 'RECEIVE_USER', allUsers: data });
                    console.log("[response message]", data)

                });
            dispatch({ type: 'REQUEST_USER' });  
        
    },

    setLoggedIn: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'REQUEST_USER' })
        dispatch({ type: 'SET_USER_LOGIN_STATE' });
       // dispatch({ type: 'REQUEST_USER' })
    }
}



export const reducer: Reducer<UserState> = (state: any, incomingAction: Action) => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_USER':
            return {
                ...state,
                allUsers: state.allUsers,
                userIsLoading: true,
                isLogged: state.isLogged,
                numUsers: state.numUsers
            };
        case 'RECEIVE_USER':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                ...state,
                allUsers: action.allUsers,
                userIsLoading: false,
                isLogged: state.isLogged,
                numUsers: action.allUsers.length
            };

        case 'SET_USER_LOGIN_STATE':
            return {
                ...state,
                allUsers: state.allUsers,
                userIsLoading: false,
                isLogged: true,
                numUsers: state.numUsers
            }
    
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