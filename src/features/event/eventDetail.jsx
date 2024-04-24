import React from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAsync } from "../../features";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const eventToUpdate = useSelector(({ events: { events } }) =>
    events.find((event) => event._id === id)
  );

  if (!eventToUpdate) {
    return <p>Event not found!</p>;
  }

  const handleDeleteEvent = () => {
    dispatch(deleteEventAsync(eventToUpdate._id));
    navigate("/events");
  };

  return (
    <div className="page details-page">
      <h2>Event Detail</h2>
      <p>
        <strong>Name: </strong>
        {eventToUpdate.name}
      </p>
      <p>
        <strong>Date: </strong>
        {new Date(eventToUpdate.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Location: </strong>
        {eventToUpdate.location}
      </p>
      <p>
        <strong>Description: </strong>
        {eventToUpdate.description}
      </p>
      <p>
        <strong>Required Volunteer Roles: </strong>
        {eventToUpdate.requiredVolunteerRoles.join(", ")}
      </p>

      <NavLink to={`/events/edit/${id}`} state={eventToUpdate}>
        <button className="primary-btn">Edit Event</button>
      </NavLink>

      <button className="secondary-btn" onClick={handleDeleteEvent}>
        Delete
      </button>
    </div>
  );
};

export default EventDetail;
