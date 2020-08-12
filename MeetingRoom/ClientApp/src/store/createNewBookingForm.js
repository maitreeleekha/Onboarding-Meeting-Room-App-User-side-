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
            return __assign(__assign({}, state), { dateFormState: true });
        default:
            return state;
    }
};
//# sourceMappingURL=createNewBookingForm.js.map