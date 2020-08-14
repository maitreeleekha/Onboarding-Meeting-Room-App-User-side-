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
var React = require("react");
var react_redux_1 = require("react-redux");
var DateFormState = require("../store/createNewBookingForm");
var UserStore = require("../store/User");
var redux_1 = require("redux");
var DateInputForm = function (props) {
    var _a = React.useState(''), dateInput = _a[0], setDateInput = _a[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        console.log(dateInput);
        props.history.push("/meetingrooms/user" + props.userid + "/" + dateInput, '_self');
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
    function MeetingHome(props) {
        var _this = _super.call(this, props) || this;
        _this.userParam = false;
        _this.userParam = props.match.params.user ? true : false;
        _this.userid = props.match.params.user;
        return _this;
    }
    MeetingHome.prototype.render = function () {
        var _this = this;
        console.log(this.userParam, sessionStorage.getItem("userid"));
        if (this.userParam) {
            if (this.userid.slice(1) == sessionStorage.getItem("userid")) {
                return (React.createElement(React.Fragment, null,
                    React.createElement("h1", null, "Welcome to the Meeting Room App!"),
                    React.createElement("div", null, "We help you book and manage your meetings effortlessly. To get started, you may choose to book a new meeting room, or can checkout your previous bookings to manage them."),
                    React.createElement("br", null),
                    React.createElement("button", { className: "btn btn-primary btn-lg", onClick: function () { _this.props.showDateForm(); } }, "Create a new Booking"),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement(DateInputForm, { showDateForm: this.props.dateFormState, history: this.props.history, userid: this.userid }),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("button", { className: "btn btn-info btn-lg", onClick: function (event) {
                            event.preventDefault();
                            _this.props.history.push("/viewbookings/user" + _this.userid + "/", '_self');
                        } }, "View previous Booking")));
            }
            else {
                window.open("./login", "_self");
                return (React.createElement(React.Fragment, null));
            }
        }
        else {
            if (sessionStorage.getItem("userid")) {
                this.props.history.push("./index/user" + sessionStorage.getItem("userid"));
                return (React.createElement(React.Fragment, null));
            }
            return (React.createElement(React.Fragment, null,
                React.createElement("h1", null, "Welcome to the Meeting Room App!"),
                React.createElement("div", null, "We help you book and manage your meetings effortlessly. To get started, you may choose to book a new meeting room, or can checkout your previous bookings to manage them."),
                React.createElement("br", null),
                React.createElement("button", { className: "btn btn-lg btn-primary", onClick: function (event) {
                        event.preventDefault();
                        window.open('./login', '_self');
                    } }, " Please Login to continue "),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("button", { className: "btn btn-lg btn-light", onClick: function (event) {
                        event.preventDefault();
                        window.open('./signup', '_self');
                    } }, " New User? Sign Up")));
        }
    };
    return MeetingHome;
}(React.PureComponent));
function mapDispatchToProps(dispatch) {
    return {
        dateFormActions: redux_1.bindActionCreators(DateFormState.actionCreators, dispatch),
        userActions: redux_1.bindActionCreators(UserStore.actionCreators, dispatch)
    };
}
function mapDispatchToProps2(dispatch) {
    return redux_1.bindActionCreators(__assign(__assign({}, DateFormState.actionCreators), UserStore.actionCreators), dispatch);
}
exports.default = react_redux_1.connect(function (state) { return (__assign(__assign({}, state.user), state.dateFormState)); }, mapDispatchToProps2)(MeetingHome);
//# sourceMappingURL=MeetingHome.js.map