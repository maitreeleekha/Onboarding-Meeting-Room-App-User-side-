import { Action, Reducer } from 'redux';

//STATE

export interface ShowDateFormState {
    dateFormState: boolean;
}


// ACTIONS

export interface ShowDateFormAction { type: 'SHOW_DATE_FORM' }

//ACTION CREATOR

export const actionCreators = {
    showDateForm: () => ({ type: 'SHOW_DATE_FORM' } as ShowDateFormAction)
};

//REDUCER

export const reducer: Reducer<ShowDateFormState> = (state: any | undefined, incomingAction: Action)=> {
    if (state === undefined) {
        return {            
            dateFormState: false
        };
    }

    const action = incomingAction as ShowDateFormAction;
    switch (action.type) {
        case 'SHOW_DATE_FORM':
            return {
                ...state,
                dateFormState: true
            };
        default:
            return state;
    }
};

