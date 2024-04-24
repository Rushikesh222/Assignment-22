import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addVolunteerAsync,
  updateVolunteerAsync,
  fetchEventsAsync
} from "../../features";

const VolunteerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state !== null;

  const initialVolunteerData = {
    name: "",
    contact: 0,
    skills: "",
    availability: "false", // Use string value
    areasOfInterest: "",
    events: [] // Store selected event IDs in an array
  };

  const [volunteerInput, setVolunteerInput] = useState(
    isEditing
      ? {
          name: state.name,
          contact: state.contact,
          skills: state.skills.join(", "),
          availability: state.availability.toString(),
          areasOfInterest: state.areasOfInterest.join(", "),
          events: state.events.map(({ _id }) => _id)
        }
      : initialVolunteerData
  );

  const { events } = useSelector(({ events }) => events);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateVolunteerAsync({
          id: state._id,
          updatedVolunteer: volunteerInput
        })
      );
      navigate(`/volunteers/${state._id}`);
    } else {
      dispatch(addVolunteerAsync(volunteerInput));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchEventsAsync());
  }, [dispatch]);

  const handleEventChange = (eventID) => {
    // Toggle the event ID in the array
    if (volunteerInput.events.includes(eventID)) {
      setVolunteerInput({
        ...volunteerInput,
        events: volunteerInput.events.filter((id) => id !== eventID)
      });
    } else {
      setVolunteerInput({
        ...volunteerInput,
        events: [...volunteerInput.events, eventID]
      });
    }
  };

  return (
    <div className="page">
      <h2>{isEditing ? "Edit" : "Add"} Volunteer</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            type="text"
            value={volunteerInput.name}
            onChange={(e) =>
              setVolunteerInput({ ...volunteerInput, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            placeholder="Contact"
            type="number"
            min={0}
            value={volunteerInput.contact}
            onChange={(e) =>
              setVolunteerInput({ ...volunteerInput, contact: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Skills:</label>
          <input
            placeholder="Separated by commas"
            type="text"
            value={volunteerInput.skills}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                skills: e.target.value.replace(/ /g, "").split(",")
              })
            }
            required
          />
        </div>
        <div>
          <label>Availability:</label>
          <div className="radio-btn-container">
            <label className="radio-btn">
              <input
                type="radio"
                name="availability"
                value="true"
                checked={volunteerInput.availability === "true"}
                onChange={() =>
                  setVolunteerInput({
                    ...volunteerInput,
                    availability: "true"
                  })
                }
              />{" "}
              Yes
            </label>
            <label className="radio-btn">
              <input
                type="radio"
                name="availability"
                value="false"
                checked={volunteerInput.availability === "false"}
                onChange={() =>
                  setVolunteerInput({
                    ...volunteerInput,
                    availability: "false"
                  })
                }
              />{" "}
              No
            </label>
          </div>
        </div>
        <div>
          <label>Areas of Interest:</label>
          <input
            placeholder="Separated by commas"
            type="text"
            value={volunteerInput.areasOfInterest}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                areasOfInterest: e.target.value.replace(/ /g, "").split(",")
              })
            }
            required
          />
        </div>
        <div>
          <label>Events:</label>
          {events.map(({ _id, name }) => (
            <div key={_id} className="radio-btn-container">
              <label className="checkbox-btn">
                <input
                  type="checkbox"
                  value={_id}
                  checked={volunteerInput.events.includes(_id)}
                  onChange={() => handleEventChange(_id)}
                />{" "}
                {name}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Volunteer</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
