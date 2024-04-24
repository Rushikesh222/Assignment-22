import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const VolunteerList = ({ volunteers }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Volunteers View</h2>
      <button
        className="primary-btn"
        onClick={() => navigate("/volunteers/add")}
      >
        Add Volunteer
      </button>
      {volunteers.length === 0 ? (
        <p className="message">No volunteers available for display</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Availability</th>
              <th>Skills</th>
              <th>Areas of Interest</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map(
              ({
                _id,
                name,
                contact,
                skills,
                availability,
                areasOfInterest,
                events
              }) => (
                <tr key={_id} className="item-card">
                  <td>
                    <NavLink to={`/volunteers/${_id}`}>{name}</NavLink>
                  </td>
                  <td>
                    <NavLink to={`/volunteers/${_id}`}>{contact}</NavLink>
                  </td>
                  <td>
                    <NavLink to={`/volunteers/${_id}`}>
                      {availability ? "Yes" : "No"}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/volunteers/${_id}`}>
                      {skills.join(", ")}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/volunteers/${_id}`}>
                      {areasOfInterest.join(", ")}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/volunteers/${_id}`}>
                      {events.map(({ name }) => name).join(", ")}
                    </NavLink>
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

export default VolunteerList;
