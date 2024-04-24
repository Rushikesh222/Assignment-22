import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL =
  "https://d86f60d4-dc05-4116-a7e1-da9723244e58-00-38ojtjikn651w.sisko.replit.dev/";

const initialState = {
  events: [],
  status: "idle",
  error: null
};

const fetchEventsAsync = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await fetch(API_BASE_URL + "event");
    if (response.status === 200) {
      const jsonData = await response.json();
      return jsonData.data;
    } else {
      throw new Error("Unable to fetch all events");
    }
  } catch (error) {
    throw new Error(error.error);
  }
});

const addEventAsync = createAsyncThunk(
  "events/addEventAsync",
  async (newEvent) => {
    try {
      const response = await fetch(API_BASE_URL + "event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      });

      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to add event");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  }
);

const updateEventAsync = createAsyncThunk(
  "events/updateEventAsync",
  async ({ id, updatedEvent }) => {
    try {
      const response = await fetch(API_BASE_URL + `event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEvent)
      });

      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to update event");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  }
);

const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (id) => {
    try {
      const response = await fetch(API_BASE_URL + `event/${id}`, {
        method: "DELETE"
      });

      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to delete event");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchEventsAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addEventAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEventAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.events.push(action.payload);
      })
      .addCase(addEventAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateEventAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedEvent = action.payload;
        const index = state.events.findIndex(
          (event) => event._id === updatedEvent._id
        );
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
      })
      .addCase(updateEventAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteEventAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.events = state.events.filter(
          (event) => event._id !== action.payload._id
        );
      })
      .addCase(deleteEventAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  }
});

export {
  eventsSlice,
  fetchEventsAsync,
  addEventAsync,
  updateEventAsync,
  deleteEventAsync
};

export default eventsSlice.reducer;
