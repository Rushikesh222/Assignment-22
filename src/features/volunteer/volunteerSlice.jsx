import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL =
  "https://d86f60d4-dc05-4116-a7e1-da9723244e58-00-38ojtjikn651w.sisko.replit.dev/";

const initialState = {
  volunteers: [],
  status: "idle",
  error: null
};

const fetchVolunteersAsync = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    try {
      const response = await fetch(API_BASE_URL + "volunteer");
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to fetch all volunteers");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

const addVolunteerAsync = createAsyncThunk(
  "volunteers/addVolunteerAsync",
  async (newVolunteer) => {
    try {
      const response = await fetch(API_BASE_URL + "volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newVolunteer)
      });

      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to add volunteer");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  }
);

const updateVolunteerAsync = createAsyncThunk(
  "volunteers/updateVolunteerAsync",
  async ({ id, updatedVolunteer }) => {
    try {
      const response = await fetch(API_BASE_URL + `volunteer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedVolunteer)
      });
      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to update volunteer");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  }
);

const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteerAsync",
  async (id) => {
    try {
      const response = await fetch(API_BASE_URL + `volunteer/${id}`, {
        method: "DELETE"
      });

      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to delete volunteer");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  }
);

const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVolunteersAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.volunteers = action.payload;
      })
      .addCase(fetchVolunteersAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addVolunteerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVolunteerAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.volunteers.push(action.payload);
      })
      .addCase(addVolunteerAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateVolunteerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVolunteerAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedVolunteer = action.payload;
        const index = state.volunteers.findIndex(
          (volunteer) => volunteer._id === updatedVolunteer._id
        );
        if (index !== -1) {
          state.volunteers[index] = updatedVolunteer;
        }
      })
      .addCase(updateVolunteerAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteVolunteerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVolunteerAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.volunteers = state.volunteers.filter(
          (volunteer) => volunteer._id !== action.payload._id
        );
      })
      .addCase(deleteVolunteerAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  }
});

export {
  volunteersSlice,
  fetchVolunteersAsync,
  addVolunteerAsync,
  updateVolunteerAsync,
  deleteVolunteerAsync
};

export default volunteersSlice.reducer;
