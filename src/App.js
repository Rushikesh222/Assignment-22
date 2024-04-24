import { Routes, Route, NavLink } from "react-router-dom";
import { VolunteerView, EventView } from "./component";
import {
  VolunteerDetail,
  VolunteerForm,
  EventDetail,
  EventForm
} from "./features";
import "./styles.css";

export default function App() {
  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? "500" : "",
    color: isActive ? "#ffffff" : ""
  });

  return (
    <div className="App">
      <div>
        <h1>Volunteer Management System</h1>
        <nav>
          <ul className="navbar">
            <li>
              <NavLink to="/" style={isActiveStyle} className="nav-item">
                Volunteers
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" style={isActiveStyle} className="nav-item">
                Events
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<VolunteerView />} />
        <Route path="/events" element={<EventView />} />
        <Route path="/volunteers/:id" element={<VolunteerDetail />} />
        <Route path="/volunteers/add" element={<VolunteerForm />} />
        <Route path="/volunteers/edit/:id" element={<VolunteerForm />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/add" element={<EventForm />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
      </Routes>
      <footer>
        <p>Designed and Developed by Rushikesh Waman Shirsat</p>
      </footer>
    </div>
  );
}
