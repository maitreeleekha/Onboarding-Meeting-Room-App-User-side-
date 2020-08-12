"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var DateFormState = require("../store/createNewBookingForm");
var DateInputForm = function (props) {
    var _a = React.useState(''), dateInput = _a[0], setDateInput = _a[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        console.log(dateInput);
        window.open("/meetingrooms/user:53231/" + dateInput, '_self');
    };
    return (
    // add logic to check that the date entered is of future only
    // 
    // 
    React.createElement("form", { className: "form-group", onSubmit: handleSubmit, style: { display: props.showDateForm === true
                ? 'block' : 'none' } },
        React.createElement("label", null, " What date are you looking for?"),
        React.createElement("br", null),
        React.createElement("input", { type: "date", id: "date-input", className: "form-control-sm", value: dateInput, onChange: function (event) { setDateInput(event.target.value); }, required: true }),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("button", { type: "submit", className: "btn btn-light" }, "Search rooms ")));
};
var MeetingHome = /** @class */ (function (_super) {
    __extends(MeetingHome, _super);
    function MeetingHome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeetingHome.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Welcome to the Meeting Room App!"),
            React.createElement("div", null, "We help you book and manage your meetings effortlessly. To get started, you may choose to book a new meeting room, or can checkout your previous bookings to manage them."),
            React.createElement("br", null),
            React.createElement("button", { className: "btn btn-primary btn-lg", onClick: function () { _this.props.showDateForm(); } }, "Create a new Booking"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(DateInputForm, { showDateForm: this.props.dateFormState }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { className: "btn btn-info btn-lg", onClick: function (event) {
                    event.preventDefault();
                    window.open("/viewbookings/user:53231/", '_self');
                } }, "View previous Booking")));
    };
    return MeetingHome;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.dateFormState; }, DateFormState.actionCreators)(MeetingHome);
//# sourceMappingURL=MeetingHome.js.map