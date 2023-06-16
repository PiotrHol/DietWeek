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
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const Menu = ({ url }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isSettingsPage, setIsSettingsPage] = useState(false);
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

  const updateActiveMenuItem = (e) => {
    const allMenuItems = document.querySelectorAll(".menu__item");
    for (const menuItem of allMenuItems) {
      menuItem.classList.remove("menu__item--active");
      menuItem.parentElement.classList.remove("menu__link--active");
    }
    setShowSubmenu(false);
    setIsSettingsPage(false);
    e.currentTarget.classList.add("menu__item--active");
    e.currentTarget.parentElement.classList.add("menu__link--active");
  };

  return (
    <ul className="menu">
      <Link className="menu__link menu__link--active" to={url}>
        <li
          className="menu__item menu__item--active"
          onClick={updateActiveMenuItem}
        >
          <FontAwesomeIcon icon={faHome} className="menu__item-icon" />
          <span className="menu__item-text">Strona główna</span>
        </li>
      </Link>
      <Link className="menu__link" to={`${url}/recipes`}>
        <li className="menu__item" onClick={updateActiveMenuItem}>
          <FontAwesomeIcon icon={faUtensils} className="menu__item-icon" />
          <span className="menu__item-text">Przepisy</span>
        </li>
      </Link>
      <Link className="menu__link" to={`${url}/weeks`}>
        <li className="menu__item" onClick={updateActiveMenuItem}>
          <FontAwesomeIcon icon={faCalendar} className="menu__item-icon" />
          <span className="menu__item-text">Tygodnie</span>
        </li>
      </Link>
      <Link className="menu__link" to={`${url}/shopping-list`}>
        <li className="menu__item" onClick={updateActiveMenuItem}>
          <FontAwesomeIcon icon={faList} className="menu__item-icon" />
          <span className="menu__item-text">Lista zakupów</span>
        </li>
      </Link>
      <li
        className={classNames("menu__link menu__item hide-on-desktop", {
          "menu__item--active": showSubmenu,
        })}
        onClick={handleSubmenuToggle}
      >
        <FontAwesomeIcon icon={faUser} className="menu__item-icon" />
        <span className="menu__item-text">Profil</span>
      </li>
      {showSubmenu && (
        <div ref={submenuRef} className="menu__submenu hide-on-desktop">
          <Link
            className="menu__link menu__submenu-item"
            to={`${url}/settings`}
          >
            <li
              className={classNames("menu__item", {
                "menu__item--active": isSettingsPage,
              })}
              onClick={(e) => {
                updateActiveMenuItem(e);
                setIsSettingsPage(true);
              }}
            >
              <FontAwesomeIcon icon={faGear} className="menu__item-icon" />
              <span className="menu__item-text">Ustawienia</span>
            </li>
          </Link>
          <li
            className="menu__item menu__submenu-item"
            onClick={() => signOut(getAuth())}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="menu__item-icon"
            />
            <span className="menu__item-text">Wyloguj</span>
          </li>
        </div>
      )}
      <Link className="menu__link hide-on-mobile" to={`${url}/settings`}>
        <li className="menu__item" onClick={updateActiveMenuItem}>
          <FontAwesomeIcon icon={faGear} className="menu__item-icon" />
          <span className="menu__item-text">Ustawienia</span>
        </li>
      </Link>
      <li
        className="menu__link menu__item hide-on-mobile"
        onClick={() => signOut(getAuth())}
      >
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="menu__item-icon"
        />
        <span className="menu__item-text">Wyloguj</span>
      </li>
    </ul>
  );
};
