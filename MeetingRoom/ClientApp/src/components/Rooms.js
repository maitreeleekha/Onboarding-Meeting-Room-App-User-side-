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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_image_1 = require("react-image");
var react_redux_1 = require("react-redux");
var RoomsBookingsStore = require("../store/Rooms");
require("./static/Room.css");
var test_rooms = [
    { roomId: 'ND-B1-A4-09', RoomType: 'A', Location: 'Noida', Capacity: 8, Description: '', Status: 'N' },
    { roomId: 'ND-B1-A3-02', RoomType: 'B', Location: 'Noida', Capacity: 15, Description: '', Status: 'N' },
    { roomId: 'HYD-B2-B4-03', RoomType: 'A', Location: 'Hyderabad', Capacity: 6, Description: '', Status: 'U' },
    { roomId: 'HYD-B1-A5-16', RoomType: 'C', Location: 'Hyderabad', Capacity: 9, Description: '', Status: 'N' },
    { roomId: 'BLR-B1-A3-05', RoomType: 'A', Location: 'Bangalore', Capacity: 7, Description: '', Status: 'N' },
    { roomId: 'BLR-B2-A4-09', RoomType: 'B', Location: 'Bangalore', Capacity: 8, Description: '', Status: 'U' },
];
var test_bookings = [
    { bookingId: 'XHSDJ17H', bookingDate: '2020-08-01', meetingDate: '2020-08-17', meetingTime: '11:00-13:30', empId: '785445', roomId: 'ND-B1-A4-09', AdditionalEquipments: [], ActionRequired: '' },
    { bookingId: 'XIUDU27N', bookingDate: '2020-08-03', meetingDate: '2020-09-08', meetingTime: '14:00-17:30', empId: '283973', roomId: 'HYD-B1-A5-16', AdditionalEquipments: ['Printer'], ActionRequired: '' }
];
var room_desc = {
    A: 'Equipments provided: Printer, TV, Projector, HDMI Converter, Mic. Layouts supported: Rounds, U-shape-cabinet, cabinet, auditorium.',
    B: 'Equipments provided: Projector, TV, HDMI Converter. Layouts supported: Chairs in circle, banked cabinet, cabinet.',
    C: 'Equipments provided: Mic, TV. Layouts supported: Auditorium, classroom, u-shape-cabinet.'
};
var BuzyTime = function (props) {
    if (props.buzy.length == 0) {
        return React.createElement("span", null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("span", { className: "label labelWarning" },
            "This room is already booked for: ",
            props.buzy.join(', '))));
};
var Room = function (props) {
    // console.log("ROOM STATUS", props.Status)
    var buzyInit = [];
    var _a = React.useState(false), bookingForm = _a[0], setBookingForm = _a[1];
    var _b = React.useState(''), fromTime = _b[0], setFromTime = _b[1];
    var _c = React.useState(''), toTime = _c[0], setToTime = _c[1];
    var _d = React.useState(buzyInit), buzy = _d[0], setBuzy = _d[1];
    var handleSubmit = function (event) {
        event.preventDefault();
        console.log(fromTime, toTime);
        console.log(buzy);
        // check if the user has entered a valid time slot, and that the room is not already occupied
        if (fromTime > toTime) {
            alert("Please enter a valid time slot for the meeting!");
            return;
        }
        // optimize? depending on whether the incoming array is sorted.
        for (var i = 0; i < buzy.length; i++) {
            var tempfrom = buzy[i].split('-')[0];
            var tempto = buzy[i].split('-')[1];
            if ((fromTime >= tempfrom && fromTime < tempto) || (toTime > tempfrom && toTime <= tempto) || (fromTime < tempfrom && toTime > tempto)) {
                console.log(tempfrom, tempto);
                alert("The room is already occupied for " + tempfrom + '-' + tempto + " on " + props.inputDate + ". Please choose a different time slot, or try another room!");
                return;
            }
        }
        window.open("/bookroom/user:53231/" + props.inputDate + "/" + fromTime + "-" + toTime + "/" + props.roomId + "/" + props.roomType + "/confirm", '_self');
        //route to confirmation page where the user chooses a layout, additional equipment before finalizing the booking!
    };
    if (props.status == 'N') {
        return (React.createElement("div", { className: "roomDiv" },
            React.createElement("div", { className: "roomInfoDiv" },
                React.createElement(react_image_1.Img, { src: "https://i0.wp.com/worldwellnessgroup.org.au/wp-content/uploads/2020/07/placeholder.png?w=1200&ssl=1", className: "img-responsive roomImage" }),
                React.createElement("h3", { className: "roomName" },
                    " ",
                    props.roomId,
                    " (",
                    props.location,
                    ") "),
                React.createElement("div", { className: "roomDesc" },
                    "Capacity: ",
                    props.capacity,
                    ". ",
                    room_desc[props.roomType],
                    "  ")),
            React.createElement("button", { className: "btn btn-primary btn-sm bookRoom", onClick: function (event) {
                    setBookingForm(true);
                    // check all bookings to see when this room is booked on the current date
                    // Complexity: O(Total Bookings)
                    //  OPTIMIZE THIS -- 
                    for (var i = 0; i < props.books.length; i++) {
                        if (props.books[i].meetingDate == props.inputDate && props.books[i].roomId == props.roomId) {
                            setBuzy(__spreadArrays(buzy, [props.books[i].meetingTime]));
                        }
                    }
                } }, " Book "),
            React.createElement("form", { className: "form-group", onSubmit: handleSubmit, style: {
                    display: bookingForm === true
                        ? 'block' : 'none'
                } },
                React.createElement("label", { className: "timeLabel" }, "Please enter the start and end time for the meeting."),
                React.createElement("br", null),
                React.createElement("input", { type: "time", className: "form-control-md timeInput", required: true, value: fromTime, onChange: function (event) { setFromTime(event.target.value); } }),
                React.createElement("label", null, " to "),
                React.createElement("input", { type: "time", className: "form-control-md timeInput", required: true, value: toTime, onChange: function (event) { setToTime(event.target.value); } }),
                React.createElement("button", { type: "submit", className: "btn btn-info btn-sm" }, "Check Availability"),
                React.createElement(BuzyTime, { buzy: buzy }))));
    }
    return (React.createElement(React.Fragment, null));
};
var getDisplayRooms = function (rooms, roomID) {
    if (!roomID) {
        return rooms;
    }
    var filteredRooms = rooms.filter(function (item) { return item.roomId == roomID; });
    return filteredRooms;
};
var Rooms = /** @class */ (function (_super) {
    __extends(Rooms, _super);
    function Rooms(props) {
        var _this = _super.call(this, props) || this;
        _this.routeParam = '';
        _this.roomParam = '';
        _this.routeParam = props.match.params.date;
        _this.roomParam = props.match.params.room;
        return _this;
    }
    Rooms.prototype.componentDidMount = function () {
        var _this = this;
        var f2 = this.ensureRoomsFetched();
        var f1 = this.ensureBookingsFetched();
        if (this.roomParam) {
            this.setState({ _displayRooms: this.props.rooms.filter(function (item) { return item.roomId == _this.roomParam; }) });
        }
        else {
            this.setState({ _displayRooms: this.props.rooms });
        }
    };
    Rooms.prototype.ensureBookingsFetched = function () {
        if (this.roomParam) {
            console.log(this.roomParam);
            this.props.requestRooms(this.roomParam);
        }
        else {
            this.props.requestRooms("");
        }
    };
    Rooms.prototype.ensureRoomsFetched = function () {
        this.props.requestBookings("");
    };
    Rooms.prototype.componentDidUpdate = function () {
    };
    Rooms.prototype.render = function () {
        var _this = this;
        console.log(this.routeParam, this.roomParam);
        // VALIDATE INCOMING URL
        var today = new Date().toISOString().slice(0, 10);
        if (today > this.routeParam) {
            // cannot search for past dates. route to error page
            //alert("Please enter a valid date to check available rooms.")
            window.open('/index/user:52321', '_self');
        }
        if (this.roomParam && this.props.numRooms == 0) {
            // the room was deleted from the database.
            window.open('/notfound', '_self');
        }
        //VALIDATE USER ENTRY
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, " Rooms  "),
            this.props.rooms.map(function (room) { return React.createElement(Room, __assign({ key: room.roomId }, room, { inputDate: _this.routeParam, books: _this.props.bookings })); })));
    };
    return Rooms;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.rooms; }, // Selects which state properties are merged into the component's props
RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(Rooms);
//# sourceMappingURL=Rooms.js.map