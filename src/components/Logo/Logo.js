import React from "react";
import "./logo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export const Logo = ({ size }) => {
  return (
    <div className="logo">
      <div className="logo__content">
        <FontAwesomeIcon
          className="logo__calendar-icon"
          style={{ fontSize: `${size}px` }}
          icon={faCalendar}
        />
        <FontAwesomeIcon
          className="logo__utensils-icon"
          style={{
            fontSize: `${size / 2.8}px`,
            width: `${size / 2.8}px`,
            left: `calc((100% / 2) - ${size / 5.6}px)`,
          }}
          icon={faUtensils}
        />
      </div>
      <h1 className="logo__title" style={{ fontSize: `${size / 1.5}px` }}>
        DietWeek
      </h1>
    </div>
  );
};
