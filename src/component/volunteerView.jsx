import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteersAsync, VolunteerList } from "../features/";

const VolunteerView = () => {
  const { volunteers, status, error } = useSelector(
    ({ volunteers }) => volunteers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchVolunteersAsync());
      }
    };
    loadData();
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">{error}</p>}
      {status === "success" && <VolunteerList volunteers={volunteers} />}
    </div>
  );
};

export default VolunteerView;
