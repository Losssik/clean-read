import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GiSoccerKick } from "react-icons/gi";
import { PiDesktopTower } from "react-icons/pi";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaPlus,
  FaRegBookmark,
  FaFireAlt,
} from "react-icons/fa";

const SideMenu = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="side-menu">
      <button className="side-menu__toggle" onClick={toggleMenu}>
        <FcMenu />
      </button>

      <div
        className={`side-menu__panel ${
          menu ? "side-menu__panel--visible" : ""
        }`}
      >
        <h2 className="side-menu__title">Menu</h2>
        <ul className="side-menu__list">
          <li className="side-menu__item">
            <Link
              to="/"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <FaHome className="side-menu__icon" />
              <span className="side-menu__text">home</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/about"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <FaInfoCircle className="side-menu__icon" />
              <span className="side-menu__text">about us</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/contact"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <FaEnvelope className="side-menu__icon" />
              <span className="side-menu__text">contact</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/articles/new"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <FaPlus className="side-menu__icon" />
              <span className="side-menu__text">add new article</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/user/read-later"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <FaRegBookmark className="side-menu__icon" />
              <span className="side-menu__text">read-later list</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/hot-topics"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <FaFireAlt className="side-menu__icon" />
              <span className="side-menu__text">HOT TOPICS!</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/hot-topics/sport"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <GiSoccerKick className="side-menu__icon" />
              <span className="side-menu__text">SPORT TOPICS!</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link
              to="/hot-topics/technology"
              className="side-menu__link"
              onClick={() => setMenu(false)}
            >
              <PiDesktopTower className="side-menu__icon" />
              <span className="side-menu__text">TECHNOLOGY & SCIENCE!</span>
            </Link>
          </li>
        </ul>
        {user && <button onClick={handleLogout}>logout</button>}
      </div>
    </div>
  );
};

export default SideMenu;
