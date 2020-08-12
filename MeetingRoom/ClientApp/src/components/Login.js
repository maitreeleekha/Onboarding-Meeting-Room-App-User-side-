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
var Promise = require("bluebird");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    //validate incoming URL.
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSubmit = function (event) {
            event.preventDefault();
            //console.log(event.target[0].value);
            _this.props.requestUser(event.target[0].value);
            //.then(() => console.log('logger', this.props.loginuser));
            if (_this.props.isLogged && !_this.props.userIsLoading) {
                console.log('logger', _this.props.loginuser, _this.props.userIsLoading, _this.props.isLogged);
            }
        };
        _this.ensureUserFetched = function (id) { return new Promise(function (resolve, reject) {
            _this.props.requestUser(id);
            resolve();
        }); };
        return _this;
    }
    Login.prototype.componentDidMount = function () {
        //this.props.requestUser('52321');
    };
    Login.prototype.render = function () {
        console.log('logger', this.props.loginuser, this.props.userIsLoading, this.props.isLogged);
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Login"),
            React.createElement("div", { className: "login-body" },
                React.createElement("h4", null, " Hi! Please Enter your username "),
                React.createElement("form", { className: "form-group", onSubmit: this.handleSubmit },
                    React.createElement("input", { className: "form-control", placeholder: "UserID", required: true }),
                    React.createElement("br", null),
                    React.createElement("button", { className: "btn-lg btn btn-primary", type: "submit" }, "Login")),
                React.createElement("button", { className: "btn-lg btn btn-light", onClick: function (event) {
                        event.preventDefault();
                        window.open('./signup', '_self');
                    } }, "SignUp?"))));
    };
    return Login;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.user; }, UserStore.actionCreators)(Login);
//# sourceMappingURL=Login.js.map