import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsAsync, EventList } from "../features/";

const EventView = () => {
  const { events, status, error } = useSelector(({ events }) => events);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchEventsAsync());
      }
    };
    loadData();
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">
              {" "}
              Repl isn't wakeup yet
              <a
                href="https://replit.com/@RushikeshShirsa/VolunteerManagementBackend"
                target="_blank"
              >
                {" "}
                Click here to navigate
              </a>
            </p>}
      {status === "success" && <EventList events={events} />}
    </div>
  );
};

export default EventView;
