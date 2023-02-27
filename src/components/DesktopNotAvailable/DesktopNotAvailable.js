import React from "react";
import "./desktopNotAvailable.scss";
import { Logo } from "../Logo/Logo";

export const DesktopNotAvailable = () => {
  return (
    <div className="desktop-not-available">
      <div className="desktop-not-available__logo">
        <Logo size={60} />
      </div>
      <div className="desktop-not-available__content">
        Obecnie strona dostępna jest tylko na urządzeniach mobilnych
      </div>
    </div>
  );
};
