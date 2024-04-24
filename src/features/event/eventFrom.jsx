import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addEventAsync, updateEventAsync } from "../../features";

const EventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state !== null;

  const initialEventInput = {
    name: "",
    date: "",
    location: "",
    description: "",
    requiredVolunteerRoles: ""
  };

  const [eventInput, setEventInput] = useState(
    isEditing
      ? {
          name: state.name,
          date: state.date
            ? new Date(state.date).toISOString().split("T")[0]
            : "",
          location: state.location,
          description: state.description,
          requiredVolunteerRoles: state.requiredVolunteerRoles.join(", ")
        }
      : initialEventInput
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateEventAsync({
          id: state._id,
          updatedEvent: eventInput
        })
      );
      navigate(`/events/${state._id}`);
    } else {
      dispatch(addEventAsync(eventInput));
      navigate("/events");
    }
  };

  return (
    <div className="page">
      <h2>{isEditing ? "Edit" : "Add"} Event</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Event Name:</label>
          <input
            placeholder="Enter Event Name"
            type="text"
            value={eventInput.name}
            onChange={(e) =>
              setEventInput({ ...eventInput, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Event Date:</label>
          <input
            placeholder="Date"
            type="date"
            value={eventInput.date}
            onChange={(e) =>
              setEventInput({ ...eventInput, date: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            placeholder="Event Location"
            type="text"
            value={eventInput.location}
            onChange={(e) =>
              setEventInput({ ...eventInput, location: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            placeholder="Event Description"
            type="text"
            value={eventInput.description}
            onChange={(e) =>
              setEventInput({ ...eventInput, description: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Required Volunteer Roles:</label>
          <input
            placeholder="Separated by commas"
            type="text"
            value={eventInput.requiredVolunteerRoles}
            onChange={(e) =>
              setEventInput({
                ...eventInput,
                requiredVolunteerRoles: e.target.value
              })
            }
            required
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Event</button>
      </form>
    </div>
  );
};

export default EventForm;
