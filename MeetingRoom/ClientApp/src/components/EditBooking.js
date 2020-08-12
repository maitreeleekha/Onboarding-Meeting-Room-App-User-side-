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
var EditBooking = /** @class */ (function (_super) {
    __extends(EditBooking, _super);
    function EditBooking(props) {
        var _this = _super.call(this, props) || this;
        //validate incoming URL.
        _this.bookingId = '';
        _this.handleSubmit = function (event) {
            event.preventDefault();
            // initiate a post request
            alert("Your request has been submitted successfully. We shall reach out to you with an update shortly.");
            window.open("./", '_self');
        };
        _this.bookingId = props.match.params.bookingid;
        return _this;
    }
    EditBooking.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, " Edit Your Bookings "),
            React.createElement("h5", null, " Fill up the below form stating your requirements and we will get back to you with the updates on the matter shortly. "),
            React.createElement("br", null),
            React.createElement("form", { className: "form-group edit-form", onSubmit: this.handleSubmit },
                React.createElement("label", null, "Please describe clearly what you want to edit regarding this booking:"),
                React.createElement("input", { type: "textarea", className: "form-control", name: "edit_desc", placeholder: "" }),
                React.createElement("button", { className: "btn btn-primary btn-md", type: "submit" }, "Submit Request"))));
    };
    return EditBooking;
}(React.PureComponent));
exports.default = react_redux_1.connect()(EditBooking);
//# sourceMappingURL=EditBooking.js.map