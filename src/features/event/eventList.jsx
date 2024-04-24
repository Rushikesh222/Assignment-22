import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EventList = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Events View</h2>
      <button className="primary-btn" onClick={() => navigate("/events/add")}>
        Add Event
      </button>
      {events.length === 0 ? (
        <p className="message">No events available for display</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Required Volunteer Roles</th>
            </tr>
          </thead>
          <tbody>
            {events.map(
              ({
                _id,
                name,
                date,
                location,
                description,
                requiredVolunteerRoles
              }) => (
                <tr key={_id} className="item-card">
                  <td>
                    <Link to={`/events/${_id}`}>{name ?? "-"}</Link>
                  </td>
                  <td>
                    <Link to={`/events/${_id}`}>
                      {new Date(date).toLocaleDateString() ?? "-"}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/events/${_id}`}>{location ?? "-"}</Link>
                  </td>
                  <td>
                    <Link to={`/events/${_id}`}>{description ?? "-"}</Link>
                  </td>
                  <td>
                    <Link to={`/events/${_id}`}>
                      {requiredVolunteerRoles.join(", ") ?? "-"}
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventList;
