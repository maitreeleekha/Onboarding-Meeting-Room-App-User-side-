"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ACTION CREATOR
exports.actionCreators = {
    showDateForm: function () { return ({ type: 'SHOW_DATE_FORM' }); }
};
//REDUCER
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return {
            dateFormState: false
        };
    }
    var action = incomingAction;
    switch (action.type) {
        case 'SHOW_DATE_FORM':
            return { dateFormState: true };
        default:
            return state;
    }
};
//# sourceMappingURL=createNewBookingForm.js.map