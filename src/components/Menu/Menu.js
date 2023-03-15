import React, { useRef, useState } from "react";
import "./menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faList,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";

export const Menu = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const submenuRef = useRef(null);

  const handleSubmenuToggle = () => {
    if (showSubmenu) {
      submenuRef.current.classList.remove("menu__submenu--show");
      const hideTimeoutId = setTimeout(() => {
        setShowSubmenu(false);
        clearTimeout(hideTimeoutId);
      }, 300);
    } else {
      setShowSubmenu(true);
      const showTimeoutId = setTimeout(() => {
        submenuRef.current.classList.add("menu__submenu--show");
        clearTimeout(showTimeoutId);
      }, 10);
    }
  };

  return (
    <ul className="menu">
      <li className="menu__item">
        <FontAwesomeIcon icon={faHome} className="menu__item-icon" />
        <span className="menu__item-text">Strona główna</span>
      </li>
      <li className="menu__item">
        <FontAwesomeIcon icon={faUtensils} className="menu__item-icon" />
        <span className="menu__item-text">Przepisy</span>
      </li>
      <li className="menu__item">
        <FontAwesomeIcon icon={faCalendar} className="menu__item-icon" />
        <span className="menu__item-text">Tygodnie</span>
      </li>
      <li className="menu__item">
        <FontAwesomeIcon icon={faList} className="menu__item-icon" />
        <span className="menu__item-text">Lista zakupów</span>
      </li>
      <li
        className={classNames("menu__item hide-on-desktop", {
          "menu__item--active": showSubmenu,
        })}
        onClick={handleSubmenuToggle}
      >
        <FontAwesomeIcon icon={faUser} className="menu__item-icon" />
        <span className="menu__item-text">Profil</span>
      </li>
      {showSubmenu && (
        <div ref={submenuRef} className="menu__submenu hide-on-desktop">
          <li className="menu__item menu__submenu-item">
            <FontAwesomeIcon icon={faGear} className="menu__item-icon" />
            <span className="menu__item-text">Ustawienia</span>
          </li>
          <li className="menu__item menu__submenu-item">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="menu__item-icon"
            />
            <span className="menu__item-text">Wyloguj</span>
          </li>
        </div>
      )}
      <li className="menu__item hide-on-mobile">
        <FontAwesomeIcon icon={faGear} className="menu__item-icon" />
        <span className="menu__item-text">Ustawienia</span>
      </li>
      <li className="menu__item hide-on-mobile">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="menu__item-icon"
        />
        <span className="menu__item-text">Wyloguj</span>
      </li>
    </ul>
  );
};
