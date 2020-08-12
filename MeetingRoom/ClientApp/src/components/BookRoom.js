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
var RoomsBookingsStore = require("../store/Rooms");
require("./static/Room.css");
var AdditionalReqForm = function (props) {
    var layoutOptions = [];
    if (props.type == "A") {
        layoutOptions = ["Rounds", "U-shape-cabinet", "Cabinet", "Auditorium"];
    }
    else if (props.type == "B") {
        layoutOptions = ["Chairs-in-circle", "Banked-cabinet", "Cabinet"];
    }
    else {
        layoutOptions = ["Auditorium", "Classroom", "U-shape-cabinet"];
    }
    console.log(layoutOptions);
    var handleSubmit = function (event) {
        event.preventDefault();
        var s = "";
        for (var i = 0; i < event.target.length; i++) {
            if (event.target[i].checked) {
                s = s + event.target[i].value;
                if (i != event.target.length - 1) {
                    s = s + ',';
                }
            }
        }
        var final_layout = s.split(',')[0];
        var final_req = s.split(',').splice(1).join('-');
        // booking id:
        var bookingid = props.date.split('-').join('') + props.time.split('-').join('').split(':').join('');
        //create post request here!
        props.history.push("/bookingconfirmed/user" + props.userid + "/" + bookingid + "/" + props.room + "/" + props.date + "/" + props.time + "/" + final_layout + "/" + final_req, '_self');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("br", null),
        React.createElement("form", { className: "form-group additionalform", onSubmit: handleSubmit },
            "Please specify the layout for the room, and we will get it all set for you! You can select one from the following options:",
            React.createElement("br", null),
            React.createElement("h3", null, "Layout options:"),
            React.createElement("br", null),
            layoutOptions.map(function (item) {
                return React.createElement("div", { key: item },
                    React.createElement("input", { type: "radio", id: item, name: "layoutoption", value: item, required: true }),
                    React.createElement("label", null,
                        " ",
                        item));
            }),
            React.createElement("br", null),
            "To make your meetings super smooth, we provide you with the options of availing additional equipment.",
            React.createElement("br", null),
            React.createElement("h3", null, "Equipment options:"),
            React.createElement("br", null),
            React.createElement("input", { type: "checkbox", name: "eqpoptions", value: "printer" }),
            React.createElement("label", null, "Printer"),
            React.createElement("br", null),
            React.createElement("input", { type: "checkbox", name: "eqpoptions", value: "HDMI" }),
            React.createElement("label", null, "HDMI Converter"),
            React.createElement("br", null),
            React.createElement("input", { type: "checkbox", name: "eqpoptions", value: "TV" }),
            React.createElement("label", null, "TV"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { type: "submit", className: "btn btn-primary btn-lg" }, " Confirm Booking")),
        React.createElement("br", null),
        React.createElement("br", null)));
};
var BookRoom = /** @class */ (function (_super) {
    __extends(BookRoom, _super);
    function BookRoom(props) {
        var _this = _super.call(this, props) || this;
        _this.dateParam = '';
        _this.roomParam = '';
        _this.timeParam = '';
        _this.typeParam = '';
        _this.userParam = '';
        _this.dateParam = props.match.params.date;
        _this.roomParam = props.match.params.room;
        _this.timeParam = props.match.params.time;
        _this.typeParam = props.match.params.type;
        _this.userParam = props.match.params.user;
        return _this;
    }
    BookRoom.prototype.componentDidMount = function () {
        var f2 = this.ensureRoomsFetched();
        var f1 = this.ensureBookingsFetched();
    };
    BookRoom.prototype.ensureBookingsFetched = function () {
        this.props.requestBookings("");
    };
    BookRoom.prototype.ensureRoomsFetched = function () {
        this.props.requestRooms(this.roomParam);
    };
    BookRoom.prototype.checkTimeOverlap = function (dbTime, qsTime) {
        var fromTime = dbTime.split('-')[0];
        var toTime = dbTime.split('-')[1];
        var tempfrom = qsTime.split('-')[0];
        var tempto = qsTime.split('-')[1];
        if ((fromTime >= tempfrom && fromTime < tempto) || (toTime > tempfrom && toTime <= tempto) || (fromTime < tempfrom && toTime > tempto)) {
            return true;
        }
        return false;
    };
    BookRoom.prototype.checkAlreadyBooked = function (booking_item) {
        if (booking_item.roomId == this.roomParam && booking_item.meetingDate == this.dateParam && this.checkTimeOverlap(booking_item.meetingTime.toString(), this.timeParam)) {
            return true;
        }
        return false;
    };
    BookRoom.prototype.checkDateFormat = function () {
        var m = this.dateParam.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
        if (!m) {
            window.open('/notfound', '_self');
            return false;
        }
        return true;
    };
    BookRoom.prototype.checkTimeFormat = function () {
        if (this.timeParam.split('-').length != 2) {
            return false;
        }
        var from = this.timeParam.split('-')[0];
        var to = this.timeParam.split('-')[1];
        var from_match = from.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
        var to_match = to.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/);
        if (from_match && to_match && from_match < to_match) {
            return true;
        }
        return false;
    };
    BookRoom.prototype.render = function () {
        var _this = this;
        var today = new Date().toISOString().slice(0, 10);
        // VALIDATE INCOMING PARAMS
        if (today > this.dateParam) {
            // cannot search for past dates. route to error page
            window.open('/index/user:52321', '_self');
            //window.open('/index/user:52321', '_self');
        }
        if (this.checkDateFormat() &&
            this.checkTimeFormat() &&
            this.props.numRooms == 1 &&
            this.props.rooms.length == 1 &&
            this.props.rooms[0]["roomType"].localeCompare(this.typeParam) == 0 &&
            this.userParam.slice(1) == sessionStorage.getItem("userid") &&
            this.props.bookings.filter(function (item) { return _this.checkAlreadyBooked(item); }).length == 0 &&
            this.props.numBookings != -1) {
            return (React.createElement(React.Fragment, null,
                React.createElement("h1", null, " Great News! "),
                React.createElement("h3", null,
                    " ",
                    this.roomParam,
                    " is available on ",
                    this.dateParam,
                    ", ",
                    this.timeParam),
                React.createElement(AdditionalReqForm, { type: this.typeParam, room: this.roomParam, date: this.dateParam, time: this.timeParam, history: this.props.history, userid: this.userParam })));
        }
        else if (this.props.numBookings == -1) {
            return (React.createElement(React.Fragment, null, "Loading..."));
        }
        else {
            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("loggedin");
            window.open('./notfound', '_self');
            return (React.createElement(React.Fragment, null));
        }
    };
    return BookRoom;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.rooms; }, // Selects which state properties are merged into the component's props
RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(BookRoom);
//# sourceMappingURL=BookRoom.js.map