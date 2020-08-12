"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var NotFound = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, " Sorry! We couldn't find what you were looking for."),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("button", { className: "btn btn-primary btn-lg", onClick: function (event) {
                event.preventDefault();
                window.open('./', '_self');
            } }, "Home")));
};
exports.default = react_redux_1.connect()(NotFound);
//# sourceMappingURL=NotFound.js.map