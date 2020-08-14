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
require("./static/Room.css");
var UserStore = require("../store/User");
var Signup = /** @class */ (function (_super) {
    __extends(Signup, _super);
    //validate incoming URL.
    function Signup(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (event) {
            event.preventDefault();
            //post request here.
            //this.props.postUser()
            var userobj = {
                "userId": event.target[0].value,
                "userName": event.target[1].value,
                "emailId": event.target[2].value,
                "password": event.target[3].value
            };
            console.log("submit details", userobj);
            _this.props.postUser(userobj);
            // console.log("submit details", event.target[0].value);
        };
        return _this;
    }
    Signup.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, " Sign Up! "),
            React.createElement("div", { className: 'signup-body form-group' },
                React.createElement("form", { className: "form-group", onSubmit: this.handleSubmit },
                    React.createElement("input", { className: "form-control", name: "Employee ID", type: "text", placeholder: "Employee ID", required: true }),
                    React.createElement("input", { className: "form-control", name: "Full Name", type: "text", placeholder: "Full Name", required: true }),
                    React.createElement("input", { className: "form-control", name: "Email ID", type: "email", placeholder: "Email ID", required: true }),
                    React.createElement("input", { className: "form-control", name: "Password", type: "password", placeholder: "Password", required: true }),
                    React.createElement("button", { className: "btn-lg btn btn-primary", type: "submit" }, "Submit Details")))));
    };
    return Signup;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.user; }, UserStore.actionCreators)(Signup);
//# sourceMappingURL=signup.js.map