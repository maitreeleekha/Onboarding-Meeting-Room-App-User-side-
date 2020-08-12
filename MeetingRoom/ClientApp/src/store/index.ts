import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as DateFormState from './createNewBookingForm';
import * as Rooms from './Rooms';
import * as Bookings from './Bookings';
import * as User from './User';

// The top-level state object
export interface ApplicationState {
    dateFormState: DateFormState.ShowDateFormState | undefined;
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    rooms: Rooms.RoomsBookingsState | undefined;
    //bookings: Bookings.BookingsState | undefined;
    user: User.UserState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    dateFormState: DateFormState.reducer,
    rooms: Rooms.reducer,
    //bookings: Bookings.reducer,
    user: User.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
