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
var ConfirmedBooking = /** @class */ (function (_super) {
    __extends(ConfirmedBooking, _super);
    function ConfirmedBooking(props) {
        var _this = _super.call(this, props) || this;
        _this.dateParam = '';
        _this.roomParam = '';
        _this.timeParam = '';
        _this.typeParam = '';
        _this.bookingid = '';
        _this.finallayout = '';
        _this.finalreq = '';
        _this.userParam = '';
        _this.dateParam = props.match.params.date;
        _this.roomParam = props.match.params.room;
        _this.timeParam = props.match.params.time;
        _this.typeParam = props.match.params.type;
        _this.finallayout = props.match.params.layout;
        _this.userParam = props.match.params.user;
        _this.finalreq = props.match.params.req ? props.match.params.req : "-";
        return _this;
    }
    ConfirmedBooking.prototype.componentDidMount = function () {
        this.props.requestBookings("");
    };
    ConfirmedBooking.prototype.render = function () {
        var _this = this;
        console.log(this.dateParam, this.props.bookings);
        var today = new Date().toISOString().slice(0, 10);
        // validate params
        if (today > this.dateParam) {
            // cannot search for past dates. route to error page
            window.open('./', '_self');
        }
        //This page is rendered after the post request of the booking has been completed. 
        // Before rendering, confirm the that post request was a success by doing a get on the same. This 
        // will also validate the qs params.
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, " Thank you for booking with us! "),
            React.createElement("h2", null, " Following are the details for your booking:"),
            React.createElement("br", null),
            React.createElement("div", { className: "container" },
                React.createElement("h4", null,
                    "Date: ",
                    React.createElement("span", { className: "detailValue" },
                        " ",
                        this.dateParam,
                        " "),
                    " "),
                React.createElement("h4", null,
                    "Room: ",
                    React.createElement("span", { className: "detailValue" },
                        "  ",
                        this.roomParam,
                        " "),
                    " "),
                React.createElement("h4", null,
                    "Time: ",
                    React.createElement("span", { className: "detailValue" },
                        "  ",
                        this.timeParam,
                        " ")),
                React.createElement("h4", null,
                    "Layout: ",
                    React.createElement("span", { className: "detailValue" },
                        "  ",
                        this.finallayout,
                        " ")),
                React.createElement("h4", null,
                    "Additional Requirements: ",
                    React.createElement("span", { className: "detailValue" },
                        "  ",
                        this.finalreq))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { className: "btn btn-primary btn-lg", onClick: function (event) {
                    event.preventDefault();
                    window.open("./user" + _this.userParam, '_self');
                } }, "Home")));
    };
    return ConfirmedBooking;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.rooms; }, // Selects which state properties are merged into the component's props
RoomsBookingsStore.actionCreators // Selects which action creators are merged into the component's props
)(ConfirmedBooking);
//# sourceMappingURL=ConfirmedBooking.js.map