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
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFound.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, " Sorry! We couldn't find what you were looking for."),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { className: "btn btn-primary btn-lg", onClick: function (event) {
                    event.preventDefault();
                    window.open('./', '_self');
                } }, "Home")));
    };
    return NotFound;
}(React.PureComponent));
exports.default = react_redux_1.connect()(NotFound);
//# sourceMappingURL=NotFound.js.map