import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice, volunteersSlice } from "../features";

export default configureStore({
  reducer: {
    events: eventsSlice.reducer,
    volunteers: volunteersSlice.reducer
  }
});
