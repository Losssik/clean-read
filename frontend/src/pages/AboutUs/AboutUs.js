import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const AboutUs = () => {
  const { user } = useAuthContext();
  return (
    <div className="about-us">
      <h2 className="about-us__title">About Us</h2>
      <div className="about-us__text">
        <span className="about-us__welcome">
          Hello there {user ? user.name : ""}!
        </span>
        <h4 className="about-us__sub-section__title">
          Are you tired of reading news where text is behind a big wall of ads
          and you can't even read it?
        </h4>
        <p className="about-us__sub-section__text">
          Our application lets you read articles focusing on the text without
          any distractions :) Don't have time to read it right away? Save
          article for later and get back once you ready :)
        </p>
        <h4 className="about-us__sub-section__title">
          Wanna fast browse HOT TOPICS?
        </h4>
        <p className="about-us__sub-section__text">
          No problem at all! Right now there are available following sections:
          <ul className="about-us__list">
            <li className="about-us__list-item">
              <Link to="/hot-topics/sport">SPORT</Link>
            </li>
            <li className="about-us__list-item">
              <Link to="/hot-topics">HOT NEWS POLAND</Link>
            </li>
            <li className="about-us__list-item">
              <Link to="/hot-topics/technology">TECHNOLOGY & SCIENCE</Link>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
