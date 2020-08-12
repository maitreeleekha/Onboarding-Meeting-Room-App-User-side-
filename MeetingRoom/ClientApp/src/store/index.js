"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherForecasts = require("./WeatherForecasts");
var Counter = require("./Counter");
var DateFormState = require("./createNewBookingForm");
var Rooms = require("./Rooms");
var User = require("./User");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    dateFormState: DateFormState.reducer,
    rooms: Rooms.reducer,
    //bookings: Bookings.reducer,
    user: User.reducer
};
//# sourceMappingURL=index.js.map