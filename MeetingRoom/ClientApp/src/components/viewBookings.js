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
var react_image_1 = require("react-image");
require("./static/Room.css");
var RoomsBookingsStore = require("../store/Rooms");
var BookingItem = function (props) {
    // rebook this room for a different date: all
    // cancel and edit: only for those bookings where the meeting is yet to happen (current date < meeting date.)
    var _a = React.useState(''), dateInput = _a[0], setDateInput = _a[1];
    var _b = React.useState(false), showRebookForm = _b[0], setShowReebookForm = _b[1];
    var meetingDate = props.meetingDate;
    var currentDate = new Date().toISOString().slice(0, 10);
    var show = currentDate < meetingDate;
    var handleBookSubmit = function (event) {
        event.preventDefault();
        props.history.push("/meetingrooms/user:53231/" + dateInput + "/" + props.roomId + "/", '_self');
    };
    return (React.createElement("div", { className: "roomDiv", style: { backgroundColor: show ? '#D9E3F0' : 'light-grey' } },
        React.createElement("div", { className: "roomInfoDiv" },
            React.createElement(react_image_1.Img, { src: "https://i0.wp.com/worldwellnessgroup.org.au/wp-content/uploads/2020/07/placeholder.png?w=1200&ssl=1", className: "img-responsive roomImage" }),
            React.createElement("h3", { className: "roomName" },
                " ",
                props.roomId,
                " "),
            React.createElement("div", { className: "roomDesc" },
                "Booked on: ",
                props.bookingDate,
                ". Meeting Date and Time: ",
                props.meetingDate,
                ", ",
                props.meetingTime,
                " ")),
        React.createElement("button", { className: "btn btn-sm btn-danger booking-button", style: { display: show ? 'block' : 'none' } }, " Cancel this booking "),
        React.createElement("button", { className: "btn btn-sm btn-warning booking-button", style: { display: show ? 'block' : 'none' }, onClick: function (event) {
                event.preventDefault();
                var editDecision = window.confirm("Are you sure you want to edit this booking?");
                if (editDecision) {
                    props.history.push("/editbooking/" + props.bookingId, '_self');
                }
            } }, " Edit this booking "),
        React.createElement("button", { className: "btn btn-sm btn-primary booking-button", onClick: function (event) {
                event.preventDefault();
                setShowReebookForm(true);
            } }, " Book Again! "),
        React.createElement("form", { className: "form-group rebookform", style: { display: showRebookForm ? 'block' : 'none' }, onSubmit: handleBookSubmit },
            React.createElement("label", null, " What date are you looking for?"),
            React.createElement("br", null),
            React.createElement("input", { type: "date", id: "date-input", className: "form-control-sm", value: dateInput, onChange: function (event) { setDateInput(event.target.value); }, required: true }),
            React.createElement("button", { className: "btn btn-light btn-sm" }, "Check Availability"))));
};
var ViewBookings = /** @class */ (function (_super) {
    __extends(ViewBookings, _super);
    function ViewBookings(props) {
        var _this = _super.call(this, props) || this;
        _this.userParam = '';
        _this.userParam = props.match.params.user;
        return _this;
    }
    ViewBookings.prototype.componentDidMount = function () {
        this.props.requestBookings(this.userParam);
    };
    ViewBookings.prototype.render = function () {
        var _this = this;
        console.log(this.userParam.slice(1), this.props.bookings.length);
        if (this.userParam.slice(1) != sessionStorage.getItem("userid")) {
            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("loggedin");
            window.open('./notfound', '_self');
            return (React.createElement(React.Fragment, null));
        }
        return (React.createElement(React.Fragment, null, this.props.bookings.map(function (booking) { return React.createElement(BookingItem, __assign({ key: booking.bookingId }, booking, { history: _this.props.history })); })));
    };
    return ViewBookings;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.rooms; }, // Selects which state properties are merged into the component's props
RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(ViewBookings);
//# sourceMappingURL=viewBookings.js.map