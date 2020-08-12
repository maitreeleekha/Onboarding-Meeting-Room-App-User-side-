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
        _this.dateParam = props.match.params.date;
        _this.roomParam = props.match.params.room;
        _this.timeParam = props.match.params.time;
        _this.typeParam = props.match.params.type;
        _this.finallayout = props.match.params.layout;
        _this.finalreq = props.match.params.req;
        return _this;
    }
    ConfirmedBooking.prototype.render = function () {
        console.log(this.dateParam);
        var today = new Date().toISOString().slice(0, 10);
        // validate params
        if (today > this.dateParam) {
            // cannot search for past dates. route to error page
            window.open('/index', '_self');
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, " Thank you for booking with us! "),
            React.createElement("h2", null, " Following are the details for your booking:"),
            React.createElement("br", null),
            React.createElement("div", { className: "container" },
                React.createElement("h4", null,
                    "Date: ",
                    this.dateParam,
                    " "),
                React.createElement("h4", null,
                    "Room: ",
                    this.roomParam,
                    " "),
                React.createElement("h4", null,
                    "Time: ",
                    this.timeParam,
                    " "),
                React.createElement("h4", null,
                    "Layout: ",
                    this.finallayout,
                    " "),
                React.createElement("h4", null,
                    "Additional Requirements: ",
                    this.finalreq))));
    };
    return ConfirmedBooking;
}(React.PureComponent));
exports.default = react_redux_1.connect()(ConfirmedBooking);
//# sourceMappingURL=ConfirmedBooking.js.map